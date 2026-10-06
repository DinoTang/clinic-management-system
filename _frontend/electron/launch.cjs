const { app: electronApp, BrowserWindow } = require("electron");
const { dialog } = require("electron");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function serveFrontend(mode) {
  const distPath = path.resolve(__dirname, "../dist");
  const preferredPort = mode === "desktop" ? 5173 : 0;
  const server = http.createServer((request, response) => {
    const requestPath = new URL(request.url, "http://localhost").pathname;
    let relativePath;

    try {
      relativePath = decodeURIComponent(requestPath).replace(/^\/+/, "");
    } catch {
      response.writeHead(400).end("Invalid request path");
      return;
    }

    const requestedFile = path.resolve(distPath, relativePath || "index.html");
    if (
      requestedFile !== distPath &&
      !requestedFile.startsWith(`${distPath}${path.sep}`)
    ) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    fs.stat(requestedFile, (statError, stats) => {
      const filePath =
        !statError && stats.isDirectory()
          ? path.join(requestedFile, "index.html")
          : requestedFile;
      const stream = fs.createReadStream(filePath);

      stream.on("open", () => {
        response.writeHead(200, {
          "Content-Type":
            mimeTypes[path.extname(filePath).toLowerCase()] ||
            "application/octet-stream",
          "X-Content-Type-Options": "nosniff",
        });
        stream.pipe(response);
      });
      stream.on("error", (error) => {
        if (!response.headersSent) {
          response.writeHead(error.code === "ENOENT" ? 404 : 500);
        }
        response.end(error.code === "ENOENT" ? "Not found" : "Unable to load app");
      });
    });
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(preferredPort, "127.0.0.1", () => {
      server.removeListener("error", reject);
      const { port } = server.address();
      resolve({
        server,
        url: `http://localhost:${port}/`,
      });
    });
  });
}

async function waitForExistingDesktopFrontend() {
  const response = await fetch("http://localhost:5173/");
  if (!response.ok) {
    throw new Error(
      "Port 5173 is already in use by a service that cannot serve the clinic app.",
    );
  }
  const html = await response.text();
  if (!html.includes("<title>Phòng khám đa khoa</title>")) {
    throw new Error("Port 5173 is not serving the clinic frontend.");
  }
}

const DESKTOP_LOGIN_MODE = "demo"; // Change to "database" to validate staff accounts through the API.

async function launchClinicApp({ mode, app = electronApp }) {
  const isDesktop = mode === "desktop";
  const isPackaged = app.isPackaged;
  const devUrl = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173/";
  const useDevServer = !isPackaged;
  let frontendServer;

  if (isPackaged && isDesktop) {
    try {
      frontendServer = await serveFrontend(mode);
    } catch (error) {
      if (error.code !== "EADDRINUSE") throw error;
      await waitForExistingDesktopFrontend();
      frontendServer = { url: "http://localhost:5173/" };
    }
  } else if (isPackaged) {
    frontendServer = await serveFrontend(mode);
  }

  const frontendUrl = useDevServer ? devUrl : frontendServer.url;
  const appUrl = new URL(frontendUrl);
  appUrl.searchParams.set("app", mode);
  if (isDesktop) appUrl.searchParams.set("loginMode", DESKTOP_LOGIN_MODE);

  const createWindow = () => {
    const window = new BrowserWindow({
      title: isDesktop ? "Clinic Management" : "MediGo",
      width: isDesktop ? 1440 : 430,
      height: 900,
      minWidth: isDesktop ? 900 : 360,
      minHeight: 600,
      icon: path.join(__dirname, "clinic.ico"),
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    window.on("page-title-updated", (event) => event.preventDefault());
    window.loadURL(appUrl.toString());
  };

  app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on("window-all-closed", () => {
    frontendServer?.server?.close();
    if (process.platform !== "darwin") app.quit();
  });
}

function startClinicApp(options) {
  launchClinicApp(options).catch((error) => {
    console.error("Unable to start Clinic Management:", error);
    app.whenReady().then(() => {
      dialog.showErrorBox("Không thể khởi động ứng dụng", error.message);
      app.quit();
    });
  });
}

module.exports = { startClinicApp };

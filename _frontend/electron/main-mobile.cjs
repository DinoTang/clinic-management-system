const { app } = require("electron");
const { startClinicApp } = require("./launch.cjs");

startClinicApp({ mode: "mobile", app });

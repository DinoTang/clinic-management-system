# Clinic Management System

## Build Windows releases

Requirements: Windows, Git, and a current Node.js LTS release with npm.

```powershell
git clone https://github.com/DinoTang/clinic-management-system.git
cd clinic-management-system\_frontend
npm ci
```

Build the Clinic Management installer:

```powershell
npm run electron:build
```

Build the MediGo installer:

```powershell
npm run electron:build:mobile
```

Build both installers:

```powershell
npm run electron:build:all
```

Installers are written to `_frontend/release/` and
`_frontend/release-mobile/`. These scripts create **Windows `.exe` installers**;
they do not create an Android APK. Release files and `node_modules` are generated
locally and must not be committed.

## Desktop workspaces and login

The desktop app has separate workspaces for administrators, doctors, and staff.
On localhost and in the Electron app, choose a temporary role to preview the
corresponding workspace without logging in. The Admin preview contains sample
data for the dashboard, accounts, patients, doctors, specialties, rooms,
schedules, appointments, medicines, services, invoices, and reports. Admin
preview edits remain in frontend memory and are not saved to the database.
Temporary role selection does not authenticate or authorize API requests.

Use **Đăng nhập bằng tài khoản thật** to authenticate through the backend and
open the workspace for the role returned by the account. For this option and
backend features to work in the packaged app, the Spring backend must be
running at `localhost:8080` and connected to the configured database. The
Windows installer packages the desktop frontend; it does not start the backend
or database as services.

## Đăng nhập bằng Google OAuth2 (Google)

### 1. Yêu cầu trước khi chạy

Đảm bảo máy tính đã cài đặt và cấu hình:

- Java JDK tương thích với phiên bản Java của dự án.
- Maven hoặc Maven Wrapper có sẵn trong dự án.
- MySQL đang hoạt động và cơ sở dữ liệu đã được cấu hình.
- Tài khoản Google.
- Thông tin xác thực Google OAuth2 được tạo trên Google Cloud Console.

### 2. Cấu hình Google OAuth2

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/).
2. Tạo một dự án mới hoặc chọn dự án hiện có.
3. Cấu hình màn hình đồng ý OAuth (OAuth consent screen).
4. Tạo OAuth Client ID với loại ứng dụng **Web application**.
5. Thêm URI chuyển hướng được ủy quyền (Authorized redirect URI):

   ```text
   http://localhost:8080/login/oauth2/code/google
   ```

6. Sao chép **Client ID** và **Client Secret** để sử dụng trong ứng dụng.

### 3. Cấu hình thông tin xác thực

Tạo file `application.properties` tương tự `example.application.properties` Dán thông tin `GOOLE_CLIENT_ID` và `GOOLE_CLIENT_SECRET`:

```properties
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}
```

### 4. Kiểm tra chức năng đăng nhập Google

1. Mở trình duyệt và truy cập đường dẫn:

   ```text
   http://localhost:8080/oauth2/authorization/google
   ```

2. Chọn tài khoản Google và hoàn tất quá trình xác thực.
3. Google chuyển hướng về callback mặc định của Spring Security:

   ```text
   http://localhost:8080/login/oauth2/code/google
   ```

4. Sau khi xác thực thành công, Spring Security chuyển hướng đến endpoint xử lý đăng nhập thành công đã cấu hình:

   ```text
   http://localhost:8080/api/auth/oauth-success
   ```

5. Ứng dụng lấy thông tin người dùng từ Google, kiểm tra tài khoản trong cơ sở dữ liệu và tạo JWT nếu đăng nhập thành công.

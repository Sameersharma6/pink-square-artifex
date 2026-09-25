# Pink Square Artifex Store

Full-stack jewellery store for Pink Square Artifex, redesigned around the logo from the supplied brand poster.

## Included
- React + Vite customer storefront
- Spring Boot + Spring Security + JWT backend
- PostgreSQL database
- Customer registration/login/logout
- Separate ADMIN role and protected admin product API
- Admin panel: add, edit, delete products
- Admin can directly change price, sale price, stock, category and visibility
- Admin can paste a direct image URL/path and immediately preview it
- Optional `.glb` / `.gltf` model URL for real interactive 3D product viewing
- 3D-style fallback viewer when no model URL is supplied
- Cart and wishlist stored in the browser
- Pink Square Artifex logo asset taken from the supplied poster
- Vercel-friendly frontend configuration

## Project name
The folder is now named `pink-square-artifex-store` so it is separate from the earlier `pink-square-artifex-complete` project.

## Local setup

### 1. PostgreSQL
Create:
```sql
CREATE DATABASE pink_square_artifex;
```

### 2. Backend in IntelliJ
Open the `backend` folder as a Maven project.
Set these environment variables, or edit `application.properties`:
- `DB_URL=jdbc:postgresql://localhost:5432/pink_square_artifex`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=your_postgres_password`
- `JWT_SECRET=a_long_random_secret_at_least_32_characters`

Optional admin variables:
- `ADMIN_EMAIL=admin@pinksquareartifex.com`
- `ADMIN_PASSWORD=Admin@12345`

Run `PinkSquareArtifexApplication`.

Check:
`http://localhost:8080/api/health`

On first startup the application creates the admin account if it does not already exist and seeds four sample products when the products table is empty.

### 3. Frontend
Open a terminal in `frontend`:
```bash
npm install --legacy-peer-deps
npm run dev
```

Open:
`http://localhost:5173`

If the backend is not on port 8080, create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8080/api
```

## Admin login
Default local credentials:
- Email: `admin@pinksquareartifex.com`
- Password: `Admin@12345`

After login the ADMIN user is sent to `/admin`.
Change the password before a public deployment by setting `ADMIN_PASSWORD` on the backend.

## Adding a product image from Admin
In Admin > Add new product, use **Direct image URL / path**.
Examples:
```text
https://example.com/my-jewellery.jpg
```
or, when the image is inside the frontend public folder:
```text
/products/my-jewellery.jpg
```

For Vercel, do not use a Windows path such as `C:\Users\...`; use a public URL or a file placed under `frontend/public`.

## 3D product option
For a true interactive 3D item, put a public `.glb` or `.gltf` URL into **3D model URL** in Admin. Customers then see a `3D View` button with rotate/zoom controls.
If no model URL is present, the product page still provides a 3D-style interactive photo view.

## Deployment
Frontend can be deployed to Vercel. The Spring Boot backend and PostgreSQL database must be deployed separately. Set:
- Frontend `VITE_API_URL` to the deployed backend `/api` URL.
- Backend `FRONTEND_URL` to the deployed frontend URL.
- Backend `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in the backend host.

Never put database passwords or JWT secrets in the frontend.

# Notion Server

A NestJS backend server providing a Notion-like API with authentication, pages, and blocks management.

## Features

- **Authentication**: JWT-based auth with signup and login
- **Pages**: Create, read, update, and archive pages with titles, icons, and cover images
- **Blocks**: Manage content blocks within pages (create, update, reorder, delete)

## Tech Stack

- NestJS
- Prisma (SQLite)
- Passport JWT
- bcrypt

## Getting Started

```bash
pnpm install
```

## Database Setup

```bash
pnpm prisma migrate dev
```

## Run the Server

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev
```

## API Endpoints

### Auth

- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login and get JWT token

### Pages (protected)

- `GET /pages` - List all pages for user
- `POST /pages` - Create a page
- `GET /pages/:id` - Get single page
- `PATCH /pages/:id` - Update page
- `DELETE /pages/:id` - Archive page

### Blocks (protected)

- `GET /blocks/page/:pageId` - Get all blocks for a page
- `POST /blocks` - Create a block
- `PATCH /blocks/:id` - Update a block
- `DELETE /blocks/:id` - Delete a block
- `POST /blocks/reorder/:pageId` - Reorder blocks

## Environment Variables

Create a `.env` file:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

## Run Tests

```bash
pnpm run test
```

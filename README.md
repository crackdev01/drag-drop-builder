# Test Project

This project is for web builder with drag&drop.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS, `shadcn/ui` for UI components
- **Backend**: tRPC for the backend architecture
- **Database**: Prisma as the ORM with Supabase as the database service
- **Starter Kit**: create t3 app

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (20.14.0)
- yarn
- A Supabase account and a database setup

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/crackdev01/drag-drop-builder.git
cd drag-drop-builder
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root of your project and add the following variables:

```env
DATABASE_URL="postgres://postgres.btaxpidaehwxhvlgrqwj:BSiN5yazQu8JjfKv@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
DIRECT_URL="postgres://postgres.btaxpidaehwxhvlgrqwj:BSiN5yazQu8JjfKv@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?sslmode=require&pgbouncer=true"
```

4. **Run the Prisma migration (optional)**

If you've defined new models or changed existing ones, you might need to run a migration:

```bash
yarn db:generate
```
```bash
yarn db:migrate
```
```bash
yarn db:push
```

5. **Start the development server**

```bash
yarn dev
```

Navigate to `http://localhost:3000` to view the app.


# Getting Started
Install depdendencies
```bash
npm i
```

Build a `dev.env`
```
APP_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
```

Start docker (Postgres)
```bash
# Specify POSTGRES_PORT env if you want to ues port other than 5432
docker compose up -d
```

Run migrations
```bash
npm run db:migrate
```

Build Typescript
```bash
npm run build:watch
```

Run the server
```bash
npm run dev
```
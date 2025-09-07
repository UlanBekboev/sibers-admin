# Admin Panel Web Interface

A web-based admin panel for managing registered users of a website. The project provides full CRUD functionality (Create, Read, Update, Delete) with authentication, pagination, sorting, and basic security features.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Database](#database)
- [Project Structure](#project-structure)
- [Security](#security)
- [Usage](#usage)
- [License](#license)

---

## Features

- **User Management**: View, create, update, and delete registered users.
- **Pagination**: List users with page navigation.
- **Sorting**: Sort users by `username`, `firstName`, or `birthdate`.
- **Authentication**: Admin login required to access the panel.
- **Responsive UI**: Simple, clear interface for managing users.
- **Security**:
  - Password hashing with **bcrypt**
  - Content Security Policy via **helmet**
  - CSRF protection (planned)
- **Frontend Validation**: Basic form validation for input fields.

---

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **ORM**: Sequelize + sequelize-typescript
- **Templating Engine**: Handlebars
- **Security**: bcrypt, helmet, express-session
- **Frontend**: HTML, CSS, JS (vanilla)

---

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 17
- Git

### Installation

1. Clone the repository:

```bash
git clone git@github.com:UlanBekboev/sibers-admin.git 
(git clone https://github.com/UlanBekboev/sibers-admin.git)

2. Install dependencies:

cd backend
npm install

3. Create a .env file in the backend folder:

PORT=3000
DATABASE_URL=postgres://postgres:yandex@localhost:5433/testdb
SESSION_SECRET=change_me
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASS=yandex
DB_NAME=testdb
SESSION_SECRET=yandex

4. Create the database and tables:

createdb -U postgres testdb

5. Apply the SQL dump:

.\psql.exe -U postgres -p 5433 -d testdb -f ".\dump.sql"

6. Start the server:

npm run dev

7. Open your browser and navigate to:

http://localhost:3000/login

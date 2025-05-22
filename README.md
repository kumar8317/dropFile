# 🗂️ DropFile - Full Stack File Upload Service

DropFile is a simple Dropbox-like application that allows users to upload, view, and download files. It consists of a React + Vite frontend and a Node.js + Express backend powered by MongoDB.

## 📁 Project Structure

dropfile/

- backend/ # Express + TypeScript + MongoDB API

- client/ # React + Vite + TailwindCSS frontend

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/kumar8317/dropfile.git
cd dropfile
```

###  Start the backend

```bash
cd backend
pnpm install
cp .env.example .env    # or create a .env file as described in the backend README
pnpm dev
```


### Start the frontend

```bash
cd client
pnpm install
cp .env.example .env    # or create a .env file with API_URL
pnpm dev
```

## Read More

. [📁 Backend README](backend/README.md)

. [🌐 Frontend README](client/README.md)


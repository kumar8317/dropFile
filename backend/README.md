# 📁 DropFile Backend

This is a Node.js + TypeScript + Express backend for a Dropbox-like file upload service. It supports file uploading, downloading, and viewing, and uses MongoDB as the database.

## 📦 Tech Stack

- Node.js with Express  
- TypeScript  
- MongoDB (via Mongoose)  
- Multer for file uploads  
- Docker for containerization  
- ts-node-dev for development  

## 🚀 Getting Started (Without Docker)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dropfile-backend.git
cd dropfile-backend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Create `.env` file

```env
PORT=3000
MONGO_USER=yourMongoUsername
MONGO_PASSWORD=yourMongoPassword
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=dropfile
```

### 4. Start MongoDB

If MongoDB is not already running locally:

```bash
mongod
```

Or run MongoDB using Docker:

```bash
docker run -d --name dropfile-mongo -p 27017:27017 mongo
```

### 5. Start the server

```bash
pnpm dev
```

Access at: [http://localhost:3000](http://localhost:3000)

## 🐳 Running With Docker

### 1. Build the Docker image

```bash
docker build -t dropfile-backend .
```

### 2. Run the container

```bash
docker run -d \
  --name dropfile-backend \
  -p 3000:3000 \
  --env-file .env \
  dropfile-backend
```

### Optional: Run MongoDB using Docker

```bash
docker run -d \
  --name dropfile-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=yourMongoUsername \
  -e MONGO_INITDB_ROOT_PASSWORD=yourMongoPassword \
  -p 27017:27017 \
  mongo
```

Update `.env`:

```env
MONGO_HOST=host.docker.internal
```

## 🧪 API Endpoints

| Method | Route             | Description              |
|--------|-------------------|--------------------------|
| GET    | `/api/files`          | List all uploaded files  |
| GET    | `/api/files/:id`      | Download file by ID      |
| GET    | `/api/files/view/:id` | View file in browser     |
| POST   | `/api/upload`         | Upload a new file        |

## 🛑 Stop and Clean Up

```bash
docker stop dropfile-backend dropfile-mongo
docker rm dropfile-backend dropfile-mongo
```

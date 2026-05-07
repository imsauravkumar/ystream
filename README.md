# Ystream

Ystream is a full-stack MERN web app for synchronized YouTube watch rooms. Users sign in with Firebase Authentication, create or join rooms, search YouTube from inside the app, build a shared queue, chat, react, and keep playback synchronized across devices with Socket.IO.

## Stack

- Client: React, Vite, Tailwind CSS, React Router, Socket.IO Client, Axios, Firebase Auth
- Server: Node.js, Express, Socket.IO, Mongoose, Firebase Admin, CORS, dotenv
- Database: MongoDB
- Deployments: Vercel for the frontend, Railway for the backend

## Folder Structure

```text
Ystream/
  client/
  server/
    controllers/
    models/
    routes/
    socket/
```

## Environment Variables

Create `client/.env` from `client/.env.example` and `server/.env` from `server/.env.example`.

### Client

```bash
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Server

```bash
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ystream
YOUTUBE_API_KEY=your_youtube_data_api_v3_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@example.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Local Development

```bash
npm install
npm run install:all
npm run dev
```

Client runs on `http://localhost:5173`. Server runs on `http://localhost:5000`.

## Deployment

### Railway Backend

1. Create a Railway project from the repository.
2. Set the root directory to `server`.
3. Add the variables from `server/.env.example`.
4. Deploy. Railway will use `railway.json` and `server/package.json`.

### Vercel Frontend

1. Create a Vercel project from the repository.
2. Set the root directory to `client`.
3. Add all `VITE_*` variables.
4. Set `VITE_API_URL` and `VITE_SOCKET_URL` to the Railway backend URL.
5. Deploy.

## Socket Events

- `join-room`
- `play-video`
- `pause-video`
- `seek-video`
- `change-video`
- `queue-update`
- `sync-state`
- `chat-message`
- `typing`
- `reaction`

## YouTube Usage

Ystream uses the official YouTube Data API v3 for search and the official YouTube IFrame Player API for embedded playback. It does not download videos.

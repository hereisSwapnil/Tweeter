# Tweeter

A social platform built with the MERN stack that allows users to create posts, interact with others, and track engagement through detailed analytics. Users can upload posts, like, comment, share, repost, and view hourly and monthly insights on their content and profile performance.

## 🚀 Features

- **Post Interactions**: Upload posts and engage with likes, comments, shares, and reposts.  
- **Advanced Analytics**: Hourly and monthly analytics for both posts and user profiles.  
- **Modern UI**: Clean and responsive interface built with React and TailwindCSS.  
- **Global State Handling**: Smooth and predictable state management with Redux.  
- **Fast Backend**: REST API built with Node and Express.  
- **Database Storage**: MongoDB for scalable and structured data storage.

## 📸 Screenshots

<!-- Add your screenshots here -->

[![Clean-Shot-2025-11-25-at-01-19-28-2x.png](https://i.postimg.cc/HLB8jsWg/Clean-Shot-2025-11-25-at-01-19-28-2x.png)](https://postimg.cc/XZBYzWyH)
[![Clean-Shot-2025-11-25-at-01-20-08-2x.png](https://i.postimg.cc/2SYxZyYz/Clean-Shot-2025-11-25-at-01-20-08-2x.png)](https://postimg.cc/gnMR9Yr5)
[![Clean-Shot-2025-11-25-at-01-20-37-2x.png](https://i.postimg.cc/xCBvTTgH/Clean-Shot-2025-11-25-at-01-20-37-2x.png)](https://postimg.cc/CBHBc03L)

## 🎥 Demo

*Click the thumbnail above once you add your video preview*

## 🛠️ Tech Stack

### Frontend
- **React**: Component based UI library.  
- **TailwindCSS**: Utility-first CSS styling.  
- **Redux Toolkit**: Predictable global state management.  
- **Axios**: HTTP requests.

### Backend
- **Node.js**: JavaScript runtime.  
- **Express.js**: Minimal and fast backend framework.  
- **MongoDB**: NoSQL database.  
- **Mongoose**: ODM for MongoDB.

## 📋 Prerequisites

Before installation, ensure you have the following:

- [Node.js](https://nodejs.org/)  
- [npm](https://www.npmjs.com/)  
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tweeter
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Environment Variables

### Backend

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
ORIGIN=http://localhost:5173
```

### Frontend

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Running the App

### Start Backend

```bash
cd backend
npm run dev
```
Accessible at [http://localhost:5000](http://localhost:5000)

### Start Frontend

```bash
cd frontend
npm run dev
```
Accessible at [http://localhost:5173](http://localhost:5173)

## 🤝 Contributing

Contributions are welcome. To contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m "Add NewFeature"`)
4. Push (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
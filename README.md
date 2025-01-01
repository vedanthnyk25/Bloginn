# Bloginn - Modern Blogging Platform


## 🚀 Overview

Bloginn is a modern, full-stack blogging platform built with React.js and Appwrite. It provides a seamless and intuitive interface for creating, managing, and sharing blog content with a focus on user experience and performance.

## ✨ Features

- **User Authentication**
  - Secure email/password authentication
  - Protected routes for authenticated users
  - Session management
  - User profile management

- **Blog Management**
  - Create, edit, and delete blog posts
  - Rich text editing with Quill editor
  - Image upload and management
  - Post preview functionality
  - Blog post listing and pagination

- **Modern UI/UX**
  - Responsive design for all devices
  - Smooth GSAP animations
  - Custom scrollbar
  - Modern gradient effects
  - Loading states and transitions

## 🛠️ Technologies Used

- **Frontend**
  - React.js
  - Redux Toolkit (State Management)
  - React Router v6
  - React Hook Form
  - GSAP (Animations)
  - Quill (Rich Text Editor)

- **Styling**
  - Tailwind CSS
  - Custom CSS animations
  - Space Grotesk & Outfit fonts

- **Backend as a Service**
  - Appwrite
    - Authentication
    - Database
    - Storage
    - File Management

## 🔧 Installation & Setup

1. Clone the repository

bash

git clone https://github.com/yourusername/bloginn.git

cd bloginn

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your Appwrite credentials:
```env
VITE_APPWRITE_URL="your_appwrite_url"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
```

4. Start the development server
```bash
npm run dev
```

## 📁 Project Structure
```
src/
├── appwrite/          # Appwrite configuration and services
├── components/        # Reusable React components
├── store/            # Redux store configuration
├── conf/             # Configuration files
├── assets/           # Static assets
└── styles/           # Global styles and Tailwind configuration
```

## 🚀 Deployment

The project can be built for production using:

```bash
npm run build
```

## 🌟 Key Features in Detail

### Authentication Flow
- Secure user registration and login
- Protected routes using Redux state
- Automatic session management

### Blog Management
- Intuitive post creation interface
- Rich text editing capabilities
- Image upload and management
- Post status management (draft/published)

### User Interface
- Responsive design for all screen sizes
- Smooth animations and transitions
- Modern and clean UI elements
- Optimized performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



[Live Demo](https://bloginn.vercel.app/) 

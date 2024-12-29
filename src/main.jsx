import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout, Login } from './components/index.js';

const Home = React.lazy(() => import('./pages/Home.jsx'));
const AddPost = React.lazy(() => import("./pages/AddPost"));
const Signup = React.lazy(() => import('./pages/Signup'));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const Post = React.lazy(() => import("./pages/Post"));
const AllPosts = React.lazy(() => import("./pages/AllPosts"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <Suspense fallback={<div>Loading Posts...</div>}>
              <AllPosts />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <Suspense fallback={<div>Loading Add Post...</div>}>
              <AddPost />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <Suspense fallback={<div>Loading Edit Post...</div>}>
              <EditPost />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Suspense fallback={<div>Loading Post...</div>}>
            <Post />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
</React.StrictMode>
);

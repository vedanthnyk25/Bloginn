import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="bg-gray-800 shadow-md rounded-xl">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <div className="flex items-center">
  <Link to="/" className="flex items-center">
    <div className="text-3xl font-semibold text-indigo-600 hover:text-indigo-800 transition duration-300">
      Bloginn
    </div>
  </Link>
</div>


          {/* Navigation Links */}
          <ul className="flex space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 transition duration-300 ease-in-out hover:text-blue-500 hover:bg-gray-100 rounded-lg"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

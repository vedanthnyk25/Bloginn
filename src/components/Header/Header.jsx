import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header({ darkMode, toggleDarkMode }) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md bg-opacity-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-xl transition-all duration-300`}>
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className={`text-3xl font-semibold ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'} transition duration-300`}>
                Bloginn
              </div>
            </Link>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} transition duration-300`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>

          {/* Navigation Links */}
          <ul className={`hidden md:flex space-x-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`px-4 py-2 text-sm font-medium transition duration-300 ease-in-out hover:text-blue-500 hover:bg-gray-100 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className={`md:hidden mt-4 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm font-medium transition duration-300 ease-in-out hover:text-blue-500 hover:bg-gray-100 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
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
        )}
      </Container>
    </header>
  );
}

export default Header;

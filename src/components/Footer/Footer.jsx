import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Content Section */}
      <section className="flex-grow">
        {/* Your main content goes here */}
      </section>

      {/* Footer Section */}
      <section className="bg-gray-900 text-white py-8 w-full mt-auto">
        <div className="w-full mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo and Copyright */}
            <div className="flex flex-col items-center md:items-start">
              <div className="text-3xl font-semibold text-indigo-600 hover:text-indigo-800 transition duration-300">
                Bloginn
              </div>
              <p className="mt-4 text-sm text-gray-400">
                &copy; 2023 Bloginn. All Rights Reserved.
              </p>
            </div>
            
            {/* Company Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Company</h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Support</h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Legals</h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-base text-gray-400 hover:text-indigo-500 transition duration-300" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Social Links (optional) */}
          <div className="mt-12 text-center">
            <ul className="flex justify-center space-x-6">
              <li>
                <a href="/" className="text-gray-400 hover:text-indigo-500 transition duration-300">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-indigo-500 transition duration-300">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-indigo-500 transition duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-indigo-500 transition duration-300">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer;

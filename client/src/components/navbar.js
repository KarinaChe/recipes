import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const [cookies, setCookies ] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () =>{
    setCookies("access_token","");
    window.localStorage.removeItem("userId");
    navigate("/auth");
  }

  return (
    <nav className="m-0 md:w-full bg-black md:flex md:justify-around md:items-center h-20">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-4xl justify-left font-semibold">
          <Link to="/">Recipes App </Link>
        </h1>
        <button
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
        >
          {/* Иконка меню для мобильных устройств */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div className={`md:flex ${isMobileMenuOpen ? 'md:flex' : 'hidden md:space-x-6 md:flex-row items-center'} md:items-center`}>
        <Link to="/" className="text-white no-underline m-2 md:m-0 md:text-xl">
          Home
        </Link>
        <Link to="/create-recipe" className="text-white no-underline m-2 md:m-0 md:text-xl">
          Create Recipe
        </Link>
        {!cookies.access_token ? (
          <Link to="/auth" className="text-white no-underline m-2 md:m-0 md:text-xl">
            Login/Register
          </Link>
        ) : (
          <>
            <Link to="/saved-recipes" className="text-white no-underline m-2 md:m-0 md:text-xl">
              Saved Recipes
            </Link>
            <button onClick={logout} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

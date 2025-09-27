'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { authService } from '../../services/authService';
import './Header.scss';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = authService.isAuthenticated();
      const currentUser = authService.getCurrentUser();
      
      setIsAuthenticated(authStatus);
      setUser(currentUser);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    // Redirect to home page
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <h1>My Next App</h1>
          </div>
          <div className="header__loading">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link href="/">
            <h1>My Next App</h1>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link href="/" className="header__nav-link">Главная</Link>
            </li>
            <li className="header__nav-item">
              <Link href="/about" className="header__nav-link">О нас</Link>
            </li>
            <li className="header__nav-item">
              <Link href="/contact" className="header__nav-link">Контакты</Link>
            </li>
          </ul>
        </nav>
        <div className="header__actions">
          {isAuthenticated ? (
            <div className="header__user-menu">
              <span className="header__user-name">
                Привет, {user?.firstName}!
              </span>
              <div className="header__user-dropdown">
                <Link href="/profile" className="header__dropdown-link">Профиль</Link>
                <Link href="/settings" className="header__dropdown-link">Настройки</Link>
                <button 
                  onClick={handleLogout}
                  className="header__dropdown-link header__dropdown-link--logout"
                >
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="header__btn header__btn--primary">
                Войти
              </Link>
              <Link href="/register" className="header__btn header__btn--secondary">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

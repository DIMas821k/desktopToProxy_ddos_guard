'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../services/authService';
import './dashboard.scss';

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!authService.isAuthenticated()) {
        router.push('/login');
        return;
      }
      
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    authService.logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__header">
          <h1 className="dashboard__title">Добро пожаловать в панель управления!</h1>
          <p className="dashboard__subtitle">
            Привет, {user.firstName} {user.lastName}! Вы успешно вошли в систему.
          </p>
        </div>

        <div className="dashboard__content">
          <div className="dashboard__cards">
            <div className="dashboard__card">
              <div className="card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="card__title">Профиль</h3>
              <p className="card__description">
                Управляйте информацией о своем профиле
              </p>
              <button className="card__button">Открыть профиль</button>
            </div>

            <div className="dashboard__card">
              <div className="card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="card__title">Настройки</h3>
              <p className="card__description">
                Настройте параметры приложения
              </p>
              <button className="card__button">Открыть настройки</button>
            </div>

            <div className="dashboard__card">
              <div className="card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="card__title">Статистика</h3>
              <p className="card__description">
                Просматривайте статистику использования
              </p>
              <button className="card__button">Открыть статистику</button>
            </div>
          </div>

          <div className="dashboard__info">
            <div className="info__card">
              <h3 className="info__title">Информация о пользователе</h3>
              <div className="info__content">
                <div className="info__row">
                  <span className="info__label">Имя:</span>
                  <span className="info__value">{user.firstName}</span>
                </div>
                <div className="info__row">
                  <span className="info__label">Фамилия:</span>
                  <span className="info__value">{user.lastName}</span>
                </div>
                <div className="info__row">
                  <span className="info__label">Email:</span>
                  <span className="info__value">{user.email}</span>
                </div>
                <div className="info__row">
                  <span className="info__label">ID:</span>
                  <span className="info__value">{user.id}</span>
                </div>
              </div>
            </div>

            <div className="info__card">
              <h3 className="info__title">Действия</h3>
              <div className="info__actions">
                <button className="action__button action__button--primary">
                  Редактировать профиль
                </button>
                <button className="action__button action__button--secondary">
                  Изменить пароль
                </button>
                <button 
                  onClick={handleLogout}
                  className="action__button action__button--danger"
                >
                  Выйти из системы
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

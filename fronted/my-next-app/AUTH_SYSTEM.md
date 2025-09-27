# Система аутентификации

## Обзор

Создана полная система аутентификации с заглушками для бэкенда, включающая:

- ✅ Страницы входа и регистрации
- ✅ Валидация форм на клиенте
- ✅ Заглушки API для аутентификации
- ✅ Управление состоянием пользователя
- ✅ Защищенные маршруты
- ✅ Адаптивный дизайн

## Структура файлов

```
├── app/
│   ├── login/
│   │   ├── page.js          # Страница входа
│   │   └── auth.scss        # Стили для auth страниц
│   ├── register/
│   │   ├── page.js          # Страница регистрации
│   │   └── auth.scss        # Стили для auth страниц
│   └── dashboard/
│       ├── page.js          # Защищенная страница
│       └── dashboard.scss   # Стили дашборда
├── services/
│   └── authService.js       # API сервис с заглушками
└── components/
    ├── Header/              # Обновлен с auth состоянием
    └── Footer/              # Новый компонент
```

## Функциональность

### 🔐 Аутентификация

**Вход в систему:**
- Email и пароль
- Валидация полей
- Сохранение токена в localStorage
- Редирект на дашборд

**Регистрация:**
- Имя, фамилия, email, пароль
- Подтверждение пароля
- Согласие с условиями
- Валидация сложности пароля

**Выход:**
- Очистка localStorage
- Редирект на главную

### 🛡️ Защита маршрутов

- Проверка аутентификации
- Автоматический редирект
- Загрузочные состояния

### 🎨 UI/UX

- Адаптивный дизайн
- Валидация в реальном времени
- Индикаторы загрузки
- Сообщения об ошибках
- Hover эффекты

## API Заглушки

### authService.js

```javascript
// Проверка аутентификации
authService.isAuthenticated()

// Получение текущего пользователя
authService.getCurrentUser()

// Вход
authService.login({ email, password })

// Регистрация
authService.register({ firstName, lastName, email, password })

// Выход
authService.logout()

// Восстановление пароля
authService.forgotPassword(email)

// Сброс пароля
authService.resetPassword(token, newPassword)

// Обновление профиля
authService.updateProfile(userData)
```

## Тестовые данные

Для тестирования используйте:

**Email:** `john@example.com`  
**Пароль:** `password123`

**Email:** `jane@example.com`  
**Пароль:** `password123`

## Интеграция с бэкендом

### 1. Замените заглушки на реальные API вызовы:

```javascript
// Вместо mock данных
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
});
```

### 2. Обновите URL endpoints:

```javascript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
```

### 3. Добавьте обработку ошибок:

```javascript
if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message);
}
```

## Настройка

### 1. Установите зависимости:

```bash
npm install sass
```

### 2. Запустите проект:

```bash
npm run dev
```

### 3. Откройте в браузере:

- Главная: `http://localhost:3000`
- Вход: `http://localhost:3000/login`
- Регистрация: `http://localhost:3000/register`
- Дашборд: `http://localhost:3000/dashboard`

## Особенности

### 🔒 Безопасность

- Токены хранятся в localStorage
- Автоматическая проверка срока действия
- Валидация на клиенте и сервере

### 📱 Адаптивность

- Мобильная навигация
- Адаптивные формы
- Responsive дизайн

### ⚡ Производительность

- Ленивая загрузка компонентов
- Оптимизированные анимации
- Минимальные перерендеры

## Следующие шаги

1. **Интеграция с бэкендом** - замените заглушки на реальные API
2. **JWT токены** - добавьте refresh token механизм
3. **Роли пользователей** - система разрешений
4. **Двухфакторная аутентификация** - дополнительная безопасность
5. **Социальные логины** - OAuth интеграция

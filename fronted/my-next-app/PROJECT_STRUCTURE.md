# Структура проекта с Header и SCSS переменными

## Созданные файлы и папки

### 📁 components/Header/
- **Header.js** - React компонент хедера с навигацией и кнопками
- **Header.scss** - Стили хедера с использованием SCSS переменных и миксинов

### 📁 styles/
- **variables.scss** - Глобальные переменные (цвета, шрифты, отступы, брейкпоинты)
- **mixins.scss** - SCSS миксины для переиспользования кода
- **main.scss** - Основной SCSS файл с базовыми стилями
- **examples.scss** - Примеры использования переменных и миксинов

### 📄 Обновленные файлы
- **app/layout.js** - Интегрирован Header компонент
- **app/globals.css** - Добавлены импорты SCSS файлов
- **app/page.js** - Добавлен пример использования стилей

## Возможности системы

### 🎨 Переменные
- **Цвета**: Primary, secondary, neutral, status colors
- **Типографика**: Размеры шрифтов, веса, высота строк
- **Отступы**: От xs (4px) до 4xl (96px)
- **Тени**: От xs до xl
- **Переходы**: Быстрые, обычные, медленные
- **Z-index**: Для модалок, хедера, дропдаунов

### 🔧 Миксины
- **Responsive**: `@include respond-to(md)`, `@include respond-below(lg)`
- **Layout**: `@include flex-center`, `@include container`
- **Components**: `@include button-base`, `@include card`
- **Animations**: `@include fade-in`, `@include slide-up`

### 📱 Адаптивность
- Брейкпоинты: xs, sm, md, lg, xl, 2xl
- Контейнеры с максимальной шириной
- Мобильная навигация (скрывается на md и меньше)

## Установка и запуск

1. Установите sass:
```bash
npm install sass
```

2. Запустите проект:
```bash
npm run dev
```

## Использование

### В SCSS файлах:
```scss
.my-component {
  color: var(--color-primary);
  padding: var(--spacing-md);
  @include respond-to(md) {
    display: flex;
  }
}
```

### В React компонентах:
```jsx
import './MyComponent.scss';

const MyComponent = () => {
  return <div className="my-component">Content</div>;
};
```

## Header компонент

Включает:
- Логотип/название сайта
- Навигационное меню (скрывается на мобильных)
- Кнопки действий (Sign In, Sign Up)
- Адаптивный дизайн
- Hover эффекты и переходы

Header автоматически отображается на всех страницах через layout.js.

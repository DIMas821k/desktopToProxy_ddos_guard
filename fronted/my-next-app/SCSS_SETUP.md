# SCSS Setup Instructions

Для работы с SCSS файлами в проекте необходимо установить пакет `sass`:

```bash
npm install sass
```

## Структура проекта

```
├── components/
│   └── Header/
│       ├── Header.js          # React компонент хедера
│       └── Header.scss        # Стили хедера
├── styles/
│   ├── variables.scss         # Глобальные переменные (цвета, шрифты, отступы)
│   ├── mixins.scss           # SCSS миксины для переиспользования
│   └── main.scss             # Основной SCSS файл
└── app/
    ├── globals.css           # Импортирует SCSS файлы
    └── layout.js             # Интегрирует Header компонент
```

## Использование

После установки `sass` все SCSS файлы будут автоматически компилироваться Next.js.

### Переменные

Все переменные определены в `styles/variables.scss` и доступны во всех SCSS файлах:

```scss
.my-component {
  color: var(--color-primary);
  padding: var(--spacing-md);
  font-size: var(--font-size-lg);
}
```

### Миксины

Используйте миксины из `styles/mixins.scss`:

```scss
.responsive-component {
  @include respond-to(md) {
    display: flex;
  }
  
  @include flex-center;
  @include card;
}
```

### Компоненты

Header компонент уже интегрирован в `layout.js` и будет отображаться на всех страницах.

# STŌN — Архитектурные уличные светильники из камня

Production-ready каталожный сайт бренда STŌN. React + Vite + Tailwind CSS + TypeScript.

---

## Архитектура

```
src/
├── assets/            # Статические изображения (импортируются в компоненты)
├── components/
│   ├── forms/         # LeadForm, RequestProjectForm, PriceRequestForm, etc.
│   ├── layout/        # Header, Footer, PageLayout, Section, CTASection, Grid
│   ├── sections/      # Секции главной страницы (Hero, Advantages, FAQ, etc.)
│   └── ui/            # Переиспользуемые UI-компоненты (shadcn + кастомные)
├── data/              # Контентная layer — товары, проекты, статьи, FAQ
├── hooks/             # Хуки (use-mobile, use-toast, use-utm)
├── lib/               # Утилиты (analytics, utils)
├── pages/             # Страницы (1 файл = 1 маршрут)
├── test/              # Тесты
└── types/             # TypeScript типы и интерфейсы
```

### Ключевые принципы
- **Контент отделён от кода**: все данные в `src/data/` — можно заменить на CMS API
- **Компонентная архитектура**: Section, PageLayout, LeadForm — переиспользуемые блоки
- **Семантические токены**: цвета через CSS custom properties, не хардкод
- **Lazy loading**: все страницы кроме главной загружаются лениво

---

## Как добавить товар

1. Откройте `src/data/products.ts`
2. Добавьте объект в массив `products`, следуя типу `Product` из `src/types/index.ts`
3. Обязательные поля: `id`, `slug`, `name`, `category`, `variants`, `images`, `seo`
4. Товар автоматически появится в каталоге и будет доступен по `/catalog/{slug}`

## Как добавить страницу

1. Создайте файл в `src/pages/YourPage.tsx`
2. Используйте `<PageLayout title="..." description="...">` как обёртку
3. Добавьте маршрут в `src/App.tsx` (lazy import + Route)
4. При необходимости добавьте ссылку в Header (`src/components/layout/Header.tsx`)

## Как добавить проект / кейс

1. Добавьте объект в `src/data/projects.ts` по типу `ProjectCase`
2. Появится на `/projects` и `/projects/{slug}`

## Как добавить статью

1. Добавьте объект в `src/data/articles.ts` по типу `Article`
2. Появится на `/blog` и `/blog/{slug}`

---

## Аналитика

### Яндекс Метрика
1. Получите ID счётчика в Метрике
2. Добавьте код счётчика в `index.html` (перед `</head>`)
3. Установите `window.__METRIKA_ID__ = YOUR_ID` — события будут отправляться автоматически

### Карта целей
| Приоритет | Событие | Описание |
|-----------|---------|----------|
| Primary | `request_project` | Заявка на проект |
| Primary | `architect_lead` | Лид от архитектора |
| Secondary | `request_price` | Запрос цены |
| Secondary | `request_consultation` | Запрос консультации |
| Secondary | `request_catalog` | Запрос каталога |
| Secondary | `request_custom` | Кастомный запрос |
| Mid-funnel | `form_start` | Начало заполнения формы |
| Mid-funnel | `download_pdf` | Скачивание PDF |
| Micro | `product_view`, `project_view`, `article_view` | Просмотры контента |

### CRM интеграция
Все формы собирают данные через `LeadForm` → `onSubmit`. Для подключения CRM:
1. Замените `onSubmit` на API-вызов к вашему CRM (amoCRM, Bitrix24, etc.)
2. UTM-метки (`utm_source`, `utm_medium`, `utm_campaign`, `yclid`) автоматически прикрепляются

---

## Подключение CMS

Текущая архитектура готова к миграции на headless CMS:
1. Замените данные из `src/data/*.ts` на API-вызовы (через React Query)
2. Типы в `src/types/index.ts` — это ваш контракт между CMS и фронтендом
3. `PageLayout` поддерживает `canonical` и `jsonLd` для динамического SEO

Рекомендуемые CMS: Strapi, Directus, Payload CMS, Sanity

---

## Запуск

```bash
npm install
npm run dev       # Разработка
npm run build     # Production сборка
npm run preview   # Предпросмотр сборки
```

---

## 🚀 Checklist запуска

### SEO
- [ ] Заменить `ston.ru` на реальный домен в `robots.txt`, `sitemap.xml`, `index.html`
- [ ] Добавить `og:image` (рекомендуется 1200×630)
- [ ] Добавить `yandex-verification` мета-тег
- [ ] Проверить все страницы в Яндекс.Вебмастере
- [ ] Добавить продуктовые и проектные URL в `sitemap.xml`

### Аналитика
- [ ] Подключить Яндекс Метрику (код + `__METRIKA_ID__`)
- [ ] Настроить цели в Метрике по карте выше
- [ ] Подключить Яндекс Директ (если нужен)
- [ ] Проверить отправку событий в реальном времени

### Формы
- [ ] Подключить API для отправки форм (CRM / email / webhook)
- [ ] Протестировать все 7 форм (general, project, consultation, price, catalog, architect, custom)
- [ ] Проверить антиспам (honeypot)
- [ ] Проверить UTM-передачу

### Юридическое
- [ ] Проверить тексты политики конфиденциальности (юрист)
- [ ] Проверить cookie policy
- [ ] Проверить согласие на обработку ПД
- [ ] Проверить пользовательское соглашение
- [ ] Убедиться в корректности cookie баннера

### Технические
- [ ] Подключить реальный домен
- [ ] Настроить SSL
- [ ] Проверить favicon
- [ ] Добавить social preview image
- [ ] Проверить 404 страницу
- [ ] Проверить мобильную версию всех страниц
- [ ] Заменить placeholder-контент на реальные фото
- [ ] Заменить тестовые телефоны/email на реальные
- [ ] Убрать console.log из production (analytics DEV-режим отключится автоматически)

### Контент
- [ ] Загрузить реальные фотографии товаров
- [ ] Заполнить реальные описания и характеристики
- [ ] Добавить реальные проекты / кейсы
- [ ] Написать реальные статьи для блога

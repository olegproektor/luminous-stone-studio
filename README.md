# Форма Света

Рабочий репозиторий сайта бренда «Форма Света» для российского рынка.

Стек: `React + Vite + TypeScript + Tailwind CSS`.

Сайт строится не как e-commerce-витрина SKU, а как проектный продуктовый сайт: пользователь проходит через коллекции, материалы, проектные сценарии, раздел загрузок и формы, после чего переводится в обсуждение проекта.

---

## Архитектура

```text
src/
├── assets/                  # Статические изображения
├── components/
│   ├── downloads/           # Раздел загрузок, gated-материалы, служебные модули
│   ├── forms/               # LeadForm, обёртки, сценарии заявок
│   ├── layout/              # Header, Footer, PageLayout, PageHero, Section
│   ├── products/            # Витрина изделий, rail-панель, product/collection blocks
│   ├── sections/            # Секции главной и вспомогательных страниц
│   ├── shared/              # Общие контентные блоки
│   └── ui/                  # Базовые UI-компоненты
├── config/                  # routes, navigation, analytics map, sitemap config
├── data/                    # Контент и конфигурация на основе seed-слоя
├── hooks/                   # analytics, utm, media hooks
├── lib/                     # canonical, analytics, schema, download/form helpers
├── pages/                   # Route-level страницы
├── test/                    # Smoke и unit tests
└── types/                   # Контракты доменных сущностей и слоёв доставки данных
```

### Ключевые принципы

- **Русский публичный интерфейс**: публичный UI и tone of voice по умолчанию русскоязычные.
- **Основные canonical-маршруты**: canonical routes первичны, legacy aliases поддерживаются для совместимости.
- **Контент через seed-слой**: контент и композиция максимально вынесены из JSX в `src/data` и `src/config`.
- **Защищённые системы**: canonical policy, metadata pipeline, analytics wiring, lead form contracts и download gate не должны ломаться в рамках обычных UI-итераций.
- **Проектная конверсия**: основная конверсия сайта — обсуждение проекта, а не корзина и оформление заказа.
- **Запуск в `.ru` зоне**: доменная, языковая и аналитическая логика проекта ориентированы на `.ru`-запуск и российский рынок.

---

## Защищённые системы

Без отдельного решения не менять:

- alias-first routing / canonical URL policy
- metadata pipeline
- JSON-LD / schema hooks
- sitemap.xml и robots.txt generation policy
- названия аналитических событий и их wiring
- lead form contracts и wrappers
- download gate logic
- `/for-objects` qualification flow
- sticky CTA policy
- core data/entity shapes
- seed/config-driven content architecture
- Яндекс.Метрика как базовая web-аналитика

---

## Canonical routes и aliases

### Canonical routes

- `/`
- `/izdeliya`
- `/izdeliya/:collectionSlug`
- `/izdeliya/:collectionSlug/:productSlug`
- `/izdeliya/faktura`
- `/izdeliya/faktura/:slug`
- `/komplekty`
- `/proekty`
- `/proekty/:slug`
- `/skachat`
- `/skachat/:category`
- `/novosti`
- `/novosti/:slug`
- `/kontakty`
- `/company`
- `/voprosy`

### Legacy aliases

- `/products` -> `/izdeliya`
- `/catalog` -> `/izdeliya`
- `/collections` -> `/izdeliya`
- `/materials` -> `/izdeliya/faktura`
- `/for-objects` -> `/komplekty`
- `/custom` -> `/komplekty`
- `/projects` -> `/proekty`
- `/downloads` -> `/skachat`
- `/for-architects` -> `/skachat`
- `/blog` -> `/novosti`
- `/contacts` -> `/kontakty`
- `/faq` -> `/voprosy`
- `/about` -> `/company`

Правила:

- в sitemap и canonical попадают только canonical routes
- внутренние ссылки строятся через route helpers, а не через вручную прописанные legacy href
- alias routes существуют как слой совместимости, а не как параллельная IA

Ключевые файлы:

- `src/config/routes.ts`
- `src/lib/route-helpers.ts`
- `src/lib/canonical.ts`

---

## Контентная архитектура

Проект уже живёт не на модели «всё в JSX», а на контентном seed-слое.

Основные источники:

- `src/data/izdeliya-architecture.seed.ts` — canonical-структура изделий, коллекций и вложенных product routes
- `src/data/public-catalog-state.ts` — статусы запуска и indexability
- `src/data/products-showcase.seed.ts` — витринный смысловой слой каталога
- `src/data/product-page-content.seed.ts` — смысловая подача product pages
- `src/data/home-layout.seed.ts` — композиция главной страницы
- `src/data/projects.ts` — проекты
- `src/data/articles.ts` — материалы и новости
- `src/data/downloads.seed.ts` — материалы для загрузки и категории
- `src/data/company.seed.ts`, `src/data/page-content.seed.ts`, `src/data/legal.seed.ts` — содержимое страниц и legal content

Правило:

- factual data хранить в seed/data слое
- смысловую подачу страниц отделять от core entities
- layout/config не смешивать с factual content
- публичный контент не размазывать по JSX без необходимости

---

## Метаданные, schema и SEO

SEO-слой собран вокруг `PageLayout` и metadata pipeline.

Что уже поддерживается:

- `title`
- `description`
- canonical URL
- `robots`
- JSON-LD/schema hooks
- генерация sitemap
- генерация robots

Ключевые файлы:

- `src/components/layout/PageLayout.tsx`
- `src/lib/schema.ts`
- `src/config/schema-map.ts`
- `src/config/sitemap.config.ts`
- `scripts/generate-sitemap.mjs`
- `scripts/generate-robots.mjs`

Важно:

- canonical policy считается защищённой системой
- любые UI-изменения не должны ломать schema hooks и alias/canonical поведение
- `VITE_SITE_URL` используется как источник домена для runtime/meta и SEO-скриптов

---

## Формы и слой доставки

Все публичные формы должны проходить через единый form contract.

Ключевые файлы:

- `src/components/forms/LeadForm.tsx`
- `src/components/forms/LeadFormWrapper.tsx`
- `src/components/forms/RequestProjectForm.tsx`
- `src/lib/form-delivery.ts`
- `src/config/form-endpoints.ts`
- `src/types/lead-form-contract.ts`
- `src/types/form-delivery.ts`

Текущая модель:

- формы собирают payload в одном формате
- honeypot, consent и UTM capture встроены в общий слой форм
- отправка идёт через `deliverForm`
- режим работы задаётся env-переменными

Live-режим:

- `VITE_FORM_DELIVERY_MODE=live` и непустой URL на каждую отправляемую форму
- `CatalogRequestForm` (`request_catalog`) и `ConsultationForm` (`request_consultation`) вызывают `deliverForm` явно
- production + `mock` и live с пустым endpoint закрываются ответом 503
- образец CRM webhook и Telegram-relay, состав JSON (`_form`, `_source`, `_timestamp`, UTM) — в `.env.example`
- токен бота и другие секреты в `VITE_*` не класть: они попадают в публичный бандл

Важно:

- не менять event names у form analytics без отдельного решения
- не обходить `LeadForm` «простыми формами на странице»
- отсутствие endpoint должно обрабатываться предсказуемым UI-состоянием

---

## Раздел загрузок и gated-материалы

Раздел загрузок — это отдельная продуктовая подсистема, а не просто папка файлов.

Ключевые файлы:

- `src/pages/DownloadsHubPage.tsx`
- `src/pages/DownloadCategoryPage.tsx`
- `src/components/downloads/DownloadGateForm.tsx`
- `src/components/downloads/modules/*`
- `src/data/downloads.seed.ts`
- `src/config/download-file-governance.ts`
- `src/lib/download-access.ts`

Правила:

- открытые материалы скачиваются напрямую
- gated-материалы требуют форму
- governance rules должны покрывать используемые категории
- материалы должны вести к обсуждению проекта, а не существовать как «скачать любой ценой»

---

## Аналитика

Проект подготовлен под Яндекс.Метрику как базовую систему веб-аналитики для `.ru`-запуска и внутренних product/form events.

Ключевые файлы:

- `src/lib/analytics.ts`
- `src/config/analytics-event-map.ts`
- `src/hooks/useAnalyticsView.ts`
- `src/components/TrackedCta.tsx`

Что трекается:

- `page_view`
- list/detail views
- CTA clicks
- product/project/article views
- form start / submit / success / fail / error
- download intent / download success
- contact clicks
- cookie consent actions

### Подключение Метрики

Если задан `VITE_METRIKA_ID`, Яндекс.Метрика подключается автоматически через `src/main.tsx`. Пустое значение — режим по умолчанию: тег не вставляется, в `index.html` оставлен только комментарий-слот без числового ID.

### Карта основных целей

| Приоритет | Событие | Описание |
|-----------|---------|----------|
| Primary | `request_project` | Заявка на проект |
| Primary | `architect_lead` | Лид от архитектора |
| Secondary | `request_price` | Запрос цены |
| Secondary | `request_consultation` | Запрос консультации |
| Secondary | `request_catalog` | Запрос каталога |
| Secondary | `request_custom` | Кастомный запрос |
| Mid-funnel | `form_start` | Начало заполнения формы |
| Mid-funnel | `download_pdf`, `download_intent` | Намерение и факт скачивания |
| Micro | `product_view`, `project_view`, `article_view` | Просмотры контента |

---

## Как продолжать разработку

### Как добавить страницу

1. Создайте файл в `src/pages/YourPage.tsx`
2. Используйте `PageLayout` как каркас страницы
3. Добавьте lazy import и route в `src/App.tsx`
4. Используйте route helpers и не добавляйте вручную прописанные legacy paths

### Как добавить коллекцию или изделие

1. Обновите `src/data/izdeliya-architecture.seed.ts`
2. Если нужно, синхронизируйте launch/indexability через `src/data/public-catalog-state.ts`
3. Проверьте canonical path и использование route helpers
4. Если страница indexable, не забудьте про metadata/SEO consistency

### Как добавить article / project / download

1. Обновите соответствующий seed в `src/data`
2. Сверьте ссылочные path helpers
3. Для раздела загрузок убедитесь, что файл действительно существует в `public/downloads`, либо пока не публикуйте его в seed

---

## Переменные окружения

См. `.env.example`.

Основные переменные:

- `VITE_SITE_URL`
- `VITE_METRIKA_ID`
- `VITE_FORM_DELIVERY_MODE`
- `VITE_FORM_ENDPOINT_CONTACT`
- `VITE_FORM_ENDPOINT_PROJECT`
- `VITE_FORM_ENDPOINT_PRICE`
- `VITE_FORM_ENDPOINT_CATALOG`
- `VITE_FORM_ENDPOINT_CONSULTATION`
- `VITE_FORM_ENDPOINT_CUSTOM`
- `VITE_FORM_ENDPOINT_ARCHITECT`
- `VITE_FORM_ENDPOINT_DOWNLOAD_GATE`

---

## Запуск

```bash
npm install
npm run dev
npm run build
npm run test
```

SEO-скрипты:

```bash
npm run generate:seo
```

`prebuild` автоматически запускает генерацию `sitemap.xml` и `robots.txt`.

---

## Проверки после изменений

Минимум:

- `npx tsc --noEmit`
- `npm run build`
- `npm run test`

Если трогали routes, forms, SEO, downloads, company, FAQ, page shell или qualification flow, дополнительно проверить:

- canonical routes и alias resolution
- canonical tags
- JSON-LD/schema hooks
- корректность sitemap / robots
- `/izdeliya`
- страницы коллекций и вложенных моделей
- `/izdeliya/faktura`
- `/skachat`
- open vs gated download flow
- `/komplekty`
- `/custom` alias behavior
- `/company`
- `/voprosy`
- success / fail states форм
- sticky CTA и cookie banner overlap на mobile

---

## Чек-лист перед запуском

### SEO

- [ ] Проверить `VITE_SITE_URL` для production
- [ ] Проверить canonical tags на ключевых страницах
- [ ] Проверить JSON-LD на indexable pages
- [ ] Проверить sitemap.xml и robots.txt после build
- [ ] Проверить сайт в Яндекс.Вебмастере

### Аналитика

- [ ] Подключить production `VITE_METRIKA_ID` для Яндекс.Метрики
- [ ] Проверить отправку page/form/cta/download событий
- [ ] Сверить карту целей в Метрике

### Формы

- [ ] Подключить реальные endpoints для production
- [ ] Протестировать contact / project / price / download gate формы
- [ ] Проверить honeypot и consent behavior
- [ ] Проверить UTM-передачу

### Downloads

- [ ] Положить реальные согласованные файлы в `public/downloads`
- [ ] Проверить gated/open flow на production-сборке
- [ ] Проверить governance consistency

### Контент

- [ ] Заменить placeholder-контент на реальные фото и согласованные материалы
- [ ] Сверить словарь бренда на всех страницах
- [ ] Обновить legal copy после юр. проверки

### Технические

- [ ] Проверить favicon и social preview image
- [ ] Проверить мобильную версию ключевых страниц
- [ ] Проверить 404
- [ ] Проверить alias behavior после деплоя

---

## Важно для команды

README должен описывать фактическое состояние текущей архитектуры, а не историческую версию проекта.

Если меняются:

- canonical routing
- metadata/schema pipeline
- analytics wiring
- form delivery contracts
- download gate behavior
- seed/config-driven architecture

обновляйте `README` вместе с кодом.

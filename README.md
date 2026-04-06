# КАМЕНЬ И СВЕТ / Luminous Stone Studio

Frontend-репозиторий сайта о премиальных каменных уличных светильниках для российского рынка.

Проект построен на `React + Vite + TypeScript + Tailwind CSS` и использует:
- alias-first routing
- canonical URL policy
- seed/config-driven content architecture
- единый `PageLayout` для meta / OG / canonical / JSON-LD
- защищённые контракты форм, аналитики и download-gate

## О проекте

КАМЕНЬ И СВЕТ — русскоязычный сайт о каменных уличных светильниках для частной и архитектурной среды.

Ключевые принципы:
- русскоязычный public UI по умолчанию
- canonical-first SEO и алиасы для совместимости
- seed-driven контентный слой с возможностью миграции на CMS
- повторно используемые layout и page-модули
- отдельные защищённые подсистемы для форм, аналитики, downloads и qualification flow

## Текущая архитектура

```text
src/
├── components/
│   ├── collections/     # Модули страниц коллекций
│   ├── downloads/       # Download gate и UI загрузок
│   ├── for-objects/     # Qualification flow для объектов
│   ├── forms/           # LeadForm, presets, wrappers
│   ├── layout/          # Header, Footer, PageLayout, CTASection
│   ├── products/        # Каталог, коллекции, product pages
│   ├── sections/        # Секции главной страницы
│   ├── shared/          # Общие контентные блоки
│   └── ui/              # Базовые UI-компоненты
├── config/              # routes, metadata maps, analytics maps
├── data/                # seed/config файлы контента
├── hooks/               # UTM, analytics view, media hooks
├── lib/                 # canonical, route-helpers, analytics, schema, delivery
├── pages/               # Route-level страницы
├── test/                # Smoke и unit tests
└── types/               # TypeScript-контракты
```

Ключевые точки:
- `src/config/routes.ts` — canonical routes и legacy aliases
- `src/lib/route-helpers.ts` — генерация внутренних ссылок
- `src/components/layout/PageLayout.tsx` — title / meta / canonical / JSON-LD
- `scripts/generate-sitemap.mjs` — генерация sitemap
- `scripts/generate-robots.mjs` — генерация robots.txt

## Protected systems

Без отдельного архитектурного решения не менять:
- alias-first routing
- canonical URL policy
- metadata pipeline
- JSON-LD / schema hooks
- sitemap / robots generation policy
- analytics event names и wiring
- lead form contracts и wrappers
- download gate logic
- `/for-objects` qualification flow
- sticky CTA policy
- core data / entity shapes
- seed/config-driven content architecture

## Canonical routes и aliases

### Canonical
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

### Aliases / legacy compatibility
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

Важно:
- в sitemap и canonical должны попадать только canonical routes
- внутренние ссылки строить только через `buildPath` и route helpers

## Контентная модель

Контент хранится в seed/data слое и может быть заменён на CMS без поломки UI-контрактов.

Подробная схема:
- `CONTENT_ARCHITECTURE.md` — правила разделения `core entities`, `presentation/storytelling` и `layout/config`

Основные источники:
- `src/data/products.ts` — основная продуктовая база
- `src/data/collections.ts` — legacy / общие коллекции
- `src/data/izdeliya-architecture.seed.ts` — структура витрины `/izdeliya`, коллекций и вложенных product routes
- `src/data/products-showcase.seed.ts` — showcase/view-layer данные
- `src/data/projects.ts` — проекты
- `src/data/articles.ts` — новости / статьи
- `src/data/downloads.seed.ts` — загрузки
- `src/data/faq.seed.ts`, `src/data/faq.ts` — FAQ
- `src/data/legal.seed.ts` — юридические тексты
- `src/data/company.seed.ts` — данные о компании
- `src/data/product-page-content.seed.ts` — product-page storytelling
- `src/data/page-content.seed.ts`, `src/data/trust-content.seed.ts`, `src/data/trust-proofs.seed.ts` — editorial / page-level контент
- `src/data/home-layout.seed.ts` — layout composition

Правило:
- factual data хранить в `core entity seeds`
- page storytelling хранить отдельно
- layout/config не смешивать с factual content
- публичный контент не хранить напрямую в JSX

## Изделия, коллекции и модели

Текущая IA для product layer:
- `/izdeliya` — витрина коллекций
- `/izdeliya/:collectionSlug` — страница коллекции
- `/izdeliya/:collectionSlug/:productSlug` — страница модели внутри коллекции
- `/products/:slug` и `/catalog/:slug` — legacy/general product detail

При добавлении коллекции или модели:
1. обновляйте данные в `src/data/izdeliya-architecture.seed.ts` и связанных seed-файлах
2. следите, чтобы `slug` совпадал с route conventions
3. все переходы на страницы изделий стройте через `buildPath.collectionProduct(...)`
4. не добавляйте прямые hardcoded URL в компоненты

## Формы, аналитика, downloads

### Формы
Все формы используют единый контракт через:
- `LeadForm`
- form presets
- `deliverForm`

Нельзя ломать:
- event names
- success / fail states
- UTM-поля
- consent / privacy wrappers

### Аналитика
Проект подготовлен под подключение Яндекс.Метрики и внутренних событий.

Основные группы событий:
- page/list/detail views
- CTA clicks
- product / project / article views
- download intent / download success
- form start / submit / success / fail / error
- contact clicks
- cookie consent events

### Download gate
Раздел загрузок поддерживает открытые и gated assets.

Ключевые точки:
- `src/components/downloads/DownloadGateForm.tsx`
- `src/lib/download-access.ts`
- `src/data/downloads.seed.ts`

## SEO и metadata

SEO-слой строится через `PageLayout` и metadata pipeline:
- document title
- meta description
- OG title / description
- canonical URL с учётом alias mapping
- JSON-LD / schema hooks
- sitemap.xml и robots.txt generation

Любые UI-правки не должны ломать этот слой.

## Запуск

```bash
npm install
npm run dev
npm run build
npm run preview
npm test
```

Отдельно:

```bash
npm run generate:seo
```

Важно:
- `prebuild` запускает генерацию `sitemap.xml` и `robots.txt`

## Проверки после изменений

Минимум:
- `npx tsc --noEmit`
- `npm run build`
- `npm test`

Если менялись routes, формы, SEO, downloads или page shell, дополнительно проверить:
- alias behavior
- canonical tags
- JSON-LD
- sitemap / robots
- `/izdeliya`
- страницы коллекций
- страницы моделей коллекций
- `/izdeliya/faktura`
- `/skachat`
- gated download flow
- `/komplekty`
- `/custom` alias behavior
- `/company`
- `/voprosy`
- success / fail states форм
- sticky CTA и cookie banner на mobile

## Текущий статус

Репозиторий production-oriented, но активно развивается на уровне UI, контента и визуальной системы.

README должен описывать текущее состояние кода, а не историческую архитектуру. Если меняется IA, routing, metadata layer или seed-структура, обновляйте README вместе с кодом.

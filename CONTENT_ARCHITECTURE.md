# Контентная архитектура

Этот документ фиксирует, как в проекте должен добавляться и поддерживаться контент, чтобы:
- UI не превращался в хранилище текстов
- seed-архитектура оставалась пригодной для будущей миграции в админку
- factual data, storytelling и system config не смешивались между собой

## Основной принцип

Контент всегда делится на 3 слоя:

1. `Core entities`
2. `Presentation / storytelling`
3. `Layout / UI config`

Правило:
- если поле описывает, **что это за сущность**, оно живёт в `core`
- если поле описывает, **как сущность раскрывается на конкретной странице**, оно живёт в `presentation`
- если поле описывает, **как и где это показывается**, оно живёт в `layout/config`

Компоненты не должны быть источником публичного контента. Они рендерят данные из `src/data` и `src/config`.

## 1. Core entities

Это источник правды о сущностях сайта.

Сюда относятся:
- продукты
- коллекции
- проекты
- материалы
- статьи
- downloads / support assets
- FAQ
- company / legal content

Типичные поля:
- `name`
- `slug`
- `summary` / `description`
- `useCases`
- `properties`
- `media`
- `relations`
- `seo`

Основные файлы:
- `src/data/products.ts`
- `src/data/collections.ts`
- `src/data/izdeliya-architecture.seed.ts`
- `src/data/projects.ts`
- `src/data/materials-texture.seed.ts`
- `src/data/articles.ts`
- `src/data/downloads.seed.ts`
- `src/data/support-videos.seed.ts`
- `src/data/faq.seed.ts`
- `src/data/company.seed.ts`
- `src/data/legal.seed.ts`

## 2. Presentation / storytelling

Это контент о том, как сущность должна подаваться в конкретном UI-контексте.

Сюда относятся:
- hero intro
- positioning block
- curated highlights
- CTA framing
- product-page narrative
- page-specific editorial copy

Типичные поля:
- `intro`
- `positioningTitle`
- `positioningBody`
- `positioningHighlights`
- `materialBlockIntro`
- `installationHighlights`
- `downloadsBlockCopy`

Основные файлы:
- `src/data/product-page-content.seed.ts`
- `src/data/page-content.seed.ts`
- `src/data/trust-content.seed.ts`
- дополнительные `*.seed.ts` для page-level presentation при необходимости

Важно:
- не смешивать storytelling copy с factual entity data
- если один и тот же объект должен раскрываться по-разному на разных страницах, этот текст не должен жить в `core`

## 3. Layout / UI config

Это слой управления отображением, а не смыслом.

Сюда относятся:
- порядок секций
- featured blocks
- panel labels
- menu descriptions
- CTA labels
- локальные display options

Основные файлы:
- `src/data/home-layout.seed.ts`
- `src/data/products-showcase.seed.ts`
- `src/config/navigation.config.ts`
- `src/config/metadata-map.ts`

Не использовать этот слой для factual data.

## Контентный процесс

### Новый продукт
1. Добавить сущность в `core`:
   - `src/data/products.ts`
   - `src/data/izdeliya-architecture.seed.ts`
2. Добавить связи:
   - коллекция
   - related products
   - materials
   - project relations при необходимости
3. Добавить presentation-layer copy:
   - `src/data/product-page-content.seed.ts`
4. Проверить canonical route, breadcrumb, CTA, SEO
5. Только после этого добавлять special visual treatment или motion

### Новая коллекция
1. Добавить collection entity в `src/data/collections.ts`
2. Обновить `src/data/izdeliya-architecture.seed.ts`
3. Привязать продукты
4. При необходимости добавить collection-level editorial copy в presentation-layer

### Новый проект
1. Добавить сущность в `src/data/projects.ts`
2. Привязать `productSlugs`, `collectionSlugs`, `materialSlugs`
3. Заполнить `challenge`, `solution`, `result`, `summary`

### Новый материал
1. Добавить family/variant в `src/data/materials-texture.seed.ts`
2. Не создавать новую indexable page без отдельного IA-решения
3. Page-level storytelling добавлять отдельно, не в factual material entity

### Новый static/service content
- company → `src/data/company.seed.ts`
- FAQ → `src/data/faq.seed.ts`
- downloads → `src/data/downloads.seed.ts`
- support videos → `src/data/support-videos.seed.ts`
- legal → `src/data/legal.seed.ts`

## Что должно остаться code-managed

Не выносить в будущую админку как обычный контент без отдельного решения:
- routing
- canonical policy
- alias behavior
- metadata pipeline wiring
- analytics event names
- JSON-LD / schema hooks
- download-gate logic
- sticky CTA policy
- qualification flow logic

Это системный слой, а не редакторский контент.

## Подготовка к будущей админке

Текущие seeds нужно трактовать как прототип будущей CMS-модели:

- `core entities` → будущие CMS collections
- `presentation/storytelling` → editorial layer с ограниченным доступом
- `layout/config` → code-managed или internal config layer

Правило:
- в админку идут сущности и редакционный контент
- в коде остаются маршруты, canonical behavior и системные настройки

## Обязательные правила качества

- `UTF-8 only` для всех seed-файлов и публичных текстов
- не хранить длинные публичные тексты напрямую в JSX
- не дублировать одну и ту же мысль в разных seed-слоях
- public copy должен быть:
  - русским
  - restrained
  - architectural
  - non-SaaS
  - non-generic

## Минимальная проверка после добавления контента

- `npx tsc --noEmit`
- `npm run build`
- smoke-check целевой страницы

Если затронуты routes, SEO, downloads, forms или page shells:
- проверить canonical
- alias behavior
- JSON-LD
- sitemap / robots

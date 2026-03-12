# Implementation Backlog Phase 1

## 1. Overview
- Цель: реализовать Phase 1 по утвержденной архитектуре (`ia-v2`, `routing-matrix-v2`, `content-model-v2`, `page-blueprints-v2`) без переписывания проекта с нуля.
- Принцип поставки: сначала рабочий launch MVP на `seed data`, затем поэтапное подключение CMS.
- Итерации:
  - `Iteration 1`: каркас маршрутов, shared layout, базовые формы, seed-данные.
  - `Iteration 2`: ключевые detail/list страницы и связки `product ↔ collection ↔ project`.
  - `Iteration 3`: downloads/for-objects, SEO/schema, analytics, UX-дополировки.
  - `Iteration 4`: стабилизация запуска (QA, a11y, perf, контентная чистка, release hardening).

## 2. Route backlog

| id | title | scope | depends on | priority | effort | iteration | definition of done |
|---|---|---|---|---|---|---|---|
| RT-01 | Route map v2 alignment | Привести роутинг к IA v2: `/company`, `/products`, `/collections/:slug`, `/projects/:slug`, `/downloads/*`, `/for-objects`; настроить legacy redirects (`/catalog` → `/products`, `/about` → `/company`). `seed-ready` | — | P0 | M | 1 | Все маршруты из launch scope доступны, legacy-пути корректно редиректят, 404 работает предсказуемо |
| RT-02 | Homepage v2 route assembly | Собрать `/` по blueprint v2 (Hero, сегменты, featured blocks, trust, финальный CTA). `seed-ready` | RT-01, SH-01, CM-01 | P0 | M | 1 | Главная отрисовывает нужные секции в правильном порядке, CTA ведут на рабочие маршруты |
| RT-03 | Collections index route | Реализовать `/collections` с листингом коллекций и переходом на detail. `seed-ready` | RT-01, SH-04, CM-02 | P0 | S | 1 | Все карточки коллекций кликабельны, пустых/битых ссылок нет |
| RT-04 | Collection detail route | Реализовать `/collections/:collectionSlug` с продуктами, материалами, связанными проектами. `seed-ready` | RT-03, SH-05, CM-03 | P0 | M | 2 | Детальная коллекция строится по slug, связанный контент подтягивается |
| RT-05 | Products index route | Реализовать `/products` с фильтрами из URL (query-state restore). `seed-ready`, `cms-ready` | RT-01, SH-06, CM-03 | P0 | M | 2 | Фильтры читаются/пишутся в URL, SSR/refresh не ломает состояние |
| RT-06 | Product detail route | Реализовать `/products/:productSlug` с variants/specs/downloads/projects/CTA. `seed-ready` | RT-05, SH-07, CM-04, FC-03 | P0 | L | 2 | Страница продукта содержит обязательный техблок, trust, primary/secondary CTA, связанные проекты |
| RT-07 | Projects index + detail routes | Реализовать `/projects` и `/projects/:projectSlug` с фильтрами и связью на продукты. `seed-ready` | RT-01, SH-08, CM-05 | P0 | M | 2 | Листинг и detail работают, у каждого кейса есть блок used products |
| RT-08 | Materials + texture routes | Реализовать `/materials` и `/texture` как связанный контур материалов/фактур. `seed-ready` | RT-01, SH-09, CM-06 | P1 | M | 3 | Материалы связаны с продуктами и текстурами, корректные внутренние ссылки |
| RT-09 | Downloads hub + category routes | Реализовать `/downloads`, `/downloads/catalogue`, `/downloads/bim`; предусмотреть каркас для support/plug-play/guide. `seed-ready`, `CMS-required` для контентного масштабирования | RT-01, SH-10, CM-07, FC-04 | P0 | M | 3 | Хаб и 2 обязательные категории запуска работают, файлы скачиваются/гейтятся |
| RT-10 | For Objects route | Реализовать `/for-objects` с пакетами, процессом и квалификационной формой. `seed-ready`, `cms-ready` | RT-01, SH-11, CM-08, FC-05 | P0 | M | 3 | Пакеты отображаются, форма отправляется, есть связки на проекты/продукты |
| RT-11 | Contacts + Request Project routes | Завершить `/contacts` и `/request-project` по role-aware blueprint. `seed-ready` | RT-01, SH-12, FC-01 | P0 | M | 1 | Контакты, click-to-call, формы и consent работают на обоих маршрутах |
| RT-12 | FAQ + Company routes | Реализовать `/faq`, `/company` по контентным секциям и trust-блокам. `seed-ready` | RT-01, SH-13, CM-09 | P1 | S | 3 | Контент читаем, FAQ структурирован по категориям, CTA работают |

## 3. Shared component backlog

| id | title | scope | depends on | priority | effort | iteration | definition of done |
|---|---|---|---|---|---|---|---|
| SH-01 | Page shell v2 | Обновить глобальный `PageLayout`: корректный `<main>`, SEO-props, canonical/json-ld hooks, sticky-safe area | RT-01 | P0 | M | 1 | Все страницы используют единый shell без регрессий по header/footer |
| SH-02 | Global navigation blueprint | Привести header/mobile nav к утвержденным разделам, убрать псевдоссылки | SH-01 | P0 | M | 1 | В меню только существующие маршруты, mobile и desktop согласованы |
| SH-03 | Footer blueprint | Пересобрать footer: nav/B2B/contacts/legal по blueprint | SH-01 | P1 | S | 1 | Footer единообразен, юридические и контактные ссылки валидны |
| SH-04 | Collection card v2 | Карточка коллекции с позиционированием, cover, CTA | SH-01 | P0 | S | 1 | Карточка соответствует обязательным полям и везде рендерится одинаково |
| SH-05 | Collection detail modules | Секции: narrative, sku grid, related projects, material strip | SH-04 | P1 | M | 2 | Модули переиспользуемы и принимают данные из content-model |
| SH-06 | Product list filter bar | Унифицированный filter bar с URL-sync и reset | SH-01 | P0 | M | 2 | Фильтры типизированы, синхронизируются с query-параметрами |
| SH-07 | Product detail modules | Секции: variant selector, spec table, trust block, related entities | SH-06 | P0 | L | 2 | Product detail собирается из модулей, без дублирования верстки |
| SH-08 | Project modules | Case hero, challenge-solution-result, gallery, used products | SH-01 | P1 | M | 2 | Project index/detail используют единый модульный набор |
| SH-09 | Material/texture modules | Material cards, properties matrix, texture swatches | SH-01 | P1 | M | 3 | Материалы/фактуры переиспользуются в `/materials` и product detail |
| SH-10 | Downloads modules | Category tiles, asset list, gated/open states | SH-01 | P0 | M | 3 | Открытые и gated-ассеты поддерживаются одним компонентным контуром |
| SH-11 | Object package modules | Package cards, process steps, commercial conditions | SH-01 | P0 | M | 3 | Пакеты для объектов рендерятся типовым шаблоном |
| SH-12 | Lead form wrappers | Единый контейнер форм для контактов/проекта/цены/консультации | FC-01 | P0 | M | 1 | Нет дублирования формовой логики, единый UX success/error |
| SH-13 | Trust proof strip/system | Универсальный trust-блок для home/product/company/for-objects | SH-01 | P1 | S | 2 | Один компонент покрывает все trust-сценарии страниц |

## 4. CMS and content backlog

| id | title | scope | depends on | priority | effort | iteration | definition of done |
|---|---|---|---|---|---|---|---|
| CM-01 | Seed content pack for core pages | Подготовить `seed` для `/`, `/company`, `/faq`, `/contacts`, `/request-project`; без CMS. `seed-ready` | — | P0 | M | 1 | Все launch-страницы имеют контент без заглушек типа lorem/placeholder |
| CM-02 | Seed collections and launch-set | Внести launch-set: Bollard 400/600 Cast/600 Natural/800 + коллекция(и) | CM-01 | P0 | S | 1 | Коллекции и продукты отображаются в листингах и detail с валидными slug |
| CM-03 | Seed taxonomies and filters | Словари фильтров: тип, высота, фактура, CCT, питание, монтаж, применение | CM-02 | P0 | S | 2 | Фильтры согласованы между данными, URL и UI |
| CM-04 | Product technical normalization | Нормализовать ProductSpec/Variant (мощность, IP, CCT, ресурс, питание) по единой техкарте | CM-02 | P0 | M | 2 | Для каждого SKU есть полный обязательный технический минимум |
| CM-05 | Seed projects with relations | Добавить минимум 3 кейса с привязкой к продуктам/коллекциям | CM-02 | P0 | S | 2 | У каждого проекта есть challenge/solution/result + used products |
| CM-06 | Materials + texture seed | Добавить материалы/фактуры и связи на продукты | CM-02 | P1 | S | 3 | `/materials` и `/texture` заполняются реальными сущностями |
| CM-07 | Downloads seed and file governance | Подготовить assets для `catalogue`/`bim`, версии и целевые сегменты | CM-02 | P0 | M | 3 | В download-хабе доступны релевантные файлы и корректные метаданные |
| CM-08 | Object packages content set | Подготовить пакеты `Private Basic`, `Hospitality`, `Designer/Pro`, `Custom` | CM-02 | P0 | S | 3 | `/for-objects` отображает пакеты, условия и CTA по сегментам |
| CM-09 | Trust and legal content set | Заполнить trust proofs + legal страницы и даты актуальности | CM-01 | P0 | S | 3 | Trust-блоки и legal-контент заполнены и доступны из footer/forms |
| CM-10 | CMS integration foundation | Подготовить слой источника данных под CMS-схемы `content-model-v2` (без полной миграции). `CMS-required` | CM-01, CM-04 | P1 | L | 4 | Данные можно переключать `seed -> CMS` без рефакторинга page-компонентов |
| CM-11 | CMS migration for launch entities | Перенос Phase 1 сущностей (Collection/Product/Project/FAQ/Downloads/PageContent/TrustProof) в CMS. `CMS-required` | CM-10 | P1 | L | 4 | Контент launch-скоупа управляется из CMS, seed остается fallback |

## 5. Forms, CTA and lead-capture backlog

| id | title | scope | depends on | priority | effort | iteration | definition of done |
|---|---|---|---|---|---|---|---|
| FC-01 | Lead form contract v2 | Единый контракт полей + consent + anti-spam + UTM/yclid hidden fields | — | P0 | M | 1 | Все формы используют один типизированный контракт и проходят валидацию |
| FC-02 | Form endpoints and delivery | Подключить рабочий submit pipeline (email/webhook/CRM adapter) вместо `console.log` | FC-01 | P0 | M | 2 | Лид действительно отправляется, есть success/fail обработка и логирование |
| FC-03 | Product CTA orchestration | На product detail: `Запросить цену`, `Запросить проект`, `Консультация` с правильным контекстом SKU | FC-01, RT-06 | P0 | M | 2 | CTA открывают верные формы и передают `productSlug/variant/context` |
| FC-04 | Download gate flow | Реализовать `open`/`lead_gate` логику для assets и post-submit download | FC-01, RT-09 | P0 | M | 3 | Гейт работает, файл открывается после отправки, событие трекается |
| FC-05 | For Objects qualification form | Мультишаговая/квалификационная форма для объектных заявок | FC-01, RT-10 | P0 | M | 3 | Форма собирает тип объекта, масштаб, сроки, бюджет-диапазон, сегмент |
| FC-06 | Sticky CTA policy | Глобальная mobile sticky CTA + route-specific overrides (product/project) | SH-01 | P1 | S | 3 | Sticky-логика не конфликтует с cookie/banner и модалками |
| FC-07 | CTA governance and hierarchy | Ограничить иерархию CTA (primary/secondary) по blueprint, убрать дубли | FC-03, FC-04 | P1 | S | 4 | На страницах нет конкурирующих primary CTA, конверсионный путь читаемый |

## 6. SEO, schema and analytics backlog

| id | title | scope | depends on | priority | effort | iteration | definition of done |
|---|---|---|---|---|---|---|---|
| SA-01 | Per-page metadata pipeline | Включить `metaTitle/metaDescription/canonical/og` из SEOFields для launch-роутов | SH-01, CM-01 | P0 | M | 2 | У каждой launch-страницы валидные meta/canonical, без дубликатов |
| SA-02 | Schema implementation | Подключить schema для Organization, Product, FAQ, Breadcrumb, Article-ready hooks | SA-01, RT-06, RT-12 | P1 | M | 3 | На релевантных страницах выводится корректный JSON-LD |
| SA-03 | Sitemap and robots hardening | Динамический sitemap для detail-страниц + robots/canonical policy | SA-01 | P1 | S | 3 | sitemap включает launch routes, robots корректен |
| SA-04 | Analytics event map v2 | Реализовать события: list/detail/conversion/download/click-to-call + UTM attribution | FC-02 | P0 | M | 2 | События отправляются с route+entity context и валидными payload |
| SA-05 | Funnel dashboard contract | Определить базовые цели: request_project/request_price/download_pdf и связать с событиями | SA-04 | P1 | S | 4 | Есть документированная карта целей и проверка триггеров в QA |

## 7. QA, accessibility and performance backlog

| id | title | scope | depends on | priority | effort | iteration | definition of done |
|---|---|---|---|---|---|---|---|
| QP-01 | Route and link integrity QA | Проверка всех launch маршрутов, внутренних ссылок и redirect-chain | RT-12 | P0 | S | 4 | Нет битых ссылок/невалидных deep-links в launch scope |
| QP-02 | Form and lead-flow QA | E2E сценарии: product price request, project request, download gate, contacts | FC-05 | P0 | M | 4 | Все критические формы проходят happy/negative paths |
| QP-03 | Accessibility baseline | Контраст, фокус-стейты, aria, keyboard nav, доступность модалок/форм | SH-13 | P1 | M | 4 | Соответствие базовому a11y checklist на launch-страницах |
| QP-04 | Performance baseline | Оптимизация LCP-изображений, lazy-load галерей, уменьшение JS на list/detail | RT-07, SH-10 | P1 | M | 4 | Мобильная производительность улучшена, нет критичных perf-regressions |
| QP-05 | Content QA and legal QA | Проверка единообразия терминов/техпараметров/ценовых формулировок и legal-текстов | CM-09 | P0 | S | 4 | Техданные и юридические страницы консистентны с бизнес-ограничениями |

## 8. Critical path
- CP-1: `RT-01 -> SH-01 -> SH-02 -> RT-11 -> FC-01` (каркас сайта и лид-захват).
- CP-2: `CM-02 -> CM-04 -> RT-05 -> RT-06 -> FC-03` (продуктовая воронка).
- CP-3: `CM-05 -> RT-07` (доказательная часть через кейсы).
- CP-4: `CM-07 -> RT-09 -> FC-04` (downloads и профессиональный контур).
- CP-5: `SA-01 -> SA-04 -> QP-02/QP-05` (запуск с измеримой аналитикой и валидным SEO).

## 9. Launch blockers

| blocker id | blocker | why critical | close by |
|---|---|---|---|
| LB-01 | Не настроены реальные submit endpoints (формы все еще mock/console) | Нет реальной лидогенерации | FC-02 |
| LB-02 | Нет product detail с обязательным техблоком и CTA | Ключевая коммерческая страница не готова | RT-06, CM-04, FC-03 |
| LB-03 | Навигация/роуты не синхронизированы (псевдоссылки/legacy) | Потеря трафика и UX-ошибки | RT-01, SH-02 |
| LB-04 | Нет связки продукт ↔ проект ↔ download | Слабая конверсия B2B и недоверие | RT-06, RT-07, RT-09 |
| LB-05 | Нет legal/consent контуров в формах | Риск комплаенса и блок запуска | CM-09, FC-01 |
| LB-06 | Нет базовых SEO meta/canonical | Индексация и дубли контента | SA-01 |

## 10. Iteration plan

### Iteration 1
- `RT-01`, `RT-02`, `RT-03`, `RT-11`
- `SH-01`, `SH-02`, `SH-03`, `SH-04`, `SH-12`
- `CM-01`, `CM-02`
- `FC-01`

### Iteration 2
- `RT-04`, `RT-05`, `RT-06`, `RT-07`
- `SH-05`, `SH-06`, `SH-07`, `SH-08`, `SH-13`
- `CM-03`, `CM-04`, `CM-05`
- `FC-02`, `FC-03`
- `SA-01`, `SA-04`

### Iteration 3
- `RT-08`, `RT-09`, `RT-10`, `RT-12`
- `SH-09`, `SH-10`, `SH-11`
- `CM-06`, `CM-07`, `CM-08`, `CM-09`
- `FC-04`, `FC-05`, `FC-06`
- `SA-02`, `SA-03`

### Iteration 4
- `CM-10`, `CM-11`
- `FC-07`
- `SA-05`
- `QP-01`, `QP-02`, `QP-03`, `QP-04`, `QP-05`

## 11. Launch MVP
- В MVP входят только обязательные функции публичного запуска:
  - Маршруты: `/`, `/company`, `/collections`, `/collections/:slug`, `/products`, `/products/:slug`, `/projects`, `/projects/:slug`, `/materials`, `/downloads`, `/downloads/catalogue`, `/downloads/bim`, `/for-objects`, `/contacts`, `/request-project`, `/faq`, legal.
  - Контент: launch-set SKU + минимум 3 кейса + базовые downloads + trust/legal блоки.
  - Конверсия: рабочие формы (`general`, `project`, `price`, `object`, `download gate`) + click-to-call.
  - SEO/analytics: базовые meta/canonical + event map для ключевых целей.
- MVP-задачи:
  - `RT-01..RT-12` (кроме необязательных R2 роутов),
  - `SH-01..SH-12` (SH-13 опционально, но рекомендуется),
  - `CM-01..CM-09`,
  - `FC-01..FC-05`,
  - `SA-01`, `SA-04`,
  - `QP-01`, `QP-02`, `QP-05`.

## 12. Deferred to Post-launch 1.1
- Полезно, но не критично для первого запуска:
  - `CM-10`, `CM-11` (полная CMS-миграция вместо seed-first).
  - `SA-02`, `SA-03`, `SA-05` (расширенные schema/sitemap/funnel dashboards).
  - `QP-03`, `QP-04` (углубленный a11y/perf hardening после launch baseline).
  - `/downloads/support`, `/downloads/plug-play`, `/downloads/guide`.
  - `/news`, `/news/:slug`.
  - Расширенные landing-пакеты по регионам и сегментам.

---

## Seed vs CMS rollout summary
- Можно делать сразу на `seed data`:
  - RT-01..RT-12, SH-01..SH-13, CM-01..CM-09, FC-01..FC-07, SA-01/SA-04, QP-01/02/05.
- Требует `CMS` сразу или в ближайшем шаге:
  - CM-10, CM-11 (масштабирование контента, редакторский поток, future growth).
- Рекомендуемая тактика запуска:
  - Публичный launch на seed-first с типизированной моделью.
  - Затем controlled migration в CMS без изменений публичной IA/route contracts.

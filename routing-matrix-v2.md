# Routing Matrix v2

## Легенда
- `R1` — первый релиз (обязательно).
- `R2` — второй релиз (после стабилизации R1).
- `Template` — базовый шаблон страницы.
- `Primary CTA` — главное целевое действие страницы.

| Route | Rls | Template | Назначение | Primary CTA | SEO/Контентный фокус | Источник данных |
|---|---|---|---|---|---|---|
| `/` | R1 | Home (modular) | Вход в бренд и сценарии | Смотреть коллекции / Запросить проект | Бренд + сценарии использования | CMS blocks + featured entities |
| `/company` | R1 | Company page | Доверие, происхождение, подход | Связаться / Запросить проект | Производство РФ, философия, процессы | CMS page |
| `/collections` | R1 | Collections list | Обзор продуктовых семейств | Перейти в коллекцию | Коллекции и их позиционирование | CMS collections |
| `/collections/:collectionSlug` | R1 | Collection detail | Продукты внутри коллекции | Смотреть продукт / Запросить консультацию | Коллекция + SKU-кластер + use-cases | CMS collection + linked products |
| `/products` | R1 | Products list | Каталог + фильтры по задаче | Открыть карточку / Консультация | SEO по типам, сценариям, фильтрам | CMS products + taxonomies |
| `/products/:productSlug` | R1 | Product detail | Коммерческий и технический разбор SKU | Запросить цену / Запросить проект | Комбинация “story + technical + projects” | CMS product + specs + related |
| `/projects` | R1 | Projects list | Доказательства в реальных объектах | Открыть кейс / Обсудить проект | Кейсы по типам объектов и регионам | CMS projects |
| `/projects/:projectSlug` | R1 | Project detail | Сценарий “задача-решение-результат” | Хочу подобное решение | Кейс + связанные продукты | CMS project + linked products |
| `/materials` | R1 | Materials hub | Материалы, технологии, надежность | Получить тех. консультацию | Материал как часть value proposition | CMS materials |
| `/texture` | R1 | Texture library | Фактуры/цвета + связь с продуктами | Подобрать фактуру | Поисковый спрос по фактурам/цветам | CMS textures |
| `/downloads` | R1 | Downloads hub | Вход в профессиональный контур | Выбрать тип материала | Архитекторы/дилеры/инженеры | CMS download sections |
| `/downloads/catalogue` | R1 | Download detail | PDF-каталоги | Скачать каталог | Коммерческие каталоги | CMS files |
| `/downloads/bim` | R1 | Download detail | BIM/3D библиотека | Скачать BIM/3D | Проектный контур для архитекторов | CMS files |
| `/downloads/support` | R2 | Download detail | Техподдержка и инструкции | Отправить запрос в поддержку | Монтаж/эксплуатация | CMS support content |
| `/downloads/plug-play` | R2 | Download detail | Быстрый монтаж и система | Получить схему монтажа | Инженерный контент | CMS support content |
| `/downloads/guide` | R2 | Download detail | Обучающий PDF/гайд | Скачать гайд | Mid-funnel lead magnet | CMS files |
| `/faq` | R1 | FAQ page | Снятие возражений | Не нашли ответ? Связаться | Коммерческие/технические FAQ | CMS faq |
| `/news` | R2 | News list | Новости и события | Читать новость / Подписка | PR и доверие | CMS news |
| `/news/:newsSlug` | R2 | News detail | Детальная новость | Связаться | editorial updates | CMS news |
| `/contacts` | R1 | Contacts page | Каналы связи + лид-форма | Отправить запрос / Позвонить | Контакты и SLA ответа | CMS contacts + forms |
| `/request-project` | R1 | Conversion page | Квалификация входящего проекта | Отправить проектную заявку | Высокоинтентный лид | Form backend |
| `/privacy` | R1 | Legal page | Политика ПД | — | Юридическая обязательность | static/CMS legal |
| `/cookies` | R1 | Legal page | Cookie policy | — | Юридическая обязательность | static/CMS legal |
| `/consent` | R1 | Legal page | Согласие ПД | — | Юридическая обязательность | static/CMS legal |
| `/terms` | R1 | Legal page | Пользовательское соглашение | — | Юридическая обязательность | static/CMS legal |
| `*` | R1 | 404 | Ошибочный маршрут | На главную / В каталог | Техническая страница | static |

## Перенос с текущих маршрутов (mapping)

| Текущий route | Новый route v2 | Действие |
|---|---|---|
| `/catalog` | `/products` | 301/внутренний redirect |
| `/catalog/:slug` | `/products/:productSlug` | 301/внутренний redirect |
| `/about` | `/company` | 301/внутренний redirect |
| `/blog` | `/news` (если только новости) или отдельный editorial hub | Решение по контент-стратегии R2 |
| `/collections/ston-classic` и аналогичные | `/collections/:collectionSlug` | Включить реальный динамический route |
| `/for-architects` | может остаться как alias на `/downloads` | Определить как entry page R1 |

## Навигация верхнего уровня (v2)
- Company
- Collections
- Products
- Projects
- Materials
- Downloads
- FAQ
- Contacts
- CTA: Request Project

## Ключевые требования к роутингу
- Любая ссылка в menu должна вести на существующий маршрут (без “псевдоссылок”).
- Все filter/query-параметры должны читаться из URL и восстанавливаться при перезагрузке.
- Product/Project/Collection detail должны иметь:
  - canonical,
  - breadcrumbs,
  - linked entities (related products/projects/materials).

## События аналитики по маршрутам (минимум R1)
- list view: `products_list_view`, `projects_list_view`, `collections_list_view`.
- detail view: `product_view`, `project_view`, `collection_view`.
- conversion: `request_project`, `request_price`, `request_consultation`, `download_pdf`, `click_call`.

## Что важно для “Ray” (R1 scope)
- В `products/:productSlug` обязательно поддержать:
  - rich media блок (день/ночь),
  - texture/finish вариативность,
  - сценарии применения (flower bed / planters / pathway edges),
  - связанный проект,
  - download техлиста и запрос цены.

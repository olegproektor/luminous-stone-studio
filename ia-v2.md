# IA v2 (Reference-based, not copy)

## Контекст и входные данные
- Основа: текущий аудит проекта (`audit.md`).
- Бизнес-контекст: `old promt for site bollard.md` (B2B/B2C, РФ, премиум, архитекторы, лидогенерация).
- Референс-система: Essenze di Luce (home/company/products/collections/product/projects/faq/downloads/contacts/news).

## 1) Что я понял из Essenze как системы

### 1.1 Скелет IA очень компактный
- Верхний уровень почти всегда одинаковый:
  - `Company`, `Products` (с коллекциями и SKU), `FAQ`, `Projects`, `Download`-хаб, `News`, `Contacts`.
- Пользователь быстро понимает, куда идти:
  - “кто мы”, “что продаём”, “как это выглядит в реальных объектах”, “как скачать техматериалы”, “как связаться”.

### 1.2 Продуктовая логика строится от коллекций
- Сначала коллекции как смысловые “семейства”.
- Затем продуктовые страницы с одинаковым ритмом:
  - идея продукта,
  - применение,
  - материал/фактуры,
  - техданные,
  - installation/system block,
  - форма запроса.

### 1.3 Сильная связка “продукт → проект → материал”
- На product-страницах и project-страницах есть перекрестные входы:
  - продукт объясняется через реальные кейсы,
  - проект привязывается к конкретным продуктам и фактуре.
- Отдельная `Texture`-страница работает как “энциклопедия материала”.

### 1.4 Download как отдельный контур для профессионалов
- Не один “скачать PDF”, а набор страниц:
  - Catalogue,
  - BIM/3D,
  - Support,
  - Plug & Play,
  - guide/white paper.
- Это повышает доверие у архитекторов/дилеров и уменьшает трение в пресейле.

### 1.5 Editorial / premium rhythm
- Контент дается крупными смысловыми блоками: “материал → технология → сценарии → доказательства”.
- Акцент на “меньше шума, больше статуса”: мало UI-шума, понятные фокусы.

## 2) Паттерны, которые нужно перенести в наш проект

## 2.1 IA и навигация
- Перевести верхний уровень в ясную систему:
  - `О бренде`, `Коллекции`, `Продукты`, `Проекты`, `Материалы`, `Для архитекторов` (downloads), `FAQ`, `Контакты`.
- Убрать псевдо-маршруты: только реальные роуты с прямым соответствием меню.

## 2.2 Коллекционно-центричная модель
- Ввести обязательные collection detail страницы (`/collections/:slug`).
- Привязать каждый SKU к коллекции и показывать sibling-products внутри коллекции.

## 2.3 Единый шаблон product page (для всех SKU, включая `Ray`)
- Порядок блоков:
  1. Hero + краткий value proposition.
  2. Сценарии применения.
  3. Фактуры/цвета/материалы.
  4. Технический блок (таблица + datasheet).
  5. Монтаж / Plug & Play / support.
  6. Связанные проекты.
  7. CTA-зона (запрос цены/проекта/консультации).

## 2.4 Связка Product ↔ Projects ↔ Materials
- На product: блок “В каких проектах применяли”.
- На project detail: блок “Использованные продукты/фактура”.
- На materials/texture: “В каких моделях доступно”.

## 2.5 Download-хаб как самостоятельный раздел
- Отдельные страницы:
  - `Каталог PDF`,
  - `BIM/3D`,
  - `Техподдержка`,
  - `Монтаж / Plug & Play`,
  - `Гайд/whitepaper`.
- Каждая — с собственным intent и формой/CTA.

## 2.6 Ролевой вход в формы
- Не “одна форма для всех”, а role-aware:
  - private / architect / dealer / installer / developer.
- Поля подстраиваются под роль и стадию проекта.

## 2.7 Premium editorial rhythm
- Меньше повторов CTA, больше “доказательных” блоков:
  - материал,
  - технологии,
  - кейсы,
  - техданные,
  - документы.

## 3) Что переносить нельзя

- Нельзя копировать структуру/тексты/визуальные решения 1:1 (бренд и рынок другие).
- Нельзя повторять чрезмерную “формоцентричность” почти на каждой странице:
  - для первого релиза лучше меньше форм, но выше качество сценариев.
- Нельзя переносить сложный мультиязычный слой в релиз-1:
  - сначала RU-first, язык EN как future-ready.
- Нельзя копировать слабые UX-паттерны:
  - повторяющиеся блоки footer/newsletter в каждой зоне,
  - дублирующие CTA без приоритизации,
  - перегрузку длинными страницами без четких якорей.
- Нельзя наследовать чужую taxonomию без адаптации под нашу модель категорий/фильтров.

## 4) IA v2 для нашего проекта (под задачи релиза)

## 4.1 Принцип
- IA строится вокруг 3 воронок:
  - `Discover` (бренд + коллекции + материалы),
  - `Evaluate` (продукты + проекты + FAQ),
  - `Convert` (downloads + формы + контакты).

## 4.2 Дерево разделов
- `/` Главная.
- `/company` О бренде и производстве.
- `/collections` Все коллекции.
- `/collections/:collectionSlug` Страница коллекции.
- `/products` Каталог продуктов (единая точка входа, фильтры и сценарии).
- `/products/:productSlug` Карточка продукта.
- `/projects` Проекты (листинг).
- `/projects/:projectSlug` Страница проекта.
- `/materials` Материалы и технологии.
- `/texture` Фактуры и цвета (можно как подстраница материалов).
- `/downloads` Центр материалов.
- `/downloads/catalogue` Каталоги PDF.
- `/downloads/bim` BIM/3D.
- `/downloads/support` Техподдержка.
- `/downloads/plug-play` Монтаж/Plug&Play.
- `/downloads/guide` Гайды/whitepaper.
- `/faq` FAQ.
- `/news` Новости/события (если в релиз-1 нет ресурсов, оставить hidden route).
- `/contacts` Контакты.
- `/request-project` Запрос проекта.
- `/privacy`, `/cookies`, `/consent`, `/terms`.

## 4.3 Релиз-1 (обязательный срез)
- Включить:
  - `/`, `/company`, `/collections`, `/collections/:slug`, `/products`, `/products/:slug`, `/projects`, `/projects/:slug`, `/materials`, `/downloads` + минимум `catalogue` и `bim`, `/faq`, `/contacts`, `/request-project`, legal.
- Специально подготовить product template под `Ray`:
  - компактный световой объект, multi-texture, техблок, монтажный блок, связанный кейс.

## 4.4 Контентные принципы v2
- “Один экран = одна мысль”.
- Технические данные всегда рядом с CTA.
- Каждый продукт и проект должен иметь:
  - 1 главный тезис,
  - 3–5 подтверждающих фактов,
  - 1 приоритетное действие.

## 4.5 Результат IA v2
- Простая навигация без ложных переходов.
- Реальная иерархия collections/products/projects/materials/downloads.
- Ритм “premium + engineering”, а не “лендинг с повторяющимися карточками”.

## Источники референса
- Главная: https://essenzediluce.com/en/
- Company: https://essenzediluce.com/en/company/
- Products: https://essenzediluce.com/en/products/
- Пример product (Ray): https://essenzediluce.com/en/products/planters-flower-bed-lighting-ray/
- Пример product (audio): https://essenzediluce.com/en/products/rock-speakers-menhir-sound/
- Projects: https://essenzediluce.com/en/projects/
- Project detail: https://essenzediluce.com/en/projects/outdoor-landscape-lighting-private-villa-mogliano-veneto/
- FAQ: https://essenzediluce.com/en/faq/
- Texture: https://essenzediluce.com/en/texture/
- Downloads:
  - https://essenzediluce.com/en/catalogue/
  - https://essenzediluce.com/en/bim/
  - https://essenzediluce.com/en/support/
  - https://essenzediluce.com/en/plug-play/
- Contacts: https://essenzediluce.com/en/contacts/
- News: https://essenzediluce.com/en/news/

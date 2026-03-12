# Page Blueprints v2 (Phase 1)

## Scope
- Документ для реализации страниц (контентная и структурная логика), без детальной визуальной проработки.
- Основано на: `audit.md`, `ia-v2.md`, `routing-matrix-v2.md`, `business-inputs-for-site.md`, `content-model-v2.md`, исходном промте.
- Референс Essenze использован как structural reference, без копирования.

---

## 1) Homepage (`/`)
- page goal: Быстро объяснить ценность бренда и направить в 2 ключевых сценария: подбор продукта и запрос проекта.
- primary audiences: Частные клиенты, hospitality (глэмпинг/отель), дизайнеры.
- primary CTA: `Запросить проект`.
- secondary CTA: `Смотреть коллекции`.
- sections in order:
  1. Hero (ценность + 2 CTA).
  2. Segment entry (private / hospitality / designer).
  3. Featured collections.
  4. Featured products (launch-set).
  5. Use scenarios (частный участок, входная зона, hospitality).
  6. Projects preview.
  7. Materials & technology teaser.
  8. Object packages teaser.
  9. Trust proof strip.
  10. FAQ teaser.
  11. Final CTA.
- data needed (content-model-v2):
  - `PageContent(route=/)` sections.
  - `SiteSettings.primaryCTAs`.
  - `Segment` (priority/value props/cta).
  - `Collection` (featured subset).
  - `Product` (featured subset, card fields).
  - `Project` (featured subset).
  - `Material` teaser blocks.
  - `ObjectPackage` teaser.
  - `TrustProof`.
  - `FAQItem` (top 3–5).
- trust blocks:
  - локальное производство,
  - гарантия 5/2,
  - тестирование перед отгрузкой,
  - сервис/инструкция.
- SEO intent: Бренд + коммерческий интент “ландшафтные светильники/болларды из камня”.
- internal linking:
  - в `collections`, `products`, `projects`, `materials`, `for-objects`, `contacts`, `request-project`.
- notes for mobile priority:
  - Hero + 2 CTA без перегруза.
  - Сегменты — в горизонтальные карточки или stacked blocks.
  - Trust strip компактный.
- notes for B2B/B2C adaptation:
  - B2C: показать “цена от”, быстрый подбор.
  - B2B: показать объектные пакеты и кейсы сразу над fold-2.

## 2) Collections Index (`/collections`)
- page goal: Показать структуру продуктовых семейств и направить в detail коллекции.
- primary audiences: Все сегменты, особенно early-stage пользователи.
- primary CTA: `Открыть коллекцию`.
- secondary CTA: `Смотреть все продукты`.
- sections in order:
  1. Page intro.
  2. Collections grid/list.
  3. Why collections block (как выбирать).
  4. CTA block.
- data needed:
  - `PageContent(route=/collections)` intro.
  - `Collection[]` (card fields).
  - `TrustProof` (опционально 1–2 коротких).
- trust blocks:
  - материалы/долговечность,
  - проектный подход.
- SEO intent: “Коллекции ландшафтных светильников”.
- internal linking:
  - на `collection detail`, `products`, `request-project`.
- notes for mobile priority:
  - крупные карточки коллекций, минимум текста в превью.
- notes for B2B/B2C adaptation:
  - B2C: акцент на сценарий и эстетику.
  - B2B: акцент на системность линейки и масштабируемость.

## 3) Collection Detail (`/collections/:collectionSlug`)
- page goal: Объяснить идею коллекции и конвертировать в просмотр SKU/запрос.
- primary audiences: Частные + дизайнеры + hospitality.
- primary CTA: `Смотреть продукт`.
- secondary CTA: `Запросить консультацию`.
- sections in order:
  1. Collection hero (позиционирование + tagline).
  2. Collection narrative (для каких задач).
  3. Product list within collection.
  4. Material/texture availability.
  5. Related projects.
  6. CTA block.
- data needed:
  - `Collection` full.
  - linked `Product[]`.
  - linked `Material[]`, `Texture[]`.
  - linked `Project[]`.
  - `CTA` blocks.
- trust blocks:
  - натуральные/литьевые материалы,
  - сервис и гарантия.
- SEO intent: “Коллекция + тип задач/объектов”.
- internal linking:
  - в `product detail`, `materials`, `projects`, `request-project`.
- notes for mobile priority:
  - сначала SKU, потом длинные описания.
- notes for B2B/B2C adaptation:
  - B2C: сценарии применения.
  - B2B: повторяемость SKU и техсовместимость.

## 4) Product Detail (`/products/:productSlug`)
- page goal: Перевести интерес в коммерческое действие (цена/проект/консультация).
- primary audiences: Все, с упором на high-intent.
- primary CTA: `Запросить цену`.
- secondary CTA: `Запросить проект` (+ `Получить схему освещения` как contextual).
- sections in order:
  1. Product hero (название/серия/price from/gallery).
  2. Variants selector (высота/материал/фактура/питание/CCT).
  3. Applications.
  4. Technical specs table.
  5. Mounting & electrical notes.
  6. Warranty & service.
  7. Downloads (datasheet/instruction/BIM если есть).
  8. Related projects.
  9. Related products.
  10. Final CTA.
- data needed:
  - `Product` full.
  - `ProductVariant[]`.
  - `ProductSpec[]`.
  - linked `Material`, `Texture`.
  - linked `DownloadAsset[]`.
  - linked `Project[]`.
  - `TrustProof`.
  - `LeadFormConfig` (`price`, `project`, `consultation`).
- trust blocks:
  - тестирование перед отгрузкой,
  - гарантия 5/2,
  - IP/эксплуатация,
  - инструкция и сервис.
- SEO intent: SKU + технический и коммерческий интент.
- internal linking:
  - в collection, related products, related projects, downloads, contacts.
- notes for mobile priority:
  - sticky CTA “Цена / Проект”.
  - спецификации в accordion/table hybrid.
- notes for B2B/B2C adaptation:
  - B2C: упрощенное объяснение + цена от.
  - B2B: полный техблок, монтаж, документы, объектный CTA.

## 5) Projects Index (`/projects`)
- page goal: Социальное доказательство через реальные реализации.
- primary audiences: Hospitality, дизайнеры, девелоперы, private high-budget.
- primary CTA: `Открыть кейс`.
- secondary CTA: `Обсудить ваш объект`.
- sections in order:
  1. Intro + filters (object type/region/use case).
  2. Projects grid.
  3. CTA.
- data needed:
  - `PageContent(route=/projects)` intro.
  - `Project[]` with index fields.
  - `Segment` filter hints.
  - `CTA`.
- trust blocks:
  - кейсы по типам объектов,
  - реальные сценарии/результаты.
- SEO intent: “Проекты ландшафтного освещения”.
- internal linking:
  - в project detail, products, request-project.
- notes for mobile priority:
  - быстрые фильтры-чипы.
- notes for B2B/B2C adaptation:
  - B2B: фильтр по коммерческим типам объектов.
  - B2C: фильтр “частный участок”.

## 6) Project Detail (`/projects/:projectSlug`)
- page goal: Показать применимость решения и привести к запросу похожего проекта.
- primary audiences: B2B + private premium.
- primary CTA: `Хочу подобное решение`.
- secondary CTA: `Смотреть использованные продукты`.
- sections in order:
  1. Hero + key facts (тип, регион, год).
  2. Challenge / Solution / Result.
  3. Gallery.
  4. Used products block.
  5. Related projects.
  6. CTA.
- data needed:
  - `Project` full.
  - linked `Product[]`.
  - related `Project[]`.
  - `TrustProof` (опционально).
  - `LeadFormConfig(project)`.
- trust blocks:
  - конкретный результат,
  - прозрачность технического выбора продуктов.
- SEO intent: кейс + гео + тип объекта.
- internal linking:
  - в product detail, projects index, request-project.
- notes for mobile priority:
  - key facts карточкой сразу под заголовком.
- notes for B2B/B2C adaptation:
  - B2B: масштаб/сроки/инженерная часть.
  - B2C: визуальный результат и комфорт.

## 7) Materials (`/materials`)
- page goal: Подтвердить техническую состоятельность и объяснить выбор материалов.
- primary audiences: Дизайнеры, B2B, технически требовательные private.
- primary CTA: `Получить тех. консультацию`.
- secondary CTA: `Смотреть продукты по материалу`.
- sections in order:
  1. Intro.
  2. Material cards (natural/cast/composite).
  3. Technical properties matrix.
  4. Texture teaser/link.
  5. Related products.
  6. CTA.
- data needed:
  - `PageContent(route=/materials)`.
  - `Material[]`.
  - `Texture[]` teaser.
  - linked `Product[]`.
  - `TrustProof`.
- trust blocks:
  - долговечность/экологичность,
  - эксплуатационные параметры.
- SEO intent: “материалы и технологии уличных светильников”.
- internal linking:
  - в `texture`, products, downloads/support.
- notes for mobile priority:
  - свойства в сворачиваемых блоках.
- notes for B2B/B2C adaptation:
  - B2B: инженерный язык.
  - B2C: выгоды и простые объяснения.

## 8) Downloads (`/downloads`)
- page goal: Единая точка доступа к документам для архитекторов/партнеров.
- primary audiences: Архитекторы, дизайнеры, B2B-партнеры.
- primary CTA: `Скачать` (или `Получить доступ` при gate).
- secondary CTA: `Запросить консультацию по проекту`.
- sections in order:
  1. Hub intro + категории.
  2. Download categories tiles.
  3. Featured assets list.
  4. Form/CTA for assistance.
- data needed:
  - `PageContent(route=/downloads)`.
  - `DownloadCategory[]`.
  - `DownloadAsset[]`.
  - `LeadFormConfig(architect|catalog|consultation)`.
- trust blocks:
  - официальные техдокументы,
  - актуальные версии материалов.
- SEO intent: “каталог/чертежи/BIM/техподдержка”.
- internal linking:
  - в product pages (context docs), contacts, request-project.
- notes for mobile priority:
  - быстрый доступ к файлам, минимум кликов.
- notes for B2B/B2C adaptation:
  - B2B: полный документный набор.
  - B2C: только релевантные PDF/гайд (без перегруза).

## 9) For Objects (`/for-objects` или эквивалент)
- page goal: Упаковать объектные предложения и конвертировать в квалифицированный лид.
- primary audiences: Hospitality, девелоперы, дизайнеры.
- primary CTA: `Запросить объектное предложение`.
- secondary CTA: `Получить схему освещения`.
- sections in order:
  1. Value proposition for object owners.
  2. Object packages grid.
  3. Process (консультация → схема → поставка → монтаж → сервис).
  4. Related projects by object type.
  5. Commercial conditions (скидки/индивидуально).
  6. Qualification form.
- data needed:
  - `PageContent(route=/for-objects)`.
  - `ObjectPackage[]`.
  - `Segment` (hospitality/developer/designer).
  - `Project[]` related.
  - `LeadFormConfig(object_package|project)`.
  - `TrustProof`.
- trust blocks:
  - проектный подход,
  - монтаж/сервис,
  - кейсы коммерческих объектов.
- SEO intent: “освещение для глэмпинга/отеля/объекта”.
- internal linking:
  - в projects, products, contacts, request-project.
- notes for mobile priority:
  - package cards + один sticky lead CTA.
- notes for B2B/B2C adaptation:
  - страница в первую очередь B2B; B2C-пакет оставить как lower-priority блок.

## 10) Contacts / Request Project (`/contacts`, `/request-project`)
- page goal: Финальная конверсия в лид.
- primary audiences: Все сегменты (high intent).
- primary CTA: `Отправить заявку`.
- secondary CTA: `Позвонить / Написать`.
- sections in order (contacts):
  1. Контакты и каналы связи.
  2. Segment-aware lead form.
  3. SLA/what happens next.
- sections in order (request-project):
  1. Short intro.
  2. Multi-step qualification form.
  3. Trust mini-block (гарантии коммуникации/срок ответа).
- data needed:
  - `PageContent(route=/contacts|/request-project)`.
  - `SiteSettings` contacts.
  - `LeadFormConfig` (`general`, `project`).
  - `Segment`.
- trust blocks:
  - “ответ в рабочий день”,
  - прозрачный процесс после заявки.
- SEO intent:
  - contacts: брендовые навигационные запросы.
  - request-project: транзакционный лид-интент.
- internal linking:
  - из всех high-intent страниц сюда, и обратно в products/projects.
- notes for mobile priority:
  - click-to-call на первом экране,
  - короткая форма + progressive reveal.
- notes for B2B/B2C adaptation:
  - обязательное поле “тип клиента/тип объекта”.

## 11) FAQ (`/faq`)
- page goal: Снять возражения и сократить трение перед заявкой.
- primary audiences: Все сегменты.
- primary CTA: `Не нашли ответ? Запросить консультацию`.
- secondary CTA: `Перейти в каталог`.
- sections in order:
  1. Intro.
  2. FAQ categories (product/mounting/warranty/commercial).
  3. Context CTA.
- data needed:
  - `PageContent(route=/faq)`.
  - `FAQItem[]`.
  - `CTA`.
- trust blocks:
  - гарантия, монтаж, сервис.
- SEO intent: long-tail информационные запросы.
- internal linking:
  - в materials/products/downloads/contacts.
- notes for mobile priority:
  - category chips + accordion.
- notes for B2B/B2C adaptation:
  - B2B вопросы: документы, партии, условия.
  - B2C вопросы: выбор/эксплуатация/цена.

## 12) Company (`/company`)
- page goal: Подтвердить зрелость бренда и производственную надежность.
- primary audiences: B2B decision-makers + private premium.
- primary CTA: `Обсудить проект`.
- secondary CTA: `Смотреть проекты`.
- sections in order:
  1. Brand mission.
  2. Production/process.
  3. Materials philosophy.
  4. Quality control & warranties.
  5. Team/approach (без операционных деталей).
  6. CTA.
- data needed:
  - `PageContent(route=/company)`.
  - `TrustProof`.
  - links to `Project`, `Material`.
- trust blocks:
  - локальное производство,
  - контроль качества,
  - гарантийная политика.
- SEO intent: бренд + доверительные запросы (“о компании/производитель”).
- internal linking:
  - в projects/materials/contacts/request-project.
- notes for mobile priority:
  - короткие смысловые блоки, без длинных “простыней”.
- notes for B2B/B2C adaptation:
  - B2B: процесс/надежность.
  - B2C: ценность и эстетика продукта.

---

## Global Navigation Blueprint
- Top-level:
  - `Company`
  - `Collections`
  - `Products`
  - `Projects`
  - `Materials`
  - `Downloads`
  - `For Objects`
  - `FAQ`
  - `Contacts`
  - primary nav CTA: `Request Project`
- Rules:
  - только существующие маршруты;
  - query/filter URLs — canonicalized;
  - deep links только на реальные detail pages.

## Footer Blueprint
- Column 1: бренд + короткое value statement.
- Column 2: навигация (Collections/Products/Projects/Materials/Downloads).
- Column 3: B2B links (For Objects, Request Project, Contacts).
- Column 4: контакты (phone/email/messenger).
- Bottom row: legal links + copyright.

## Sticky CTA Logic
- Mobile global sticky:
  - primary: `Request Project`,
  - secondary: `Call`.
- Product page sticky override:
  - `Request Price` + `Request Project`.
- Project page sticky override:
  - `Similar Project Request`.
- Disable or collapse sticky when:
  - cookie/banner overlays critical UI,
  - form modal open.

## Download-Gate Logic
- Asset-level flag `accessType`:
  - `open`: direct download,
  - `lead_gate`: short form before download.
- Gate form:
  - name, phone/email, segment, consent checkbox.
- After submit:
  - immediate file access + lead event.
- Store:
  - file id, source page, segment, utm.

## Lead-Form Entry Points
- Homepage final CTA.
- Product detail (`request_price`, `project`, `consultation`).
- For Objects qualification section.
- Downloads gate.
- Contacts page.
- Request Project page.
- FAQ fallback CTA.

## Launch vs Phase 1.1

## Required for launch (Phase 1)
- `/`
- `/collections`
- `/collections/:collectionSlug`
- `/products`
- `/products/:productSlug`
- `/projects`
- `/projects/:projectSlug`
- `/materials`
- `/downloads` (hub + минимум `catalogue`, `bim`)
- `/for-objects`
- `/contacts`
- `/request-project`
- `/faq`
- `/company`
- legal routes (`/privacy`, `/cookies`, `/consent`, `/terms`)

## Can be deferred to Phase 1.1
- `/downloads/support`
- `/downloads/plug-play`
- `/downloads/guide`
- Расширенные editorial routes (`/news`, `/news/:slug`)
- Расширенные filter landings и region pages
- Расширенные BIM formats / advanced media blocks


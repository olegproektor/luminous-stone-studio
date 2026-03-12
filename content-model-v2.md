# Content Model v2 (Phase 1)

## Scope
- Документ описывает контентную модель для Phase 1 без CMS-реализации.
- Основано на: `audit.md`, `ia-v2.md`, `routing-matrix-v2.md`, `business-inputs-for-site.md`, исходном промте и референс-паттернах Essenze (без копирования 1:1).

## Принципы модели
- Соответствие IA v2: `company / collections / products / projects / materials / downloads / faq / contacts / request-project`.
- Связность сущностей: `product ↔ collection ↔ material ↔ project ↔ downloads`.
- B2B/B2C: отдельные сегменты, объектные пакеты, role-aware CTA.
- SEO-ready: metadata, canonical, schema-слоты, внутренняя перелинковка.
- Lead capture: CTA и формы как first-class поля у ключевых сущностей.
- Ограничение из бизнес-контекста: внутренние финансово-операционные данные не публикуются в UI напрямую.

---

## Phase 1 Entities
- `SiteSettings`
- `SEOFields` (embedded object)
- `CTA` (embedded object)
- `Segment`
- `ObjectPackage`
- `Collection`
- `Material`
- `Texture`
- `Product`
- `ProductVariant`
- `ProductSpec` (embedded object)
- `Project`
- `DownloadCategory`
- `DownloadAsset`
- `FAQItem`
- `LegalPage`
- `LeadFormConfig`
- `PageContent` (для company/materials/contacts/request-project/home модульных блоков)
- `TrustProof`

## Phase 2 Entities
- `Article` (news/editorial)
- `ArticleCategory`
- `RegionPage`
- `DealerPartner`
- `Vacancy`
- `ComparePreset`
- `ConfiguratorPreset`
- `Testimonial`
- `MediaLibraryAdvanced` (video/360/ar-ready)

---

## Entity Definitions

## 1) SiteSettings
- name: `SiteSettings`
- purpose: Глобальные настройки бренда, контактов, дефолтных CTA, юридических ссылок, аналитики.
- used on pages: Все страницы.
- required fields:
  - `brandName`
  - `siteName`
  - `defaultLocale` (`ru-RU`)
  - `primaryPhone`
  - `primaryEmail`
  - `addressShort`
  - `defaultSEO` (`SEOFields`)
  - `legalLinks` (`privacy/cookies/consent/terms`)
  - `primaryCTAs` (минимум 2)
- optional fields:
  - `telegramUrl`
  - `whatsappUrl`
  - `workingHours`
  - `socialLinks[]`
  - `analyticsKeys` (metrika id, etc.)
- relations:
  - has many `CTA` (embedded)
  - has one `SEOFields`
- phase: `Phase 1`

## 2) SEOFields
- name: `SEOFields`
- purpose: Унифицированные SEO-поля для всех индексируемых сущностей.
- used on pages: Collection/Product/Project/DownloadCategory/PageContent/Legal.
- required fields:
  - `metaTitle`
  - `metaDescription`
  - `slug`
- optional fields:
  - `canonicalUrl`
  - `ogTitle`
  - `ogDescription`
  - `ogImage`
  - `robots` (`index/follow`)
  - `schemaType`
  - `schemaPayload`
- relations:
  - embedded in контентные сущности
- phase: `Phase 1`

## 3) CTA
- name: `CTA`
- purpose: Стандартизированное описание действий для конверсии.
- used on pages: Home, Product, Project, Downloads, Contacts, For Objects.
- required fields:
  - `label`
  - `type` (`internal_link|external_link|form_open|phone|messenger|download`)
  - `target`
- optional fields:
  - `variant` (`primary|secondary|ghost`)
  - `eventName`
  - `eventParams`
  - `segmentHint`
- relations:
  - embedded in `PageContent`, `Product`, `Project`, `ObjectPackage`, `DownloadAsset`
- phase: `Phase 1`

## 4) Segment
- name: `Segment`
- purpose: Сегментация B2C/B2B для контента, CTA и форм.
- used on pages: Home, For Objects, Contacts, Request Project.
- required fields:
  - `key` (`private|hospitality|designer|developer`)
  - `title`
  - `priority` (`high|medium|low`)
  - `painPoints[]`
  - `valueProps[]`
  - `primaryCTA`
- optional fields:
  - `secondaryCTA`
  - `entryRoute`
  - `icon`
- relations:
  - links to `ObjectPackage[]`
  - links to `LeadFormConfig`
- phase: `Phase 1`

## 5) ObjectPackage
- name: `ObjectPackage`
- purpose: Пакетные предложения “Для объектов” (Private/Hospitality/Designer/Custom).
- used on pages: `/for-objects` (или эквивалентный раздел), частично Home.
- required fields:
  - `slug`
  - `name`
  - `targetSegments[]`
  - `summary`
  - `includes[]`
  - `priceLogic` (e.g. “от”, “индивидуально”)
  - `primaryCTA`
- optional fields:
  - `startingPrice`
  - `conditions`
  - `discountRules[]`
  - `serviceAddons[]`
  - `exampleProjects[]`
- relations:
  - many-to-many `Segment`
  - many-to-many `Product`
  - many-to-many `Project`
- phase: `Phase 1`

## 6) Collection
- name: `Collection`
- purpose: Семейство продуктов с единой идеей и визуальным языком.
- used on pages: `/collections`, `/collections/:collectionSlug`, related blocks.
- required fields:
  - `slug`
  - `name`
  - `tagline`
  - `description`
  - `coverImage`
  - `positioning`
  - `seo` (`SEOFields`)
- optional fields:
  - `gallery[]`
  - `applicationScenarios[]`
  - `heroVideo`
  - `ctaBlocks[]`
- relations:
  - one-to-many `Product`
  - many-to-many `Material`
  - many-to-many `Texture`
  - many-to-many `Project`
- phase: `Phase 1`

## 7) Material
- name: `Material`
- purpose: Справочник материалов (натуральный камень, литьевой камень, композит).
- used on pages: `/materials`, product pages, collection pages.
- required fields:
  - `slug`
  - `name`
  - `shortDescription`
  - `keyBenefits[]`
  - `technicalProperties[]`
  - `careNotes`
- optional fields:
  - `limitations[]`
  - `certifications[]`
  - `faq[]`
  - `media[]`
- relations:
  - one-to-many `Texture`
  - many-to-many `Product`
  - many-to-many `Collection`
- phase: `Phase 1`

## 8) Texture
- name: `Texture`
- purpose: Фактуры/цвета как коммерчески значимая вариативность.
- used on pages: `/texture`, product pages, material swatches.
- required fields:
  - `slug`
  - `name`
  - `materialRef`
  - `previewImage`
  - `colorFamily`
- optional fields:
  - `hex`
  - `finish` (`smooth|stone|custom`)
  - `notes`
- relations:
  - many-to-one `Material`
  - many-to-many `ProductVariant`
- phase: `Phase 1`

## 9) Product
- name: `Product`
- purpose: Коммерческая и техническая карточка SKU-семейства.
- used on pages: `/products`, `/products/:productSlug`, collection/project related.
- required fields:
  - `slug`
  - `name`
  - `series`
  - `collectionRef`
  - `status` (`active|made_to_order`)
  - `tagline`
  - `description`
  - `coverImage`
  - `gallery[]`
  - `environmentImages[]`
  - `applicationScenarios[]`
  - `specs[]` (`ProductSpec`)
  - `variants[]` (`ProductVariant`)
  - `priceFrom`
  - `priceDisplayMode` (`from|request`)
  - `trustHighlights[]`
  - `primaryCTAs[]`
  - `seo` (`SEOFields`)
- optional fields:
  - `nightImages[]`
  - `heroVideo`
  - `downloads[]`
  - `faq[]`
  - `schemaOverrides`
- relations:
  - many-to-one `Collection`
  - many-to-many `Material`
  - one-to-many `ProductVariant`
  - many-to-many `Project`
  - many-to-many `DownloadAsset`
  - many-to-many `ObjectPackage`
- phase: `Phase 1`

## 10) ProductVariant
- name: `ProductVariant`
- purpose: Вариант исполнения (высота/фактура/питание/монтаж/цена).
- used on pages: Product detail, Product card pricing.
- required fields:
  - `sku`
  - `heightMm`
  - `materialRef`
  - `textureRef`
  - `powerType` (`24v|220v`)
  - `mountingType` (`surface|embedded|custom`)
  - `cct` (`2700k|3000k|4000k|custom`)
  - `ipRating` (`IP67` etc.)
  - `weightKg`
  - `price`
  - `availability` (`in_stock|made_to_order`)
- optional fields:
  - `leadTimeDays`
  - `customizable` (bool)
  - `notes`
- relations:
  - many-to-one `Product`
  - many-to-one `Texture`
  - many-to-one `Material`
- phase: `Phase 1`

## 11) ProductSpec
- name: `ProductSpec`
- purpose: Нормализованный техпараметр для таблицы характеристик.
- used on pages: Product detail.
- required fields:
  - `label`
  - `value`
  - `group` (`dimensions|light|electrical|protection|service`)
- optional fields:
  - `unit`
  - `order`
- relations:
  - embedded in `Product`
- phase: `Phase 1`

## 12) Project
- name: `Project`
- purpose: Кейсы “задача-решение-результат” как доказательство применимости.
- used on pages: `/projects`, `/projects/:projectSlug`, product related block.
- required fields:
  - `slug`
  - `title`
  - `objectType`
  - `region`
  - `year`
  - `challenge`
  - `solution`
  - `result`
  - `coverImage`
  - `gallery[]`
  - `usedProducts[]`
  - `seo` (`SEOFields`)
  - `primaryCTA`
- optional fields:
  - `areaSize`
  - `budgetRangeDisplay`
  - `clientType`
  - `credits`
  - `testimonial`
- relations:
  - many-to-many `Product`
  - many-to-many `Collection`
  - many-to-many `ObjectPackage`
- phase: `Phase 1`

## 13) DownloadCategory
- name: `DownloadCategory`
- purpose: Разделы download-хаба (catalogue, bim, support, plug-play, guide).
- used on pages: `/downloads`, `/downloads/:category`.
- required fields:
  - `slug`
  - `name`
  - `description`
  - `audienceSegments[]`
  - `seo` (`SEOFields`)
- optional fields:
  - `heroImage`
  - `cta`
- relations:
  - one-to-many `DownloadAsset`
- phase: `Phase 1`

## 14) DownloadAsset
- name: `DownloadAsset`
- purpose: Файлы и документы (PDF, BIM, инструкции, техлисты).
- used on pages: download pages, product pages, architect workflows.
- required fields:
  - `slug`
  - `title`
  - `fileType` (`pdf|dwg|rfa|ifc|zip|link`)
  - `fileUrl`
  - `categoryRef`
  - `shortDescription`
  - `targetSegments[]`
  - `accessType` (`open|lead_gate`)
- optional fields:
  - `version`
  - `language`
  - `fileSize`
  - `updatedAt`
  - `relatedProducts[]`
  - `relatedCollections[]`
- relations:
  - many-to-one `DownloadCategory`
  - many-to-many `Product`
  - many-to-many `Collection`
- phase: `Phase 1`

## 15) FAQItem
- name: `FAQItem`
- purpose: Снятие возражений по продукту, монтажу, оплате, сервису.
- used on pages: `/faq`, product pages (contextual faq).
- required fields:
  - `question`
  - `answer`
  - `category`
  - `order`
- optional fields:
  - `relatedProducts[]`
  - `relatedSegments[]`
- relations:
  - many-to-many `Product`
  - many-to-many `Segment`
- phase: `Phase 1`

## 16) LegalPage
- name: `LegalPage`
- purpose: Юридические страницы РФ (privacy/cookies/consent/terms).
- used on pages: legal routes + form consent links.
- required fields:
  - `slug`
  - `title`
  - `content`
  - `effectiveDate`
  - `seo` (`SEOFields`)
- optional fields:
  - `version`
  - `changeLog`
- relations:
  - linked from `SiteSettings`
- phase: `Phase 1`

## 17) LeadFormConfig
- name: `LeadFormConfig`
- purpose: Конфиг форм для разных entry-points и сегментов.
- used on pages: Contacts, Request Project, Product modal, Downloads gate, For Objects.
- required fields:
  - `key` (`general|project|price|catalog|consultation|architect|custom|object_package`)
  - `title`
  - `fields[]`
  - `consentRequired` (bool)
  - `submitEvent`
  - `successMessage`
- optional fields:
  - `segmentDefaults[]`
  - `utmFieldsEnabled`
  - `crmMapping`
  - `multiStep` (bool)
- relations:
  - many-to-many `Segment`
  - referenced by `CTA`
- phase: `Phase 1`

## 18) PageContent
- name: `PageContent`
- purpose: Управляемые контентные блоки для статических/полустатических страниц.
- used on pages: `/`, `/company`, `/materials`, `/contacts`, `/request-project`, `/for-objects`.
- required fields:
  - `route`
  - `title`
  - `sections[]`
  - `seo` (`SEOFields`)
- optional fields:
  - `heroMedia`
  - `stickyCTAs`
  - `trustProofs[]`
- relations:
  - many-to-many `CTA`
  - many-to-many `TrustProof`
  - many-to-many `Segment`
- phase: `Phase 1`

## 19) TrustProof
- name: `TrustProof`
- purpose: Блоки доверия (гарантия, тестирование, материалы, сервис).
- used on pages: Home, Product, For Objects, Company.
- required fields:
  - `type` (`warranty|quality_control|service|material_authenticity|local_production|case`)
  - `title`
  - `description`
- optional fields:
  - `metric`
  - `icon`
  - `evidenceLink`
- relations:
  - many-to-many `PageContent`
  - many-to-many `Product`
- phase: `Phase 1`

---

## Обязательные поля по витринам (UI contracts)

## Product Cards (листинг)
- `product.slug`
- `product.name`
- `product.series`
- `product.collectionRef`
- `product.coverImage`
- `product.tagline`
- `product.priceFrom`
- `product.priceDisplayMode`
- `product.status`
- `product.primaryCTAs` (минимум один)

## Product Pages
- `product`:
  - `name`, `series`, `tagline`, `description`
  - `gallery`, `environmentImages`
  - `applicationScenarios`
  - `variants` (минимум 1)
  - `specs` (полный инженерный минимум)
  - `priceFrom` + `priceDisplayMode`
  - `trustHighlights` (гарантия/качество/сервис)
  - `downloads` (минимум datasheet/instruction)
  - `primaryCTAs` (`request_price`, `request_project`, `consultation`)
  - `seo`

## Collection Pages
- `collection.name`
- `collection.tagline`
- `collection.description`
- `collection.coverImage`
- `collection.positioning`
- `collection.products[]` (минимум 1)
- `collection.applicationScenarios[]`
- `collection.seo`

## Projects
- `project.title`
- `project.objectType`
- `project.region`
- `project.year`
- `project.challenge`
- `project.solution`
- `project.result`
- `project.coverImage`
- `project.gallery[]`
- `project.usedProducts[]`
- `project.primaryCTA`
- `project.seo`

## Downloads
- `downloadCategory.slug/name/description/seo`
- `downloadAsset.title/fileType/fileUrl/shortDescription/categoryRef`
- `downloadAsset.targetSegments[]`
- `downloadAsset.accessType`

## Object Packages
- `objectPackage.slug/name/summary`
- `objectPackage.targetSegments[]`
- `objectPackage.includes[]`
- `objectPackage.priceLogic`
- `objectPackage.primaryCTA`
- `objectPackage.conditions` (если есть ограничения/индивидуальный расчет)

---

## Поля, которые не выводим напрямую в UI (только internal)
- Полная себестоимость по статьям.
- Финмодель, рентабельность, окупаемость.
- Налоговые/субсидийные параметры.
- Внутренние лимиты производства и операционные риски.
- Полные договорные санкции, пени и внутренние коммерческие оговорки.

---

## Launch-set mapping (Phase 1, стартовый ассортимент)
- Коллекция `Bollards Core`:
  - `Bollard 400`
  - `Bollard 600 Cast Stone`
  - `Bollard 600 Natural Stone`
  - `Bollard 800`
- Для каждого SKU обязательно:
  - минимум 2 environment images,
  - варианты питания/ССТ/материала,
  - техлист и инструкция,
  - CTA на цену и проект.


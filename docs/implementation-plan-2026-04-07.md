# Форма Света — implementation plan (frontend-first, без CRM/админки)

Дата: 2026-04-07  
Контекст: активная разработка публичного сайта, контент и CRM будут подключаться позже.

## Цель плана
Стабилизировать сайт как production-ready витрину для проектной коммуникации (lead-first),
не ломая текущую архитектуру и не создавая техдолг перед CRM/CMS этапом.

---

## Принципы
1. **Не переписывать архитектуру**, а дорабатывать итеративно.
2. **URL = источник состояния** для фильтров и входных точек.
3. **Форма = контракт**, даже если backend еще временный.
4. **События аналитики считать частью продукта**, а не опциональным слоем.
5. **Контент подключается позже**, но UX-каркас и SEO-контур должны быть готовы заранее.

---

## Sprint 1 (P0): Routing + Catalog state + Lead transport abstraction
Оценка: 4–6 рабочих дней

### 1) Routing/Nav consistency
**Задача:** устранить рассинхрон между Header и App routes.

- Вариант A: добавить `/collections/:slug` и страницу деталей коллекции.
- Вариант B: оставить один `/collections` и поменять deep-links в меню на якоря/параметры.

**Definition of Done:**
- Любой клик из меню ведет на валидный экран.
- Нет 404 из основного навигационного сценария.

### 2) Catalog URL-driven filters
**Задача:** синхронизировать `category/texture/height/sort` с query-параметрами.

- Инициализация состояния из `searchParams`.
- Обновление URL при изменении фильтров.
- Поддержка “входа” из меню (`/catalog?category=...`).
- Поддержка кнопки back/forward браузера.

**Definition of Done:**
- Диплинк на каталог воспроизводит состояние фильтров.
- Состояние фильтров можно шарить ссылкой.

### 3) Lead transport adapter (без CRM)
**Задача:** убрать `console.log` как основной путь отправки заявок.

- Вынести `submitLead(payload)` в отдельный сервис.
- Ввести единый контракт payload (form, source, timestamp, utm, consent, business fields).
- Подключить адаптер ко всем формам (`LeadForm` и кастомные submit).
- Сделать временную реализацию (mock endpoint/local queue) + единый error/success handling.

**Definition of Done:**
- Нет форм с primary console-only отправкой.
- Все формы используют единый адаптер.

---

## Sprint 2 (P1): Download gate + SEO baseline + Analytics hardening
Оценка: 4–6 рабочих дней

### 4) Downloads/gated materials
**Задача:** сделать реальную выдачу материалов для “Для архитекторов”.

- Поток: запрос → подтверждение → выдача файла.
- `download_pdf` фиксируется после фактической выдачи.
- Подготовить структуру для будущей backend-замены (tokenized links/email flow).

**Definition of Done:**
- Кнопка “Скачать” выдает материал, а не только событие.

### 5) SEO baseline completion
**Задача:** закрыть базовые SEO риски до загрузки контента.

- Передать `canonical` и `jsonLd` в ключевых шаблонах (Catalog/Product/Projects/Blog).
- Сделать build-time генерацию `sitemap.xml` из `src/data/*`.
- Убрать заглушки `og:image`/verification при подготовке к релизу.

**Definition of Done:**
- Для ключевых страниц есть корректные canonical/schema.
- Sitemap включает dynamic URL (products/projects/blog posts).

### 6) Analytics hardening
**Задача:** довести аналитику до управляемого контура.

- Добавить page_view tracking на route change.
- Проверить карту целей и naming consistency.
- Зафиксировать минимальную event-spec документацию.

**Definition of Done:**
- Маршруты и ключевые действия покрыты событиями.
- События стабильны между страницами и формами.

---

## Sprint 3 (P2): UX/content readiness polishing
Оценка: 3–5 рабочих дней

### 7) CTA and messaging consistency
- Зафиксировать единую первичную CTA-стратегию (“Обсудить проект”).
- Привести secondary CTA к роли страниц (каталог/архитекторы/контакты).

### 8) Form UX polishing
- Явные ошибки на шагах multi-step форм.
- Улучшение microcopy и подсказок.
- Финальный review consent/юридических текстов на экранах форм.

### 9) Production readiness checklist pass
- Mobile sweep всех ключевых страниц.
- Проверка 404, robots, sitemap, canonical.
- Accessibility pass (focus, keyboard nav, form labels).

---

## Риски и как их снять

1. **Скопится долг до CRM интеграции**  
   Митигировать: сначала адаптер и контракт, потом провайдер CRM.

2. **Расхождение между навигацией и страницами**  
   Митигировать: единый source of truth для nav config + route tests.

3. **Слабая диагностируемость лидов**  
   Митигировать: единый error reporting и event coverage.

---

## Последовательность выполнения (рекомендуемая)
1. Routing/Nav consistency
2. URL-driven catalog
3. Lead transport adapter
4. Download gate
5. SEO baseline
6. Analytics hardening
7. UX polishing

---

## Что получим на выходе
- Сайт готов к рабочему трафику как проектная воронка.
- Подключение CRM/CMS станет инженерно простым этапом, а не переписыванием.
- Команда сможет безопасно переключиться на загрузку контента и growth-задачи.

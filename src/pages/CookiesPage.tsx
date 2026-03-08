import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";

const CookiesPage = () => (
  <PageLayout
    title="Политика cookie — STŌN"
    description="Информация об использовании файлов cookie на сайте STŌN."
  >
    <Section>
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
          Политика использования файлов cookie
        </h1>
        <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-6">
          <p>
            Настоящая Политика описывает, как сайт ston.ru (далее — «Сайт») использует
            файлы cookie и аналогичные технологии.
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">1. Что такое cookie</h2>
          <p>
            Cookie — это небольшие текстовые файлы, которые сохраняются в вашем браузере
            при посещении сайта. Они позволяют сайту «запоминать» ваши действия и настройки.
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">2. Какие cookie мы используем</h2>

          <h3 className="font-display text-lg font-medium text-foreground !mt-6">2.1. Необходимые cookie</h3>
          <p>
            Обеспечивают базовую работу сайта: навигацию, хранение согласия на cookie.
            Без них сайт не может функционировать корректно. Не могут быть отключены.
          </p>

          <h3 className="font-display text-lg font-medium text-foreground !mt-6">2.2. Аналитические cookie</h3>
          <p>
            Помогают нам понять, как пользователи взаимодействуют с сайтом: какие страницы
            посещают, сколько времени проводят, какие элементы используют. Мы используем
            Яндекс Метрику для сбора обезличенной статистики.
          </p>

          <h3 className="font-display text-lg font-medium text-foreground !mt-6">2.3. Маркетинговые cookie</h3>
          <p>
            Используются для показа релевантной рекламы и оценки эффективности рекламных кампаний.
            Могут устанавливаться сторонними сервисами (Яндекс Директ).
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">3. Управление cookie</h2>
          <p>
            При первом посещении сайта вы увидите баннер с предложением принять или отклонить
            cookie. Вы можете изменить своё решение в любое время через настройки браузера.
          </p>
          <p>
            Обратите внимание: отключение cookie может повлиять на функциональность сайта.
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">4. Срок хранения</h2>
          <p>
            Сессионные cookie удаляются при закрытии браузера. Постоянные cookie хранятся
            от 30 дней до 1 года в зависимости от назначения.
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">5. Связь</h2>
          <p>
            По вопросам использования cookie обращайтесь:{" "}
            <a href="mailto:privacy@ston.ru" className="text-foreground underline hover:text-accent transition-colors">
              privacy@ston.ru
            </a>
          </p>
          <p>
            См. также:{" "}
            <Link to="/privacy" className="text-foreground underline hover:text-accent transition-colors">
              Политика конфиденциальности
            </Link>
          </p>

          <p className="text-xs text-muted-foreground/60 !mt-10">
            Последнее обновление: март 2025 г.
          </p>
        </div>
      </div>
    </Section>
  </PageLayout>
);

export default CookiesPage;

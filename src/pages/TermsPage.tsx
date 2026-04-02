import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";

const TermsPage = () => (
  <PageLayout
    title="Пользовательское соглашение — Форма Света"
    description="Пользовательское соглашение сайта Форма Света. Условия использования сайта."
  >
    <Section>
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
          Пользовательское соглашение
        </h1>
        <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-6">
          <p>
            Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует условия
            использования сайта ston.ru (далее — «Сайт»), принадлежащего ООО «СТОН»
            (далее — «Оператор»).
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">1. Общие положения</h2>
          <p>
            1.1. Использование Сайта означает полное и безоговорочное принятие настоящего Соглашения.
          </p>
          <p>
            1.2. Оператор вправе в любое время изменять условия Соглашения. Актуальная версия
            размещается на данной странице.
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">2. Использование сайта</h2>
          <p>
            2.1. Сайт предоставляет информацию о продукции, услугах и проектах Оператора.
          </p>
          <p>
            2.2. Информация на Сайте, включая цены, характеристики и наличие продукции,
            носит информационный характер и не является публичной офертой (ст. 437 ГК РФ).
          </p>
          <p>
            2.3. Для получения актуальной информации о ценах и наличии обращайтесь к менеджерам Оператора.
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">3. Интеллектуальная собственность</h2>
          <p>
            3.1. Все материалы Сайта (тексты, изображения, дизайн, логотипы, товарные знаки)
            являются интеллектуальной собственностью Оператора и защищены законодательством РФ.
          </p>
          <p>
            3.2. Копирование, воспроизведение и распространение материалов Сайта без письменного
            согласия Оператора запрещено.
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">4. Ограничение ответственности</h2>
          <p>
            4.1. Оператор не несёт ответственности за возможные технические сбои в работе Сайта.
          </p>
          <p>
            4.2. Оператор не гарантирует бесперебойную работу Сайта и может приостанавливать
            его работу для проведения технических работ.
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">5. Персональные данные</h2>
          <p>
            Обработка персональных данных осуществляется в соответствии с{" "}
            <Link to="/privacy" className="text-foreground underline hover:text-accent transition-colors">
              Политикой конфиденциальности
            </Link>.
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">6. Применимое право</h2>
          <p>
            Настоящее Соглашение регулируется и толкуется в соответствии с законодательством
            Российской Федерации. Все споры подлежат рассмотрению в суде по месту нахождения Оператора.
          </p>

          <h2 className="font-display text-xl font-medium text-foreground !mt-10">7. Контакты</h2>
          <p>
            ООО «СТОН»<br />
            Адрес: г. Москва, Россия<br />
            Email: <a href="mailto:info@ston.ru" className="text-foreground underline">info@ston.ru</a><br />
            Телефон: <a href="tel:+74951234567" className="text-foreground underline">+7 (495) 123-45-67</a>
          </p>

          <p className="text-xs text-muted-foreground/60 !mt-10">
            Последнее обновление: март 2025 г.
          </p>
        </div>
      </div>
    </Section>
  </PageLayout>
);

export default TermsPage;

import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";

const ConsentPage = () => (
  <PageLayout
    title="Согласие на обработку персональных данных — STŌN"
    description="Условия согласия на обработку персональных данных на сайте STŌN."
  >
    <Section>
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
          Согласие на обработку персональных данных
        </h1>
        <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-6">
          <p>
            Отправляя форму на сайте ston.ru, вы подтверждаете, что:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Даёте своё добровольное согласие ООО «СТОН» (далее — «Оператор») на обработку
              указанных вами персональных данных.
            </li>
            <li>
              Обработка включает: сбор, запись, систематизацию, накопление, хранение, уточнение,
              извлечение, использование, передачу (предоставление, доступ), обезличивание,
              блокирование, удаление и уничтожение данных.
            </li>
            <li>
              Персональные данные обрабатываются в целях: связи с вами, подготовки коммерческих
              предложений, информирования о продуктах и услугах Оператора.
            </li>
            <li>
              Персональные данные хранятся на территории Российской Федерации.
            </li>
            <li>
              Согласие действует с момента его предоставления и до момента отзыва.
            </li>
            <li>
              Вы можете отозвать согласие в любой момент, направив письменное уведомление
              на адрес{" "}
              <a href="mailto:privacy@ston.ru" className="text-foreground underline">privacy@ston.ru</a>.
            </li>
          </ul>

          <p>
            Обработка персональных данных осуществляется в соответствии с Федеральным законом
            от 27.07.2006 № 152-ФЗ «О персональных данных» и{" "}
            <Link to="/privacy" className="text-foreground underline hover:text-accent transition-colors">
              Политикой конфиденциальности
            </Link>{" "}
            Оператора.
          </p>

          <p className="text-xs text-muted-foreground/60 !mt-10">
            Последнее обновление: март 2025 г.
          </p>
        </div>
      </div>
    </Section>
  </PageLayout>
);

export default ConsentPage;

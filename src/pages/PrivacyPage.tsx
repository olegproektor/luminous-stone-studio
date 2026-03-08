import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/layout/Section";

const PrivacyPage = () => (
  <PageLayout
    title="Политика конфиденциальности — STŌN"
    description="Политика конфиденциальности и обработки персональных данных сайта STŌN."
  >
    <Section>
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
          Политика конфиденциальности
        </h1>
        <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-6">
          <p>
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
            пользователей сайта ston.ru (далее — «Сайт»), принадлежащего ООО «СТОН» (далее — «Оператор»).
          </p>
          <h2 className="font-display text-xl font-medium text-foreground !mt-10">1. Общие положения</h2>
          <p>
            Оператор обеспечивает защиту персональных данных пользователей в соответствии с Федеральным законом
            от 27.07.2006 № 152-ФЗ «О персональных данных».
          </p>
          <h2 className="font-display text-xl font-medium text-foreground !mt-10">2. Какие данные мы собираем</h2>
          <p>Имя, телефон, email, город, информацию о проекте — только с вашего явного согласия.</p>
          <h2 className="font-display text-xl font-medium text-foreground !mt-10">3. Цели обработки</h2>
          <p>Связь с вами по вашему запросу, подготовка коммерческих предложений, улучшение сервиса.</p>
          <p className="text-xs text-muted-foreground/60 !mt-10">
            Полный текст политики будет размещён после юридической подготовки.
          </p>
        </div>
      </div>
    </Section>
  </PageLayout>
);

export default PrivacyPage;

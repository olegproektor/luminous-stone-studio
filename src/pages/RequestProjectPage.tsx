import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";

const RequestProjectPage = () => {
  return (
    <PageLayout
      title="Запросить проект — STŌN"
      description="Оставьте заявку на проект ландшафтного освещения. Подготовим подборку и расчёт."
    >
      <PageHero
        eyebrow="Заявка"
        title="Запросить проект"
        subtitle="Расскажите о вашем объекте — подготовим предложение в течение рабочего дня."
      />

      <Section>
        <div className="max-w-2xl mx-auto bg-secondary p-8 md:p-12">
          <p className="font-body text-sm text-muted-foreground mb-8">
            Мультишаговая форма запроса проекта будет реализована на шаге 5.
            Поля: имя, телефон, email, тип клиента, город, тип объекта, комментарий, загрузка файла.
          </p>
          <div className="space-y-4">
            {["Имя *", "Телефон *", "Email", "Тип клиента", "Город", "Тип объекта", "Комментарий"].map((label) => (
              <div key={label}>
                <label className="block text-sm font-body text-muted-foreground mb-1.5">{label}</label>
                <div className="h-11 bg-background border border-border" />
              </div>
            ))}
            <div className="h-12 bg-primary/10 border border-primary/20 flex items-center justify-center mt-6">
              <span className="text-sm font-body text-muted-foreground">Отправить заявку</span>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
};

export default RequestProjectPage;

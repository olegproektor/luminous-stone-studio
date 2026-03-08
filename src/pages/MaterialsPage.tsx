import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";

const MaterialsPage = () => {
  return (
    <PageLayout
      title="Материалы и технологии — STŌN"
      description="Литьевой камень и архитектурный композит: свойства, преимущества, устойчивость к атмосферным воздействиям."
    >
      <PageHero
        eyebrow="Технологии"
        title="Материалы и технологии"
        subtitle="Литьевой камень и архитектурный композит — как и почему мы выбрали эти материалы."
      />

      <Section eyebrow="Литьевой камень" title="Натуральная фактура, инженерная прочность">
        <div className="max-w-3xl space-y-6">
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Литьевой камень — это композитный материал на основе минерального наполнителя и полимерного связующего.
            Он воспроизводит фактуру и тактильные свойства натурального камня, при этом обладает контролируемой
            геометрией, однородной структурой и высокой устойчивостью к атмосферным воздействиям.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Морозостойкость до –40°C",
              "UV-стойкость — не выгорает",
              "IP65 — защита от воды и пыли",
              "Вес на 40% меньше натурального камня",
              "Точная геометрия и повторяемость",
              "Ремонтопригодность",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="font-body text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        variant="dark"
        title="Нужна техническая консультация?"
        subtitle="Расскажем подробнее о материалах и поможем выбрать оптимальное решение."
        primaryCta={{ label: "Получить консультацию", href: "/contacts" }}
      />
    </PageLayout>
  );
};

export default MaterialsPage;

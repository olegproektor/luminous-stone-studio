import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import { pageContentSeed } from "@/data/page-content.seed";

const AboutPage = () => {
  return (
    <PageLayout
      title={pageContentSeed.company.title}
      description={pageContentSeed.company.description}
    >
      <PageHero
        eyebrow="О бренде"
        title="STŌN"
        subtitle="Мы проектируем и производим архитектурные уличные светильники из литьевого камня. Россия."
      />

      <Section>
        <div className="max-w-3xl space-y-8">
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            STŌN — это бренд архитектурного уличного света. Мы создаём болларды, садовые светильники
            и световые объекты из литьевого камня и композита для современного ландшафта.
          </p>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Наша цель — сделать уличный свет не просто функцией, а частью архитектуры.
            Каждое изделие — это пересечение формы, материала и света,
            спроектированное для конкретных сценариев использования.
          </p>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Мы работаем с частными клиентами, архитекторами, ландшафтными дизайнерами,
            глэмпингами, отелями и девелоперами по всей России.
          </p>
        </div>
      </Section>

      <Section variant="alt" eyebrow="Принципы" title="Как мы работаем">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Архитектурный подход", desc: "Каждое изделие проектируется как элемент среды, а не декоративный аксессуар." },
            { title: "Российское производство", desc: "Полный цикл от разработки до производства — в России." },
            { title: "Проектная работа", desc: "Работаем не только с продуктами, но и с задачами — от подбора до комплектации." },
          ].map((item) => (
            <div key={item.title} className="p-8 bg-background">
              <h3 className="font-display text-xl font-medium text-foreground mb-3">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Давайте познакомимся"
        subtitle="Расскажите о вашем проекте — мы с удовольствием поможем."
        primaryCta={{ label: "Связаться", href: "/contacts" }}
      />
    </PageLayout>
  );
};

export default AboutPage;

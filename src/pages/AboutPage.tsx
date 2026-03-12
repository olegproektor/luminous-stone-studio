import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import { companySeed } from "@/data/company.seed";
import { navPaths } from "@/lib/route-helpers";

const AboutPage = () => {
  return (
    <PageLayout
      title={companySeed.title}
      description={companySeed.description}
    >
      <PageHero
        eyebrow={companySeed.hero.eyebrow}
        title={companySeed.hero.title}
        subtitle={companySeed.hero.subtitle}
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
          {companySeed.principles.map((item) => (
            <div key={item.title} className="p-8 bg-background">
              <h3 className="font-display text-xl font-medium text-foreground mb-3">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Давайте познакомимся"
        subtitle="Расскажите о вашем проекте — мы с удовольствием поможем."
        primaryCta={{ label: "Связаться", href: navPaths.contacts }}
      />
    </PageLayout>
  );
};

export default AboutPage;

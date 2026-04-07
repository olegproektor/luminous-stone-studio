import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/layout/CTASection";
import TrustProofStrip from "@/components/shared/TrustProofStrip";
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

      <TrustProofStrip />

      <Section>
        <div className="max-w-3xl space-y-8">
          <p className="font-body text-lg leading-relaxed text-foreground/80">
            {companySeed.storyLead}
          </p>
          {companySeed.story.map((paragraph) => (
            <p key={paragraph} className="font-body text-base text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section variant="alt" eyebrow="Принципы" title={companySeed.principlesTitle}>
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
        eyebrow={companySeed.cta.eyebrow}
        title={companySeed.cta.title}
        subtitle={companySeed.cta.subtitle}
        primaryCta={{ label: "Обсудить проект", href: navPaths.requestProject }}
        secondaryCta={{ label: "Контакты", href: navPaths.contacts }}
        context="company_final"
      />
    </PageLayout>
  );
};

export default AboutPage;

import Section from "@/components/layout/Section";
import type { SupportInfoBlock } from "@/data/support-videos.seed";

interface SupportInfoModuleProps {
  blocks: SupportInfoBlock[];
}

const SupportInfoModule = ({ blocks }: SupportInfoModuleProps) => {
  return (
    <Section eyebrow="Сервис" title="Что входит в поддержку">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {blocks.map((block) => (
          <div key={block.id} className="border-l border-accent/40 pl-6">
            <h3 className="font-display text-xl font-medium text-foreground">{block.title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{block.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default SupportInfoModule;


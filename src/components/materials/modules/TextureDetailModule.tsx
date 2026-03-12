import Section from "@/components/layout/Section";
import type { MaterialTexture } from "@/types/materials";

interface TextureDetailModuleProps {
  texture: MaterialTexture;
}

const TextureDetailModule = ({ texture }: TextureDetailModuleProps) => {
  return (
    <Section eyebrow="Материал" title={texture.name}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="aspect-[4/3] bg-secondary overflow-hidden">
          <img src={texture.image.src} alt={texture.image.alt} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <p className="font-body text-base text-muted-foreground leading-relaxed">{texture.description}</p>
          <div>
            <h3 className="font-body text-sm uppercase tracking-wide text-muted-foreground mb-3">Свойства</h3>
            <ul className="space-y-2">
              {texture.properties.map((property) => (
                <li key={property} className="font-body text-sm text-foreground">• {property}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TextureDetailModule;

import Section from "@/components/layout/Section";
import type { MaterialTexture } from "@/types/materials";
import { Link } from "react-router-dom";
import { buildPath } from "@/lib/route-helpers";

interface MaterialTextureGridModuleProps {
  textures: MaterialTexture[];
}

const MaterialTextureGridModule = ({ textures }: MaterialTextureGridModuleProps) => {
  return (
    <Section eyebrow="Текстуры" title="Фактуры и поверхности">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {textures.map((texture) => (
          <Link key={texture.id} to={buildPath.texture(texture.slug)} className="group block bg-secondary">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={texture.image.src}
                alt={texture.image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                {texture.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                {texture.shortDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default MaterialTextureGridModule;

import Section from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DownloadAsset } from "@/types/downloads";

interface DownloadAssetsModuleProps {
  assets: DownloadAsset[];
  onDownloadClick: (asset: DownloadAsset) => void;
}

const DownloadAssetsModule = ({ assets, onDownloadClick }: DownloadAssetsModuleProps) => {
  if (assets.length === 0) {
    return (
      <Section title="Файлы">
        <div className="radius-panel bg-secondary p-6">
          <h3 className="font-display text-lg font-medium text-foreground">Материалы готовятся</h3>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            Публичный пакет для этого раздела пока не опубликован. Оставьте запрос через форму на странице, и мы соберём релевантный комплект под задачу проекта.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Файлы">
      <div className="space-y-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="radius-panel flex flex-col gap-4 bg-secondary p-6 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="font-display text-lg font-medium text-foreground">{asset.title}</h3>
              <p className="mt-1 font-body text-sm text-muted-foreground">{asset.description}</p>
            </div>
            <button onClick={() => onDownloadClick(asset)} className={cn(buttonVariants({ variant: "sitePrimary", size: "site" }))}>
              Скачать
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default DownloadAssetsModule;

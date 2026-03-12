import Section from "@/components/layout/Section";
import type { DownloadAsset } from "@/types/downloads";

interface DownloadAssetsModuleProps {
  assets: DownloadAsset[];
  onDownloadClick: (asset: DownloadAsset) => void;
}

const DownloadAssetsModule = ({ assets, onDownloadClick }: DownloadAssetsModuleProps) => {
  return (
    <Section title="Файлы">
      <div className="space-y-4">
        {assets.map((asset) => (
          <div key={asset.id} className="p-6 bg-secondary flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-medium text-foreground">{asset.title}</h3>
              <p className="font-body text-sm text-muted-foreground mt-1">{asset.description}</p>
            </div>
            <button
              onClick={() => onDownloadClick(asset)}
              className="inline-flex items-center justify-center text-sm font-body font-medium bg-primary text-primary-foreground px-6 py-3 hover:bg-charcoal-light transition-colors"
            >
              Скачать
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default DownloadAssetsModule;

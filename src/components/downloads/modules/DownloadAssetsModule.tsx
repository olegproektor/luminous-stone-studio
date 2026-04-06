import Section from '@/components/layout/Section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
          <div key={asset.id} className="radius-panel bg-secondary p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-lg font-medium text-foreground">{asset.title}</h3>
              <p className="font-body text-sm text-muted-foreground mt-1">{asset.description}</p>
            </div>
            <button
              onClick={() => onDownloadClick(asset)}
              className={cn(buttonVariants({ variant: "sitePrimary", size: "siteSm" }))}
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

import Section from "@/components/layout/Section";
import type { SupportVideoItem } from "@/data/support-videos.seed";

interface SupportVideoLibraryModuleProps {
  videos: SupportVideoItem[];
  onVideoClick: (video: SupportVideoItem) => void;
}

const topicLabels: Record<SupportVideoItem["topic"], string> = {
  подключение: "Подключение",
  монтаж: "Монтаж",
  обслуживание: "Обслуживание",
};

const SupportVideoLibraryModule = ({ videos, onVideoClick }: SupportVideoLibraryModuleProps) => {
  return (
    <Section eyebrow="Видео" title="Видео-библиотека поддержки">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {videos.map((video) => (
          <article key={video.id} className="bg-secondary">
            <div className="aspect-video overflow-hidden bg-muted">
              {video.embedUrl ? (
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <img src={video.thumbnail.src} alt={video.thumbnail.alt} className="h-full w-full object-cover opacity-70" />
                </div>
              )}
            </div>

            <div className="space-y-4 p-6">
              <p className="font-body text-[11px] uppercase tracking-brand-wide text-muted-foreground">
                {topicLabels[video.topic]}
              </p>
              <h3 className="font-display text-2xl font-medium text-foreground">{video.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{video.description}</p>

              {video.videoUrl ? (
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onVideoClick(video)}
                  className="inline-flex text-xs font-body font-medium uppercase tracking-brand text-foreground"
                >
                  Смотреть видео
                </a>
              ) : (
                <span className="inline-flex text-xs font-body font-medium uppercase tracking-brand text-muted-foreground">
                  Видео будет добавлено
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default SupportVideoLibraryModule;


import { Link } from "react-router-dom";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

const ArticleCard = ({ article, className = "" }: ArticleCardProps) => {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className={`group block ${className}`}
    >
      <div className="relative aspect-[16/10] bg-secondary overflow-hidden mb-4">
        <img
          src={article.coverImage.src}
          alt={article.coverImage.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-body font-medium tracking-[0.1em] uppercase text-accent">
            {article.category}
          </span>
          <span className="text-xs font-body text-muted-foreground">
            {article.readingTime} мин
          </span>
        </div>
        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
          {article.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-2 line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;

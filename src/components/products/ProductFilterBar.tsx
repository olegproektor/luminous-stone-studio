import ChipTag from "@/components/ui/chip-tag";
import { getTaxonomyOptions } from "@/data/taxonomies.seed";

type SortOption = "default" | "price-asc" | "price-desc" | "name";

interface ProductFilterBarProps {
  category: string;
  texture: string;
  height: string;
  material: string;
  ip: string;
  priceBand: string;
  sort: SortOption;
  onCategoryChange: (value: string) => void;
  onTextureChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onMaterialChange: (value: string) => void;
  onIpChange: (value: string) => void;
  onPriceBandChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
}

const textureLabels: Record<string, string> = {
  all: "Любая",
  smooth: "Гладкая",
  stone: "Текстурная",
};

const heightOptions = ["all", "350", "400", "500", "600", "700", "800"] as const;
const heightLabels: Record<string, string> = {
  all: "Любая",
  "350": "350 мм",
  "400": "400 мм",
  "500": "500 мм",
  "600": "600 мм",
  "700": "700 мм",
  "800": "800 мм",
};

const sortLabels: Record<SortOption, string> = {
  default: "По умолчанию",
  "price-asc": "Цена ↑",
  "price-desc": "Цена ↓",
  name: "По названию",
};

const ProductFilterBar = ({
  category,
  texture,
  height,
  material,
  ip,
  priceBand,
  sort,
  onCategoryChange,
  onTextureChange,
  onHeightChange,
  onMaterialChange,
  onIpChange,
  onPriceBandChange,
  onSortChange,
}: ProductFilterBarProps) => {
  return (
    <div className="space-y-6 mb-10 pb-8 border-b border-border">
      <div>
        <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
          Тип
        </p>
        <div className="flex flex-wrap gap-2">
          {getTaxonomyOptions("category").map((option) => (
            <ChipTag
              key={option.slug}
              label={option.label}
              active={category === option.slug}
              onClick={() => onCategoryChange(option.slug)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
            Фактура
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(textureLabels).map(([key, label]) => (
              <ChipTag
                key={key}
                label={label}
                active={texture === key}
                onClick={() => onTextureChange(key)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
            Высота
          </p>
          <div className="flex flex-wrap gap-2">
            {heightOptions.map((option) => (
              <ChipTag
                key={option}
                label={heightLabels[option]}
                active={height === option}
                onClick={() => onHeightChange(option)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
            Сортировка
          </p>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="font-body text-sm border border-border bg-background text-foreground px-4 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {Object.entries(sortLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
            Материал
          </p>
          <div className="flex flex-wrap gap-2">
            {getTaxonomyOptions("material").map((option) => (
              <ChipTag
                key={option.slug}
                label={option.label}
                active={material === option.slug}
                onClick={() => onMaterialChange(option.slug)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
            Защита
          </p>
          <div className="flex flex-wrap gap-2">
            {getTaxonomyOptions("ip").map((option) => (
              <ChipTag
                key={option.slug}
                label={option.label}
                active={ip === option.slug}
                onClick={() => onIpChange(option.slug)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-body font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">
            Цена
          </p>
          <div className="flex flex-wrap gap-2">
            {getTaxonomyOptions("price-band").map((option) => (
              <ChipTag
                key={option.slug}
                label={option.label}
                active={priceBand === option.slug}
                onClick={() => onPriceBandChange(option.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterBar;

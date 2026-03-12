import type { ProductSpec } from "@/types";
import type { ProductTechGroup, ProductTechGroupId } from "@/types/product-tech";

const groupLabels: Record<ProductTechGroupId, string> = {
  electrical: "Электрика",
  optical: "Оптика",
  material: "Материал",
  mounting: "Монтаж",
  compliance: "Стандарты и защита",
};

const defaultGroup: ProductTechGroupId = "compliance";

const keywordMap: Array<{ group: ProductTechGroupId; patterns: string[] }> = [
  { group: "electrical", patterns: ["источник", "питание", "мощность", "напряжение"] },
  { group: "optical", patterns: ["температура", "lumen", "люмен", "угол"] },
  { group: "material", patterns: ["материал", "фактура", "цвет"] },
  { group: "mounting", patterns: ["монтаж", "высота", "вес", "сечение", "диаметр"] },
  { group: "compliance", patterns: ["ip", "класс", "защита", "сертификат"] },
];

export function detectSpecGroup(label: string): ProductTechGroupId {
  const value = label.toLowerCase();
  for (const entry of keywordMap) {
    if (entry.patterns.some((pattern) => value.includes(pattern))) {
      return entry.group;
    }
  }
  return defaultGroup;
}

export function toTechGroups(specs: ProductSpec[]): ProductTechGroup[] {
  const grouped = new Map<ProductTechGroupId, ProductSpec[]>();
  for (const spec of specs) {
    const group = spec.group ?? detectSpecGroup(spec.label);
    const normalizedSpec: ProductSpec = {
      ...spec,
      key: spec.key ?? spec.label.toLowerCase().replace(/\s+/g, "-"),
      group,
    };
    const list = grouped.get(group) ?? [];
    list.push(normalizedSpec);
    grouped.set(group, list);
  }

  return (Object.keys(groupLabels) as ProductTechGroupId[]).map((groupId) => ({
    id: groupId,
    label: groupLabels[groupId],
    specs: grouped.get(groupId)?.map((item) => ({
      key: item.key ?? item.label,
      label: item.label,
      value: item.value,
      unit: item.unit,
      priority: item.priority,
    })) ?? [],
  }));
}

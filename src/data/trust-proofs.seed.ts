export interface TrustProofItem {
  id: string;
  value: string;
  label: string;
}

export const trustProofsSeed: TrustProofItem[] = [
  { id: "materials", value: "2", label: "типа камня в стартовой линейке" },
  { id: "ip", value: "IP67", label: "защита светового модуля" },
  { id: "leadtime", value: "7-21", label: "дней срок поставки" },
  { id: "project", value: "B2B/B2C", label: "сценарии под частные и объектные проекты" },
];

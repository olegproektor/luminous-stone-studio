export type ObjectPackageSegment = "hospitality" | "private" | "developer";

export interface ObjectPackageCTA {
  label: string;
  href: string;
}

export interface ObjectPackage {
  id: string;
  slug: string;
  title: string;
  segment: ObjectPackageSegment;
  summary: string;
  scope: string[];
  deliverables: string[];
  indicativeBudget: string;
  leadTime: string;
  cta: ObjectPackageCTA;
}

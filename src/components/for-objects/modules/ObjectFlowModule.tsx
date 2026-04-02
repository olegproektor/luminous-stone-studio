import Section from "@/components/layout/Section";

interface ObjectFlowModuleProps {
  className?: string;
}

const ObjectFlowModule = ({ className = "" }: ObjectFlowModuleProps) => {
  return (
    <Section eyebrow="Процесс" title="Как проходит работа по объекту" className={className}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-secondary p-6">
          <h3 className="mb-2 font-display text-lg font-medium">1. Квалификация</h3>
          <p className="font-body text-sm text-muted-foreground">
            Уточняем тип объекта, сроки, бюджет и контекст внедрения.
          </p>
        </div>
        <div className="bg-secondary p-6">
          <h3 className="mb-2 font-display text-lg font-medium">2. Предложение</h3>
          <p className="font-body text-sm text-muted-foreground">
            Готовим пакетное решение и комплект материалов под задачу.
          </p>
        </div>
        <div className="bg-secondary p-6">
          <h3 className="mb-2 font-display text-lg font-medium">3. Реализация</h3>
          <p className="font-body text-sm text-muted-foreground">
            Согласование, поставка и сопровождение запуска на объекте.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ObjectFlowModule;

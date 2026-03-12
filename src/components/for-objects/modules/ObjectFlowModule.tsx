import Section from "@/components/layout/Section";

const ObjectFlowModule = () => {
  return (
    <Section eyebrow="Процесс" title="Как проходит работа по объекту">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-secondary">
          <h3 className="font-display text-lg font-medium mb-2">1. Квалификация</h3>
          <p className="font-body text-sm text-muted-foreground">Уточняем тип объекта, сроки, бюджет и контекст внедрения.</p>
        </div>
        <div className="p-6 bg-secondary">
          <h3 className="font-display text-lg font-medium mb-2">2. Предложение</h3>
          <p className="font-body text-sm text-muted-foreground">Готовим пакетное решение и комплект материалов под задачу.</p>
        </div>
        <div className="p-6 bg-secondary">
          <h3 className="font-display text-lg font-medium mb-2">3. Реализация</h3>
          <p className="font-body text-sm text-muted-foreground">Согласование, поставка и сопровождение запуска на объекте.</p>
        </div>
      </div>
    </Section>
  );
};

export default ObjectFlowModule;

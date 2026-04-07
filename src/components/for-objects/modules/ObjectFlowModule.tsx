import Section from "@/components/layout/Section";

interface ObjectFlowModuleProps {
  className?: string;
}

const ObjectFlowModule = ({ className = "" }: ObjectFlowModuleProps) => {
  return (
    <Section eyebrow="Путь объекта" title="Как проходит qualification flow" className={className}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-secondary p-6">
          <h3 className="mb-2 font-display text-lg font-medium">1. Вводные по проекту</h3>
          <p className="font-body text-sm text-muted-foreground">
            Собираем роль в проекте, тип объекта, сроки, бюджет и контекст внедрения, чтобы понять масштаб и формат задачи.
          </p>
        </div>
        <div className="bg-secondary p-6">
          <h3 className="mb-2 font-display text-lg font-medium">2. Квалификация и подбор</h3>
          <p className="font-body text-sm text-muted-foreground">
            Соотносим объект с подходящим типом проектной работы, коллекциями, материалами и комплектом следующих материалов для обсуждения.
          </p>
        </div>
        <div className="bg-secondary p-6">
          <h3 className="mb-2 font-display text-lg font-medium">3. Следующий рабочий шаг</h3>
          <p className="font-body text-sm text-muted-foreground">
            Переходим к согласованию, проектным материалам, составу решения и дальнейшему внедрению на объекте без лишнего разрыва между сайтом и реальной работой.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ObjectFlowModule;

import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { navPaths } from "@/lib/route-helpers";

const NotFound = () => {
  return (
    <PageLayout
      title="Страница не найдена — Форма Света"
      description="Запрашиваемая страница не существует."
    >
      <section className="section-padding">
        <div className="container-brand text-center py-20">
          <p className="text-sm font-body font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Ошибка 404
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-6">
            Страница не найдена
          </h1>
          <p className="font-body text-base text-muted-foreground max-w-md mx-auto mb-10">
            Возможно, она была перемещена или удалена. Воспользуйтесь навигацией или вернитесь на главную.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={navPaths.home}
              className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide bg-primary text-primary-foreground px-10 py-4 hover:bg-charcoal-light transition-colors"
            >
              На главную
            </Link>
            <Link
              to={navPaths.products}
              className="inline-flex items-center justify-center text-sm font-body font-medium tracking-wide border border-border text-foreground px-10 py-4 hover:bg-secondary transition-colors"
            >
              Продукты
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;

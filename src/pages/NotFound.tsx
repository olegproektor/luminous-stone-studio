import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { navPaths } from "@/lib/route-helpers";

const NotFound = () => {
  return (
    <PageLayout
      title="Страница не найдена — Форма Света"
      description="Запрашиваемая страница не существует."
    >
      <section className="section-padding">
        <div className="container-brand py-20 text-center">
          <p className="mb-4 text-sm font-body font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Ошибка 404
          </p>
          <h1 className="mb-6 font-display text-5xl font-light text-foreground md:text-7xl">Страница не найдена</h1>
          <p className="mx-auto mb-10 max-w-md font-body text-base text-muted-foreground">
            Возможно, она была перемещена или удалена. Воспользуйтесь навигацией или вернитесь на главную.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="sitePrimary" size="siteLg">
              <Link to={navPaths.home}>На главную</Link>
            </Button>
            <Button asChild variant="siteOutline" size="siteLg">
              <Link to={navPaths.products}>Продукты</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;

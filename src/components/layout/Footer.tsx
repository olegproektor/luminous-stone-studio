import { Link } from "react-router-dom";
import { footerNavigation } from "@/config/footer.config";
import { routes } from "@/config/routes";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-brand px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="font-display text-xl font-medium tracking-[0.08em]">STŌN</Link>
            <p className="mt-5 text-xs font-body text-primary-foreground/40 leading-relaxed max-w-xs">
              Архитектурные уличные светильники из литьевого камня. Проектируем свет для ландшафта — от частного сада до территории курорта.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-body font-medium tracking-brand-wide uppercase text-primary-foreground/30 mb-5">
              Навигация
            </h4>
            <nav className="flex flex-col gap-3">
              {footerNavigation.primary.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-xs font-body text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-body font-medium tracking-brand-wide uppercase text-primary-foreground/30 mb-5">
              Информация
            </h4>
            <nav className="flex flex-col gap-3">
              {footerNavigation.company.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-xs font-body text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-body font-medium tracking-brand-wide uppercase text-primary-foreground/30 mb-5">
              Контакты
            </h4>
            <div className="flex flex-col gap-3 text-xs font-body text-primary-foreground/50">
              <a href="tel:+74951234567" className="hover:text-primary-foreground transition-colors">
                +7 (495) 123-45-67
              </a>
              <a href="mailto:info@ston.ru" className="hover:text-primary-foreground transition-colors">
                info@ston.ru
              </a>
              <a href="mailto:arch@ston.ru" className="hover:text-primary-foreground transition-colors">
                arch@ston.ru — для архитекторов
              </a>
              <span className="text-primary-foreground/30 mt-2">Москва, Россия</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-primary-foreground/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-body text-primary-foreground/25">
            © {currentYear} STŌN. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link to={routes.privacy} className="text-[10px] font-body text-primary-foreground/25 hover:text-primary-foreground/40 transition-colors">
              Конфиденциальность
            </Link>
            <Link to={routes.cookies} className="text-[10px] font-body text-primary-foreground/25 hover:text-primary-foreground/40 transition-colors">
              Cookie
            </Link>
            <Link to={routes.terms} className="text-[10px] font-body text-primary-foreground/25 hover:text-primary-foreground/40 transition-colors">
              Оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

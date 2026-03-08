import { Link } from "react-router-dom";

const footerNav = [
  { label: "Коллекции", href: "/collections" },
  { label: "Каталог", href: "/catalog" },
  { label: "Проекты", href: "/projects" },
  { label: "Для архитекторов", href: "/for-architects" },
  { label: "О бренде", href: "/about" },
  { label: "Журнал", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Контакты", href: "/contacts" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-brand section-padding !py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="font-display text-2xl font-medium tracking-wide">STŌN</Link>
            <p className="mt-4 text-sm font-body text-primary-foreground/60 leading-relaxed max-w-xs">
              Архитектурные уличные светильники из литьевого камня. Проектируем свет для ландшафта.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">Навигация</h4>
            <nav className="flex flex-col gap-2.5">
              {footerNav.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">Информация</h4>
            <nav className="flex flex-col gap-2.5">
              {footerNav.slice(4).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">Контакты</h4>
            <div className="flex flex-col gap-2.5 text-sm font-body text-primary-foreground/60">
              <a href="tel:+74951234567" className="hover:text-primary-foreground transition-colors">
                +7 (495) 123-45-67
              </a>
              <a href="mailto:info@ston.ru" className="hover:text-primary-foreground transition-colors">
                info@ston.ru
              </a>
              <a href="mailto:arch@ston.ru" className="hover:text-primary-foreground transition-colors">
                arch@ston.ru
              </a>
              <span>Москва, Россия</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-body text-primary-foreground/40">
            © {currentYear} STŌN. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs font-body text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">
              Конфиденциальность
            </Link>
            <Link to="/cookies" className="text-xs font-body text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">
              Cookie
            </Link>
            <Link to="/terms" className="text-xs font-body text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">
              Оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

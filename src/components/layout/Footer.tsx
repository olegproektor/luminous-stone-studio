const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-brand section-padding !py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <span className="font-display text-2xl font-medium tracking-wide">STŌN</span>
            <p className="mt-4 text-sm font-body text-primary-foreground/60 leading-relaxed max-w-xs">
              Архитектурные уличные светильники из литьевого камня. Проектируем свет для ландшафта.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-display text-lg font-medium mb-4">Навигация</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Каталог", href: "/catalog" },
                { label: "О бренде", href: "/about" },
                { label: "Проекты", href: "/projects" },
                { label: "Контакты", href: "/contacts" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-medium mb-4">Контакты</h4>
            <div className="flex flex-col gap-3 text-sm font-body text-primary-foreground/60">
              <a href="mailto:info@ston.ru" className="hover:text-primary-foreground transition-colors">
                info@ston.ru
              </a>
              <a href="tel:+74951234567" className="hover:text-primary-foreground transition-colors">
                +7 (495) 123-45-67
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
            <a href="/privacy" className="text-xs font-body text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/terms" className="text-xs font-body text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">
              Оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

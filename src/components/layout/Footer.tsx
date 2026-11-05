import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { footerNavigation } from "@/config/footer.config";
import { routes } from "@/config/routes";
import { siteContacts } from "@/config/site-contacts";
import { siteStrategy } from "@/config/site-strategy";
import TrackedCta from "@/components/TrackedCta";
import footerScene from "@/assets/footer-scene.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const footerTitle =
    location.pathname === routes.company
      ? "Если вам близок наш подход, обсудим ваш проект"
      : "Предложим решение под архитектуру и сценарий пространства";

  return (
    <footer className="mt-0 bg-[hsl(var(--charcoal))] text-white">
      <div className="relative overflow-hidden bg-[hsl(var(--background))]">
        <div className="relative h-[684px] md:h-[846px] lg:h-[972px]">
          <div className="absolute inset-x-0 top-0 h-[60%] bg-[hsl(var(--background))]" />
          <div className="absolute inset-x-0 bottom-0">
            <img
              src={footerScene}
              alt="Ландшафтный маршрут со световыми решениями Форма Света"
              className="block w-full select-none object-cover object-bottom"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,hsl(var(--background)/0)_0%,hsl(var(--charcoal)/0.18)_32%,hsl(var(--charcoal)/0.72)_68%,hsl(var(--charcoal)/0.96)_90%,hsl(var(--charcoal))_100%)] md:h-36 lg:h-44" />
          </div>

          <div className="absolute inset-x-0 top-[6.75rem] z-10 md:top-[8.75rem] lg:top-[10.25rem]">
            <div className="container-brand px-6 md:px-12 lg:px-24">
              <div className="mx-auto max-w-[64rem] text-center">
                <h2 className="font-display text-[2.1rem] leading-[1.05] text-foreground md:text-[3.4rem] lg:text-[4rem]">
                  {footerTitle}
                </h2>
                <div className="mt-8 flex justify-center">
                  <TrackedCta
                    href={siteStrategy.primaryConversion.href}
                    label={siteStrategy.primaryConversion.label}
                    context="footer_primary"
                    variant="sitePrimary"
                    size="siteLg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[hsl(var(--charcoal))]">
        <div className="container-brand px-6 pb-8 pt-6 md:px-12 md:pb-10 md:pt-8 lg:px-24 lg:pt-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-12 xl:gap-8">
            <div className="xl:col-span-4">
              <Link to="/" className="font-wordmark text-xl text-white">
                Форма Света
              </Link>
              <p className="mt-5 max-w-sm text-xs leading-relaxed text-white/48">
                Каменные светильники для ландшафта и архитектуры
              </p>
            </div>

            <div className="xl:col-span-2">
              <h4 className="mb-5 text-[10px] font-medium uppercase tracking-brand-wide text-white/30">
                Изделия
              </h4>
              <nav className="flex flex-col gap-3">
                {footerNavigation.primary.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-xs text-white/58 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="xl:col-span-2">
              <h4 className="mb-5 text-[10px] font-medium uppercase tracking-brand-wide text-white/30">
                О проекте
              </h4>
              <nav className="flex flex-col gap-3">
                {footerNavigation.company.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-xs text-white/58 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="xl:col-span-4">
              <h4 className="mb-5 text-[10px] font-medium uppercase tracking-brand-wide text-white/30">
                Контакт
              </h4>
              <div className="flex flex-col gap-3 text-xs text-white/58">
                <a href={siteContacts.phoneHref} className="transition-colors hover:text-white">
                  {siteContacts.phoneDisplay}
                </a>
                <a href={siteContacts.emailHref} className="transition-colors hover:text-white">
                  {siteContacts.emailDisplay}
                </a>
                <a href={siteContacts.architectEmailHref} className="transition-colors hover:text-white">
                  {siteContacts.architectEmailDisplay} — для архитекторов
                </a>
                <span className="mt-2 text-white/34">Москва, Россия</span>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-6 md:mt-16 md:flex-row md:items-center md:justify-between">
            <p className="text-[10px] text-white/25">
              © {currentYear} Форма Света. Все права защищены.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                to={routes.privacy}
                className="text-[10px] text-white/25 transition-colors hover:text-white/40"
              >
                Конфиденциальность
              </Link>
              <Link
                to={routes.cookies}
                className="text-[10px] text-white/25 transition-colors hover:text-white/40"
              >
                Cookie
              </Link>
              <Link
                to={routes.terms}
                className="text-[10px] text-white/25 transition-colors hover:text-white/40"
              >
                Оферта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

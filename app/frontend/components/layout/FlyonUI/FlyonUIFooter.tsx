import React from "react";
import { useTranslations } from "../../../lib/i18n";

const FlyonUIFooter: React.FC = () => {
  const { t } = useTranslations();

  return (
    <footer className="mx-auto w-full max-w-7xl px-6 py-3.5">
      <div className="flex items-center justify-between gap-3 text-sm max-lg:flex-col">
        <p className="text-base-content text-center">
          {t("app.layout.footer.copyright", { app_name: t("app.name") })}
        </p>
        <div className="flex items-center gap-3">
          <a href="#" className="link size-4.5" aria-label="Facebook Link">
            <span className="icon-[tabler--brand-facebook] size-4.5"></span>
          </a>
          <a href="#" className="link size-4.5" aria-label="Instagram Link">
            <span className="icon-[tabler--brand-instagram] size-4.5"></span>
          </a>
          <a href="#" className="link size-4.5" aria-label="X Link">
            <span className="icon-[tabler--brand-twitter] size-4.5"></span>
          </a>
          <a href="#" className="link size-4.5" aria-label="Github Link">
            <span className="icon-[tabler--brand-github] size-4.5"></span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FlyonUIFooter;

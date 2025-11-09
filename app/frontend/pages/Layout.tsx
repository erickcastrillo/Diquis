import { Head, Link, usePage } from "@inertiajs/react";
import { Fragment, ReactNode } from "react";
import { useTranslations } from "../lib/i18n";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { auth } = usePage().props as any;
  const { t } = useTranslations();

  return (
    <Fragment>
      <Head title={title} />
      <div className="min-h-screen bg-base-200">
        <nav className="bg-base-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a className="text-xl font-bold text-base-content" href="/">
                  Diquis
                </a>
              </div>
              <div className="flex items-center gap-4">
                {auth?.user ? (
                  <div className="dropdown relative inline-flex">
                    <button
                      id="profile-menu-button"
                      type="button"
                      className="dropdown-toggle btn btn-ghost"
                      aria-haspopup="menu"
                      aria-expanded="false"
                    >
                      {auth.user.email}
                    </button>
                    <ul
                      className="dropdown-menu dropdown-open:opacity-100 hidden w-48 space-y-0.5"
                      role="menu"
                    >
                      <li>
                        <Link
                          href="/users/edit"
                          className="dropdown-item px-3 py-2"
                          method="get"
                        >
                          {t("app.layout.header.my_profile")}
                        </Link>
                      </li>
                      <li>
                        <hr className="border-base-content/20 my-1" />
                      </li>
                      <li>
                        <Link
                          id="sign-out-link"
                          href="/users/sign_out"
                          className="dropdown-item px-3 py-2 text-error"
                          method="delete"
                          as="button"
                        >
                          {t("app.layout.header.logout")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <Link href="/users/sign_in" className="btn btn-ghost">
                      {t("common.sign_in")}
                    </Link>
                    <Link href="/users/sign_up" className="btn btn-primary">
                      {t("common.sign_up")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </Fragment>
  );
}

import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, Fragment } from "react";
import { useTranslations } from "../../lib/i18n";

interface Props {
  errors?: Record<string, string[]>;
}

export default function Login({ errors = {} }: Props) {
  const { t } = useTranslations();
  const { data, setData, post, processing } = useForm({
    user: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post("/users/sign_in");
  };

  const hasError = (field: string) => errors[field] && errors[field].length > 0;
  const getError = (field: string) => errors[field]?.[0];

  return (
    <Fragment>
      <Head title={t("auth.login.title")} />

      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">{t("auth.login.title")}</h1>
                <p className="text-base-content/60 mt-2">
                  {t("auth.login.subtitle")}
                </p>
              </div>

              {errors.base && errors.base.length > 0 && (
                <div className="alert alert-error mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    {errors.base.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                <div className="form-control">
                  <label htmlFor="email" className="label">
                    <span className="label-text">{t("auth.fields.email")}</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={data.user.email}
                    onChange={(e) => setData("user", { ...data.user, email: e.target.value })}
                    className={`input input-bordered w-full ${
                      hasError("email") ? "input-error" : ""
                    }`}
                    placeholder={t("auth.placeholders.email")}
                    required
                  />
                  {hasError("email") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("email")}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="password" className="label">
                    <span className="label-text">{t("auth.fields.password")}</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={data.user.password}
                    onChange={(e) => setData("user", { ...data.user, password: e.target.value })}
                    className={`input input-bordered w-full ${
                      hasError("password") ? "input-error" : ""
                    }`}
                    placeholder={t("auth.placeholders.password")}
                    required
                  />
                  {hasError("password") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("password")}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={data.user.remember}
                      onChange={(e) => setData("user", { ...data.user, remember: e.target.checked })}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">{t("auth.fields.remember_me")}</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="btn btn-primary w-full"
                >
                  {processing && (
                    <span className="loading loading-spinner"></span>
                  )}
                  {processing ? t("auth.login.signing_in") : t("auth.login.sign_in_button")}
                </button>
              </form>

              <div className="divider">{t("common.or")}</div>

              <div className="text-center space-y-2">
                <div>
                  <Link href="/users/sign_up" className="link link-primary">
                    {t("auth.login.no_account")}
                  </Link>
                </div>
                <div>
                  <Link
                    href="/users/password/new"
                    className="link link-neutral text-sm"
                  >
                    {t("auth.login.forgot_password")}
                  </Link>
                </div>
              </div>

              <div className="text-center mt-4 space-y-1 text-xs text-base-content/60">
                <div>
                  <Link
                    href="/users/confirmation/new"
                    className="link link-neutral"
                  >
                    {t("auth.login.no_confirmation")}
                  </Link>
                </div>
                <div>
                  <Link href="/users/unlock/new" className="link link-neutral">
                    {t("auth.login.no_unlock")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, Fragment } from "react";
import { useTranslations } from "../../lib/i18n";

interface Props {
  reset_password_token: string;
  errors?: Record<string, string[]>;
}

export default function ResetPassword({
  reset_password_token,
  errors = {},
}: Props) {
  const { t } = useTranslations();
  const { data, setData, put, processing } = useForm({
    user: {
      reset_password_token: reset_password_token,
      password: "",
      password_confirmation: "",
    },
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put("/users/password");
  };

  const hasError = (field: string) => errors[field] && errors[field].length > 0;
  const getError = (field: string) => errors[field]?.[0];

  return (
    <Fragment>
      <Head title={t("auth.reset_password.title")} />

      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">{t("auth.reset_password.title")}</h1>
                <p className="text-base-content/60 mt-2">
                  {t("auth.reset_password.subtitle")}
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
                  <label htmlFor="password" className="label">
                    <span className="label-text">{t("auth.reset_password.password")}</span>
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
                    autoFocus
                  />
                  {hasError("password") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("password")}
                      </span>
                    </label>
                  )}
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      {t("auth.reset_password.password_hint")}
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label htmlFor="password_confirmation" className="label">
                    <span className="label-text">{t("auth.reset_password.password_confirmation")}</span>
                  </label>
                  <input
                    id="password_confirmation"
                    type="password"
                    value={data.user.password_confirmation}
                    onChange={(e) => setData("user", { ...data.user, password_confirmation: e.target.value })}
                    className={`input input-bordered w-full ${
                      hasError("password_confirmation") ? "input-error" : ""
                    }`}
                    placeholder={t("auth.reset_password.password_confirmation")}
                    required
                  />
                  {hasError("password_confirmation") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("password_confirmation")}
                      </span>
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="btn btn-primary w-full"
                >
                  {processing && (
                    <span className="loading loading-spinner"></span>
                  )}
                  {processing ? t("auth.reset_password.submitting") : t("auth.reset_password.submit")}
                </button>
              </form>

              <div className="divider">{t("common.or")}</div>

              <div className="text-center">
                <Link href="/users/sign_in" className="link link-primary">
                  {t("auth.reset_password.back_to_login")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, Fragment } from "react";
import { useTranslations } from "../../lib/i18n";

interface Props {
  errors?: Record<string, string[]>;
  academies: { id: string; name: string }[];
}

export default function Register({ errors = {}, academies }: Props) {
  const { t } = useTranslations();
  const { data, setData, post, processing } = useForm({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "player", // Default role
      academy_id: "",
    },
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post("/users");
  };

  const hasError = (field: string) => errors[field] && errors[field].length > 0;
  const getError = (field: string) => errors[field]?.[0];

  return (
    <Fragment>
      <Head title={t("auth.register.title")} />

      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
        <div className="w-full max-w-md">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">{t("auth.register.title")}</h1>
                <p className="text-base-content/60 mt-2">{t("auth.register.subtitle")}</p>
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
                {/* First Name Field */}
                <div className="form-control">
                  <label htmlFor="first_name" className="label">
                    <span className="label-text">{t("auth.register.first_name")}</span>
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    value={data.user.first_name}
                    onChange={(e) => setData("user", { ...data.user, first_name: e.target.value })}
                    className={`input input-bordered w-full ${
                      hasError("first_name") ? "input-error" : ""
                    }`}
                    placeholder={t("auth.register.first_name")}
                    required
                  />
                  {hasError("first_name") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("first_name")}
                      </span>
                    </label>
                  )}
                </div>

                {/* Last Name Field */}
                <div className="form-control">
                  <label htmlFor="last_name" className="label">
                    <span className="label-text">{t("auth.register.last_name")}</span>
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    value={data.user.last_name}
                    onChange={(e) => setData("user", { ...data.user, last_name: e.target.value })}
                    className={`input input-bordered w-full ${
                      hasError("last_name") ? "input-error" : ""
                    }`}
                    placeholder={t("auth.register.last_name")}
                    required
                  />
                  {hasError("last_name") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("last_name")}
                      </span>
                    </label>
                  )}
                </div>

                {/* Email Field */}
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

                {/* Password Field */}
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
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      {t("auth.register.password_hint")}
                    </span>
                  </label>
                </div>

                {/* Password Confirmation Field */}
                <div className="form-control">
                  <label htmlFor="password_confirmation" className="label">
                    <span className="label-text">{t("auth.register.password_confirmation")}</span>
                  </label>
                  <input
                    id="password_confirmation"
                    type="password"
                    value={data.user.password_confirmation}
                    onChange={(e) => setData("user", { ...data.user, password_confirmation: e.target.value })}
                    className={`input input-bordered w-full ${
                      hasError("password_confirmation") ? "input-error" : ""
                    }`}
                    placeholder={t("auth.register.password_confirmation")}
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

                {/* Role Field */}
                <div className="form-control">
                  <label htmlFor="role" className="label">
                    <span className="label-text">{t("auth.register.role")}</span>
                  </label>
                  <select
                    id="role"
                    value={data.user.role}
                    onChange={(e) => setData("user", { ...data.user, role: e.target.value })}
                    className={`select select-bordered w-full ${
                      hasError("role") ? "select-error" : ""
                    }`}
                    required
                  >
                    <option value="player">{t("user_management.users.fields.roles.player")}</option>
                    <option value="parent">{t("user_management.users.fields.roles.parent")}</option>
                    <option value="coach">{t("user_management.users.fields.roles.coach")}</option>
                  </select>
                  {hasError("role") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("role")}
                      </span>
                    </label>
                  )}
                </div>

                {/* Academy Field */}
                <div className="form-control">
                  <label htmlFor="academy_id" className="label">
                    <span className="label-text">{t("user_management.users.fields.academy")}</span>
                  </label>
                  <select
                    id="academy_id"
                    value={data.user.academy_id}
                    onChange={(e) => setData("user", { ...data.user, academy_id: e.target.value })}
                    className={`select select-bordered w-full ${
                      hasError("academy_id") ? "select-error" : ""
                    }`}
                    required
                  >
                    <option value="">{t("user_management.users.form.select_academy")}</option>
                    {academies.map((academy) => (
                      <option key={academy.id} value={academy.id}>
                        {academy.name}
                      </option>
                    ))}
                  </select>
                  {hasError("academy_id") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("academy_id")}
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="btn btn-primary w-full"
                >
                  {processing && (
                    <span className="loading loading-spinner"></span>
                  )}
                  {processing ? t("auth.register.submitting") : t("auth.register.submit")}
                </button>
              </form>

              {/* Helper Links */}
              <div className="divider">{t("common.or")}</div>

              <div className="text-center">
                <Link href="/users/sign_in" className="link link-primary">
                  {t("auth.register.have_account")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

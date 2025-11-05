class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_locale

  # Share data with all Inertia requests
  inertia_share do
    {
      locale: I18n.locale.to_s,
      available_locales: I18n.available_locales.map { |locale|
        {
          code: locale.to_s,
          name: I18n.t("locale_name", locale: locale, default: locale.to_s.upcase)
        }
      },
      # Share specific namespaces needed by frontend
      translations: {
        app: I18n.t("app", default: {}),
        common: I18n.t("common", default: {}),
        errors: I18n.t("errors", default: {})
      }
    }
  end

  protected

  def set_locale
    # Priority: URL param > session > browser > default
    I18n.locale = locale_from_params ||
                  locale_from_session ||
                  locale_from_headers ||
                  I18n.default_locale

    session[:locale] = I18n.locale
  end

  def locale_from_params
    params[:locale] if I18n.available_locales.include?(params[:locale]&.to_sym)
  end

  def locale_from_session
    session[:locale] if I18n.available_locales.include?(session[:locale]&.to_sym)
  end

  def locale_from_headers
    return nil unless request.env["HTTP_ACCEPT_LANGUAGE"]

    accepted = request.env["HTTP_ACCEPT_LANGUAGE"].scan(/^[a-z]{2}/).first&.to_sym
    accepted if I18n.available_locales.include?(accepted)
  end

  def default_url_options
    { locale: I18n.locale }
  end

  # Override Devise's default redirect behavior for Inertia.js
  def after_sign_in_path_for(resource)
    stored_location_for(resource) || root_path
  end

  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end

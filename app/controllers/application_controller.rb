class ApplicationController < ActionController::Base
  include Pundit::Authorization

  protect_from_forgery with: :exception

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_locale
  before_action :set_paper_trail_whodunnit

  # Pundit: Ensure authorization is performed on every action
  after_action :verify_authorized, unless: :devise_controller?

  # Pundit: Handle authorization errors
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # Share data with all Inertia requests
  inertia_share do
    {
      locale: I18n.locale.to_s,
      available_locales: [
        { code: "en", name: I18n.with_locale(:en) { I18n.t("locale_name") }, flag: "🇬🇧" },
        { code: "es", name: I18n.with_locale(:es) { I18n.t("locale_name") }, flag: "🇪🇸" }
      ],
      # Share specific namespaces needed by frontend
      translations: {
        app: I18n.t("app").is_a?(Hash) ? I18n.t("app") : {},
        common: I18n.t("common").is_a?(Hash) ? I18n.t("common") : {},
        errors: I18n.t("errors").is_a?(Hash) ? I18n.t("errors") : {},
        user_management: I18n.t("user_management").is_a?(Hash) ? I18n.t("user_management") : {}
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

  private

  # PaperTrail: Track who made the change
  def user_for_paper_trail
    current_user&.id
  end

  # Pundit: Define the user for authorization
  def pundit_user
    current_user
  end

  # Pundit: Handle unauthorized access
  def user_not_authorized(exception)
    policy_name = exception.policy.class.to_s.underscore
    message = I18n.t("pundit.#{policy_name}.#{exception.query}", default: :default)
    message = I18n.t("pundit.default", default: "You are not authorized to perform this action.") if message == :default

    respond_to do |format|
      format.html do
        flash[:alert] = message
        redirect_back(fallback_location: root_path)
      end
      format.json { render json: { error: message }, status: :forbidden }
      format.inertia do
        inertia_location root_path, error: message
      end
    end
  end
end

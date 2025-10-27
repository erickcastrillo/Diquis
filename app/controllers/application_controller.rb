class ApplicationController < ActionController::Base
  # include InertiaRails::Renderer

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
end

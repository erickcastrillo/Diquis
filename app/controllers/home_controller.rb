# frozen_string_literal: true

class HomeController < ApplicationController
  # Home page is public - no authorization required
  skip_after_action :verify_authorized, only: :index

  def index
    render inertia: "Landing/Index", props: {}
  end
end

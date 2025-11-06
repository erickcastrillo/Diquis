# frozen_string_literal: true

class InertiaExampleController < ApplicationController
  # Example page is public - no authorization required
  skip_after_action :verify_authorized, only: :index

  def index
    render inertia: "InertiaExample", props: {
      name: params.fetch(:name, "World")
    }
  end
end

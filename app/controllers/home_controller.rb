# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    render inertia: "Home", props: {
      message: "Welcome to Diquis!"
    }
  end
end

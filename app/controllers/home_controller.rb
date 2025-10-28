# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    render inertia: "Home", props: {
      message: "Welcome to Diquis!",
      auth: {
        user: current_user ? {
          id: current_user.id,
          email: current_user.email
        } : nil
      },
      flash: {
        notice: flash[:notice],
        alert: flash[:alert]
      }
    }
  end
end

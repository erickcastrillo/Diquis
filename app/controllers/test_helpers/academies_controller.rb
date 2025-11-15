# frozen_string_literal: true

module TestHelpers
  class AcademiesController < ApplicationController
    skip_before_action :verify_authenticity_token
    skip_after_action :verify_authorized

    def create
      academy = Academy.new(academy_params)
      if academy.save
        render json: academy, status: :created
      else
        render json: { errors: academy.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def academy_params
      params.require(:academy).permit(:name, :subdomain, :email, :status)
    end
  end
end

# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Home", type: :request do
  describe "GET /index" do
    it "returns http success without authentication" do
      get root_path
      expect(response).to have_http_status(:success)
    end

    it "renders the landing page" do
      get root_path
      expect(response).to be_successful
    end

    it "does not require authentication" do
      # Should work without signing in
      get root_path
      expect(response).not_to redirect_to(new_user_session_path)
    end
  end
end

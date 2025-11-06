# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Dashboard", type: :request do
  describe "GET /dashboard" do
    context "when user is not authenticated" do
      it "redirects to sign in page" do
        get dashboard_path
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context "when user is authenticated" do
      let(:user) { create(:user) }

      before do
        sign_in user
      end

      it "returns http success" do
        get dashboard_path
        expect(response).to have_http_status(:success)
      end

      it "renders the dashboard page" do
        get dashboard_path
        expect(response).to be_successful
      end
    end

    context "for each role" do
      User::ROLES.each do |role|
        context "when user is a #{role}" do
          let(:user) { create(:user, role: role) }

          before do
            sign_in user
          end

          it "allows access to dashboard" do
            get dashboard_path
            expect(response).to have_http_status(:success)
          end
        end
      end
    end
  end
end

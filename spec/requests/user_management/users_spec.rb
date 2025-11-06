# frozen_string_literal: true

require "rails_helper"

RSpec.describe "UserManagement::Users", type: :request do
  # Create test users for different roles
  let(:super_admin) { create(:user, :super_admin) }
  let(:academy_admin) { create(:user, :academy_admin) }
  let(:player) { create(:user, :player) }
  let(:other_player) { create(:user, :player) }

  describe "GET /admin/users" do
    context "when user is not authenticated" do
      it "redirects to login" do
        get user_management_users_path
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context "when user is authenticated as academy_admin" do
      before { sign_in academy_admin }

      it "returns success" do
        get user_management_users_path
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "GET /admin/users/:id" do
    context "when viewing own profile" do
      before { sign_in player }

      it "returns success" do
        get user_management_user_path(player)
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "GET /admin/users/new" do
    context "when academy_admin creates user" do
      before { sign_in academy_admin }

      it "returns success" do
        get new_user_management_user_path
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "POST /admin/users" do
    let(:valid_attributes) do
      {
        email: "newuser@example.com",
        first_name: "John",
        last_name: "Doe",
        phone: "+12345678900",
        role: "player",
        password: "password123",
        password_confirmation: "password123"
      }
    end

    context "when academy_admin creates user with valid attributes" do
      before { sign_in academy_admin }

      it "creates a new user" do
        expect {
          post user_management_users_path, params: { user: valid_attributes }
        }.to change(User, :count).by(1)
      end

      it "redirects to the created user" do
        post user_management_users_path, params: { user: valid_attributes }
        expect(response).to redirect_to(user_management_user_path(User.last))
      end
    end
  end

  describe "GET /admin/users/:id/edit" do
    context "when editing own profile" do
      before { sign_in player }

      it "returns success" do
        get edit_user_management_user_path(player)
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "PATCH /admin/users/:id" do
    let(:new_attributes) do
      {
        first_name: "Updated",
        last_name: "Name"
      }
    end

    context "when updating own profile" do
      before { sign_in player }

      it "updates the user" do
        patch user_management_user_path(player), params: { user: new_attributes }
        player.reload
        expect(player.first_name).to eq("Updated")
        expect(player.last_name).to eq("Name")
      end

      it "redirects to the user" do
        patch user_management_user_path(player), params: { user: new_attributes }
        expect(response).to redirect_to(user_management_user_path(player))
      end
    end
  end

  describe "DELETE /admin/users/:id" do
    context "when academy_admin deletes manageable user" do
      before { sign_in academy_admin }

      it "destroys the user" do
        other_player # Create the user first
        expect {
          delete user_management_user_path(other_player)
        }.to change(User, :count).by(-1)
      end

      it "redirects to users index" do
        delete user_management_user_path(other_player)
        expect(response).to redirect_to(user_management_users_path)
      end
    end
  end
end

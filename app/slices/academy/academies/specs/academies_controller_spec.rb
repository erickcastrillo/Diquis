# frozen_string_literal: true

require "rails_helper"

# AcademiesController Specs
# 
# Tests for the HTTP request handling layer for academies.
# Covers all CRUD operations, Inertia.js rendering, and authorization.
# 
module Academy
  RSpec.describe AcademiesController, type: :controller do
    # Test setup for foundation model controller
    let(:user) { create(:user) }
    let!(:academy) { create(:academy) }

    before do
      # Mock authentication (adjust based on your auth setup)
      allow(controller).to receive(:current_user).and_return(user)
    end

    # Test index action
    describe "GET #index" do
      let!(:academies) { create_list(:academy, 3) }

      it "returns a successful response" do
        get :index
        expect(response).to have_http_status(:success)
      end

      it "renders the Index component via Inertia" do
        expect(controller).to receive(:render).with(
          hash_including(inertia: "Academy/Index")
        )
        get :index
      end

      it "provides academies data to the component" do
        get :index
        rendered_props = controller.instance_variable_get(:@_inertia_props)
        expect(rendered_props[:academies]).to be_present
      end

    end

    # Test show action
    describe "GET #show" do
      it "returns a successful response" do
        get :show, params: { id: academy.id }
        expect(response).to have_http_status(:success)
      end

      it "renders the Show component via Inertia" do
        expect(controller).to receive(:render).with(
          hash_including(inertia: "Academy/Show")
        )
        get :show, params: { id: academy.id }
      end

      it "provides the academy data to the component" do
        get :show, params: { id: academy.id }
        rendered_props = controller.instance_variable_get(:@_inertia_props)
        expect(rendered_props[:academy]).to be_present
      end

      context "with non-existent academy" do
        it "redirects with an error message" do
          get :show, params: { id: "non-existent" }
          expect(response).to redirect_to(academies_path)
          expect(flash[:alert]).to be_present
        end
      end
    end

    # Test new action
    describe "GET #new" do
      it "returns a successful response" do
        get :new
        expect(response).to have_http_status(:success)
      end

      it "renders the New component via Inertia" do
        expect(controller).to receive(:render).with(
          hash_including(inertia: "Academy/New")
        )
        get :new
      end

      it "provides a new academy instance to the component" do
        get :new
        rendered_props = controller.instance_variable_get(:@_inertia_props)
        expect(rendered_props[:academy]).to be_present
      end
    end

    # Test create action
    describe "POST #create" do
      let(:valid_attributes) do
        {
        }
      end

      context "with valid parameters" do
        it "creates a new academy" do
          expect {
            post :create, params: { 
              academy: valid_attributes
            }
          }.to change(Academy, :count).by(1)
        end

        it "redirects to the created academy" do
          post :create, params: { 
            academy: valid_attributes
          }
          expect(response).to redirect_to(academy_path(Academy.last))
          expect(flash[:notice]).to eq("Academy was successfully created.")
        end
      end

      context "with invalid parameters" do
        let(:invalid_attributes) do
          {
          }
        end

        it "does not create a new academy" do
          expect {
            post :create, params: { 
              academy: invalid_attributes
            }
          }.not_to change(Academy, :count)
        end

        it "redirects back to new with errors" do
          post :create, params: { 
            academy: invalid_attributes
          }
          expect(response).to redirect_to(new_academy_path)
        end
      end
    end

    # Test edit action
    describe "GET #edit" do
      it "returns a successful response" do
        get :edit, params: { id: academy.id }
        expect(response).to have_http_status(:success)
      end

      it "renders the Edit component via Inertia" do
        expect(controller).to receive(:render).with(
          hash_including(inertia: "Academy/Edit")
        )
        get :edit, params: { id: academy.id }
      end
    end

    # Test update action
    describe "PATCH #update" do
      let(:new_attributes) do
        {
        }
      end

      context "with valid parameters" do
        it "updates the academy" do
          patch :update, params: { 
            id: academy.id, 
            academy: new_attributes
          }
          academy.reload
        end

        it "redirects to the academy" do
          patch :update, params: { 
            id: academy.id, 
            academy: new_attributes
          }
          expect(response).to redirect_to(academy)
          expect(flash[:notice]).to eq("Academy was successfully updated.")
        end
      end

      context "with invalid parameters" do
        let(:invalid_attributes) do
          {
          }
        end

        it "redirects back to edit with errors" do
          patch :update, params: { 
            id: academy.id, 
            academy: invalid_attributes
          }
          expect(response).to redirect_to(edit_academy_path(academy))
        end
      end
    end

    # Test destroy action
    describe "DELETE #destroy" do
      it "destroys the academy" do
        expect {
          delete :destroy, params: { id: academy.id }
        }.to change(Academy, :count).by(-1)
      end

      it "redirects to the academies list" do
        delete :destroy, params: { id: academy.id }
        expect(response).to redirect_to(academies_path)
        expect(flash[:notice]).to eq("Academy was successfully deleted.")
      end
    end

    # Test before_action callbacks
    describe "before_action callbacks" do
      describe "#set_academy" do
        it "loads the academy for show action" do
          get :show, params: { id: academy.id }
          expect(controller.instance_variable_get(:@academy)).to eq(academy)
        end

        it "loads the academy for edit action" do
          get :edit, params: { id: academy.id }
          expect(controller.instance_variable_get(:@academy)).to eq(academy)
        end
      end

    end

    # Test error handling
    describe "error handling" do
      context "when service returns error" do
        before do
          allow_any_instance_of(AcademyService).to receive(:create).and_return(
            ServiceResult.new(success: false, errors: ["Something went wrong"])
          )
        end

        it "handles service errors gracefully" do
          post :create, params: { 
            academy: { name: "Test" }
          }
          expect(response).to redirect_to(new_academy_path)
        end
      end
    end
  end
end
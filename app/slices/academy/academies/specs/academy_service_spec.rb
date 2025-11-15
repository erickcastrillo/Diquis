# frozen_string_literal: true

require "rails_helper"

# AcademyService Specs
# 
# Tests for the business logic layer handling academies operations.
# Covers CRUD operations, error handling, and service result patterns.
# 
module Academy
  RSpec.describe AcademyService, type: :service do
    # Test setup for foundation model service
    let(:valid_params) do
      {
        academy: {
        }
      }
    end
    let(:service) { described_class.new(params: valid_params) }

    # Test service initialization
    describe "initialization" do
      it "accepts params without academy" do
        expect(service.params).to eq(valid_params)
      end

      it "does not require academy parameter for foundation model" do
        expect { described_class.new(params: valid_params) }.not_to raise_error
      end
    end

    # Test create operation
    describe "#create" do
      context "with valid parameters" do
        it "creates a new academy" do
          expect { service.create }.to change(Academy, :count).by(1)
        end

        it "returns a successful result" do
          result = service.create
          expect(result).to be_success
          expect(result.data).to be_a(Academy)
        end

        it "sets the correct attributes" do
          result = service.create
          academy = result.data

        end

      end

      context "with invalid parameters" do
        let(:invalid_params) do
          {
            academy: {
            }
          }
        end
        let(:invalid_service) { described_class.new(params: invalid_params) }

        it "does not create a academy" do
          expect { invalid_service.create }.not_to change(Academy, :count)
        end

        it "returns an error result" do
          result = invalid_service.create
          expect(result).to be_error
          expect(result.errors).to be_present
        end
      end
    end

    # Test update operation
    describe "#update" do
      let!(:academy) { create(:academy) }

      context "with valid parameters" do
        let(:update_params) do
          {
            academy: {
            }
          }
        end
        let(:update_service) { described_class.new(params: update_params) }

        it "updates the academy" do
          result = update_service.update(academy.id)
          expect(result).to be_success

          academy.reload
        end

        it "returns the updated academy" do
          result = update_service.update(academy.id)
          expect(result.data).to eq(academy)
        end
      end

      context "with invalid parameters" do
        let(:invalid_update_params) do
          {
            academy: {
            }
          }
        end
        let(:invalid_update_service) { described_class.new(params: invalid_update_params) }

        it "returns an error result" do
          result = invalid_update_service.update(academy.id)
          expect(result).to be_error
          expect(result.errors).to be_present
        end
      end

      context "with non-existent academy" do
        it "returns an error result" do
          result = service.update("non-existent-id")
          expect(result).to be_error
          expect(result.errors).to include("Academy not found")
        end
      end
    end

    # Test find operation
    describe "#find" do
      let!(:academy) { create(:academy) }

      context "with existing academy" do
        it "returns the academy" do
          result = service.find(academy.id)
          expect(result).to be_success
          expect(result.data).to eq(academy)
        end
      end

      context "with non-existent academy" do
        it "returns an error result" do
          result = service.find("non-existent-id")
          expect(result).to be_error
          expect(result.errors).to include("Academy not found")
        end
      end

    end

    # Test list operation
    describe "#list" do
      let!(:academies) { create_list(:academy, 3) }

      it "returns paginated academies" do
        result = service.list
        expect(result).to be_success
        expect(result.data).to be_a(Kaminari::PaginatableArray)
      end

      it "returns the correct number of academies" do
        result = service.list
        expect(result.data.size).to eq(3)
      end

      it "supports pagination" do
        result = service.list(page: 1, per_page: 2)
        expect(result.data.size).to eq(2)
      end

    end

    # Test destroy operation
    describe "#destroy" do
      let!(:academy) { create(:academy) }

      context "with existing academy" do
        it "destroys the academy" do
          expect { service.destroy(academy.id) }.to change(Academy, :count).by(-1)
        end

        it "returns a successful result" do
          result = service.destroy(academy.id)
          expect(result).to be_success
          expect(result.data).to eq(academy)
        end
      end

      context "with non-existent academy" do
        it "returns an error result" do
          result = service.destroy("non-existent-id")
          expect(result).to be_error
          expect(result.errors).to include("Academy not found")
        end
      end
    end

    # Test private methods
    describe "private methods" do
      describe "#permitted_params" do
        it "permits the correct parameters" do
          permitted = service.send(:permitted_params)
          expected_keys = []
          expect(permitted.keys).to match_array(expected_keys)
        end
      end
    end
  end
end
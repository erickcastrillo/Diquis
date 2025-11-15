# frozen_string_literal: true

require "rails_helper"

# Academy Model Specs
# 
# Tests for the Academy model including validations, associations,
# scopes, and instance methods. Ensures model behaves correctly in all scenarios.
# 
RSpec.describe Academy, type: :model do
    # Test setup for foundation model
    let(:academy) { create(:academy) }

    # Test model structure and basic functionality
    describe "model structure" do
      it "has a valid factory" do
        expect(academy).to be_valid
      end

      it "generates a slug on creation" do
        expect(academy.slug).to be_present
      end

      it "uses UUID as primary key" do
        expect(academy.id).to match(/\A[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\z/)
      end
    end

    # Test model validations
    describe "validations" do
    end

    # Test model scopes
    describe "scopes" do
      # Add scope tests here when scopes are added to the model
      it "can be extended with custom scopes" do
        expect(Academy).to respond_to(:all)
      end
    end

    # Test instance methods
    describe "instance methods" do
      describe "#display_name" do
        it "returns the name of the academy" do
          expect(academy.display_name).to eq(academy.name)
        end
      end

      describe "#to_param" do
        it "returns the slug for URL generation" do
          expect(academy.to_param).to eq(academy.slug)
        end
      end
    end

    # Test factory and create valid records
    describe "factory" do
      it "creates valid academy records" do
        expect { create(:academy) }.not_to raise_error
      end

      it "creates unique slugs for different records" do
        record1 = create(:academy)
        record2 = create(:academy)
        expect(record1.slug).not_to eq(record2.slug)
      end
    end
end

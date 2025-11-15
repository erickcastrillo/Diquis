# frozen_string_literal: true

require "rails_helper"

# AcademyPolicy Specs
# 
# Tests for authorization rules governing academies access.
# Covers permission checks, scoping, and permitted attributes.
# 
module Academy
  RSpec.describe AcademyPolicy, type: :policy do
    # Test setup for foundation model policy
    let(:admin_user) { create(:user, :admin) }
    let(:manager_user) { create(:user, :manager) }
    let(:member_user) { create(:user, :member) }
    let(:guest_user) { create(:user) }
    
    let(:academy) { create(:academy) }

    before do
      # Set up user roles (adjust based on your user model)
      allow(admin_user).to receive(:system_admin?).and_return(true)
      allow(manager_user).to receive(:system_admin?).and_return(false)
      allow(member_user).to receive(:system_admin?).and_return(false)
      allow(guest_user).to receive(:system_admin?).and_return(false)
    end

    # Test index permission
    describe "#index?" do
      it "allows access for authenticated users" do
        expect(described_class.new(admin_user, academy).index?).to be true
        expect(described_class.new(manager_user, academy).index?).to be true
        expect(described_class.new(member_user, academy).index?).to be true
      end

      it "denies access for nil user" do
        expect(described_class.new(nil, academy).index?).to be false
      end
    end

    # Test show permission
    describe "#show?" do
      it "allows access for authenticated users" do
        expect(described_class.new(admin_user, academy).show?).to be true
        expect(described_class.new(manager_user, academy).show?).to be true
        expect(described_class.new(member_user, academy).show?).to be true
      end

      it "denies access for nil user" do
        expect(described_class.new(nil, academy).show?).to be false
      end
    end

    # Test create permission
    describe "#create?" do
      it "allows creation for admin users" do
        expect(described_class.new(admin_user, academy).create?).to be true
      end

      it "denies creation for non-admin users" do
        expect(described_class.new(manager_user, academy).create?).to be false
        expect(described_class.new(member_user, academy).create?).to be false
        expect(described_class.new(guest_user, academy).create?).to be false
      end

      it "denies creation for nil user" do
        expect(described_class.new(nil, academy).create?).to be false
      end
    end

    # Test update permission
    describe "#update?" do
      it "allows updates for admin users" do
        expect(described_class.new(admin_user, academy).update?).to be true
      end

      it "denies updates for non-admin users" do
        expect(described_class.new(manager_user, academy).update?).to be false
        expect(described_class.new(member_user, academy).update?).to be false
        expect(described_class.new(guest_user, academy).update?).to be false
      end

      it "denies updates for nil user" do
        expect(described_class.new(nil, academy).update?).to be false
      end
    end

    # Test destroy permission
    describe "#destroy?" do
      it "allows deletion for admin users" do
        expect(described_class.new(admin_user, academy).destroy?).to be true
      end

      it "denies deletion for non-admin users" do
        expect(described_class.new(manager_user, academy).destroy?).to be false
        expect(described_class.new(member_user, academy).destroy?).to be false
        expect(described_class.new(guest_user, academy).destroy?).to be false
      end

      it "denies deletion for nil user" do
        expect(described_class.new(nil, academy).destroy?).to be false
      end
    end

    # Test permitted attributes
    describe "#permitted_attributes" do
      let(:policy) { described_class.new(admin_user, academy) }

      it "returns the correct permitted attributes" do
        expected_attributes = []
        expect(policy.permitted_attributes).to match_array(expected_attributes)
      end
    end

    # Test policy scope
    describe "Scope" do
      subject { described_class::Scope.new(user, Academy.all).resolve }

      let!(:academy1) { create(:academy) }
      let!(:academy2) { create(:academy) }

      context "for system admin" do
        let(:user) { admin_user }

        it "returns all academies" do
          expect(subject).to include(academy1)
          expect(subject).to include(academy2)
        end
      end

      context "for regular user" do
        let(:user) { manager_user }

        it "returns all academies (foundation model)" do
          expect(subject).to include(academy1)
          expect(subject).to include(academy2)
        end
      end
    end

    # Test edge cases
    describe "edge cases" do
      it "handles nil record gracefully" do
        policy = described_class.new(admin_user, nil)
        expect { policy.index? }.not_to raise_error
        expect { policy.show? }.not_to raise_error
        expect { policy.create? }.not_to raise_error
        expect { policy.update? }.not_to raise_error
        expect { policy.destroy? }.not_to raise_error
      end

      it "handles policy instantiation with both nil user and record" do
        policy = described_class.new(nil, nil)
        expect(policy.index?).to be false
        expect(policy.show?).to be false
        expect(policy.create?).to be false
        expect(policy.update?).to be false
        expect(policy.destroy?).to be false
      end
    end
  end
end
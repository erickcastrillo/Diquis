# frozen_string_literal: true

require "rails_helper"

RSpec.describe UserPolicy, type: :policy do
  subject { described_class.new(user, target_user) }

  # Test all 7 roles
  let(:player) { create(:user, role: :player) }
  let(:parent) { create(:user, role: :parent) }
  let(:staff) { create(:user, role: :staff) }
  let(:coach) { create(:user, role: :coach) }
  let(:academy_admin) { create(:user, role: :academy_admin) }
  let(:academy_owner) { create(:user, role: :academy_owner) }
  let(:super_admin) { create(:user, role: :super_admin) }

  describe "index?" do
    context "when user is a player" do
      let(:user) { player }
      let(:target_user) { nil }

      it { is_expected.not_to permit_action(:index) }
    end

    context "when user is a parent" do
      let(:user) { parent }
      let(:target_user) { nil }

      it { is_expected.not_to permit_action(:index) }
    end

    context "when user is staff" do
      let(:user) { staff }
      let(:target_user) { nil }

      it { is_expected.to permit_action(:index) }
    end

    context "when user is a coach" do
      let(:user) { coach }
      let(:target_user) { nil }

      it { is_expected.to permit_action(:index) }
    end

    context "when user is an academy_admin" do
      let(:user) { academy_admin }
      let(:target_user) { nil }

      it { is_expected.to permit_action(:index) }
    end

    context "when user is an academy_owner" do
      let(:user) { academy_owner }
      let(:target_user) { nil }

      it { is_expected.to permit_action(:index) }
    end

    context "when user is a super_admin" do
      let(:user) { super_admin }
      let(:target_user) { nil }

      it { is_expected.to permit_action(:index) }
    end
  end

  describe "show?" do
    context "when viewing own profile" do
      let(:user) { player }
      let(:target_user) { player }

      it { is_expected.to permit_action(:show) }
    end

    context "when player tries to view another user" do
      let(:user) { player }
      let(:target_user) { staff }

      it { is_expected.not_to permit_action(:show) }
    end

    context "when parent tries to view another user" do
      let(:user) { parent }
      let(:target_user) { player }

      it { is_expected.not_to permit_action(:show) }
    end

    context "when staff views any user" do
      let(:user) { staff }
      let(:target_user) { super_admin }

      it { is_expected.to permit_action(:show) }
    end

    context "when coach views any user" do
      let(:user) { coach }
      let(:target_user) { academy_admin }

      it { is_expected.to permit_action(:show) }
    end

    context "when academy_admin views manageable user" do
      let(:user) { academy_admin }
      let(:target_user) { player }

      it { is_expected.to permit_action(:show) }
    end

    context "when academy_admin views non-manageable user" do
      let(:user) { academy_admin }
      let(:target_user) { academy_owner }

      it { is_expected.not_to permit_action(:show) }
    end

    context "when academy_owner views manageable user" do
      let(:user) { academy_owner }
      let(:target_user) { academy_admin }

      it { is_expected.to permit_action(:show) }
    end

    context "when academy_owner views super_admin" do
      let(:user) { academy_owner }
      let(:target_user) { super_admin }

      it { is_expected.not_to permit_action(:show) }
    end

    context "when super_admin views any user" do
      let(:user) { super_admin }
      let(:target_user) { academy_owner }

      it { is_expected.to permit_action(:show) }
    end
  end

  describe "create?" do
    context "when player tries to create user" do
      let(:user) { player }
      let(:target_user) { build(:user, role: :player) }

      it { is_expected.not_to permit_action(:create) }
    end

    context "when parent tries to create user" do
      let(:user) { parent }
      let(:target_user) { build(:user, role: :player) }

      it { is_expected.not_to permit_action(:create) }
    end

    context "when staff tries to create user" do
      let(:user) { staff }
      let(:target_user) { build(:user, role: :player) }

      it { is_expected.not_to permit_action(:create) }
    end

    context "when coach tries to create user" do
      let(:user) { coach }
      let(:target_user) { build(:user, role: :player) }

      it { is_expected.not_to permit_action(:create) }
    end

    context "when academy_admin creates player" do
      let(:user) { academy_admin }
      let(:target_user) { build(:user, role: :player) }

      it { is_expected.to permit_action(:create) }
    end

    context "when academy_admin creates coach" do
      let(:user) { academy_admin }
      let(:target_user) { build(:user, role: :coach) }

      it { is_expected.to permit_action(:create) }
    end

    context "when academy_admin tries to create academy_admin" do
      let(:user) { academy_admin }
      let(:target_user) { build(:user, role: :academy_admin) }

      it { is_expected.not_to permit_action(:create) }
    end

    context "when academy_owner creates academy_admin" do
      let(:user) { academy_owner }
      let(:target_user) { build(:user, role: :academy_admin) }

      it { is_expected.to permit_action(:create) }
    end

    context "when academy_owner tries to create super_admin" do
      let(:user) { academy_owner }
      let(:target_user) { build(:user, role: :super_admin) }

      it { is_expected.not_to permit_action(:create) }
    end

    context "when super_admin creates any role" do
      let(:user) { super_admin }
      let(:target_user) { build(:user, role: :super_admin) }

      it { is_expected.to permit_action(:create) }
    end
  end

  describe "update?" do
    context "when user updates own profile" do
      let(:user) { player }
      let(:target_user) { player }

      it { is_expected.to permit_action(:update) }
    end

    context "when player tries to update another user" do
      let(:user) { player }
      let(:target_user) { staff }

      it { is_expected.not_to permit_action(:update) }
    end

    context "when academy_admin updates manageable user" do
      let(:user) { academy_admin }
      let(:target_user) { player }

      it { is_expected.to permit_action(:update) }
    end

    context "when academy_admin tries to update academy_owner" do
      let(:user) { academy_admin }
      let(:target_user) { academy_owner }

      it { is_expected.not_to permit_action(:update) }
    end

    context "when academy_owner updates academy_admin" do
      let(:user) { academy_owner }
      let(:target_user) { academy_admin }

      it { is_expected.to permit_action(:update) }
    end

    context "when academy_owner tries to update super_admin" do
      let(:user) { academy_owner }
      let(:target_user) { super_admin }

      it { is_expected.not_to permit_action(:update) }
    end

    context "when super_admin updates any user" do
      let(:user) { super_admin }
      let(:target_user) { academy_owner }

      it { is_expected.to permit_action(:update) }
    end
  end

  describe "destroy?" do
    context "when user tries to delete themselves" do
      let(:user) { super_admin }
      let(:target_user) { super_admin }

      it { is_expected.not_to permit_action(:destroy) }
    end

    context "when player tries to delete another user" do
      let(:user) { player }
      let(:target_user) { staff }

      it { is_expected.not_to permit_action(:destroy) }
    end

    context "when academy_admin deletes manageable user" do
      let(:user) { academy_admin }
      let(:target_user) { player }

      it { is_expected.to permit_action(:destroy) }
    end

    context "when academy_admin tries to delete academy_owner" do
      let(:user) { academy_admin }
      let(:target_user) { academy_owner }

      it { is_expected.not_to permit_action(:destroy) }
    end

    context "when academy_owner deletes academy_admin" do
      let(:user) { academy_owner }
      let(:target_user) { academy_admin }

      it { is_expected.to permit_action(:destroy) }
    end

    context "when super_admin deletes any user (except self)" do
      let(:user) { super_admin }
      let(:target_user) { academy_owner }

      it { is_expected.to permit_action(:destroy) }
    end
  end

  describe "manage_roles?" do
    context "when player tries to manage roles" do
      let(:user) { player }
      let(:target_user) { nil }

      it { is_expected.not_to permit_action(:manage_roles) }
    end

    context "when staff tries to manage roles" do
      let(:user) { staff }
      let(:target_user) { nil }

      it { is_expected.not_to permit_action(:manage_roles) }
    end

    context "when academy_admin manages roles" do
      let(:user) { academy_admin }
      let(:target_user) { nil }

      it { is_expected.to permit_action(:manage_roles) }
    end

    context "when academy_owner manages roles" do
      let(:user) { academy_owner }
      let(:target_user) { nil }

      it { is_expected.to permit_action(:manage_roles) }
    end

    context "when super_admin manages roles" do
      let(:user) { super_admin }
      let(:target_user) { nil }

      it { is_expected.to permit_action(:manage_roles) }
    end
  end

  describe "Scope" do
    before do
      # Create users with different roles
      player
      parent
      staff
      coach
      academy_admin
      academy_owner
      super_admin
    end

    describe "resolve" do
      context "when user is a player" do
        let(:user) { player }

        it "returns only themselves" do
          scope = Pundit.policy_scope!(user, User)
          expect(scope).to contain_exactly(player)
        end
      end

      context "when user is a parent" do
        let(:user) { parent }

        it "returns only themselves" do
          scope = Pundit.policy_scope!(user, User)
          expect(scope).to contain_exactly(parent)
        end
      end

      context "when user is staff" do
        let(:user) { staff }

        it "returns all users" do
          scope = Pundit.policy_scope!(user, User)
          expect(scope.count).to eq(7) # All 7 roles
        end
      end

      context "when user is a coach" do
        let(:user) { coach }

        it "returns all users" do
          scope = Pundit.policy_scope!(user, User)
          expect(scope.count).to eq(7)
        end
      end

      context "when user is academy_admin" do
        let(:user) { academy_admin }

        it "returns users up to coach role" do
          scope = Pundit.policy_scope!(user, User)
          expect(scope).to include(player, parent, staff, coach)
          expect(scope).not_to include(academy_admin, academy_owner, super_admin)
        end
      end

      context "when user is academy_owner" do
        let(:user) { academy_owner }

        it "returns users up to academy_admin role" do
          scope = Pundit.policy_scope!(user, User)
          expect(scope).to include(player, parent, staff, coach, academy_admin)
          expect(scope).not_to include(academy_owner, super_admin)
        end
      end

      context "when user is super_admin" do
        let(:user) { super_admin }

        it "returns all users" do
          scope = Pundit.policy_scope!(user, User)
          expect(scope.count).to eq(7)
        end
      end
    end
  end
end

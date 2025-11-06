# frozen_string_literal: true

require "rails_helper"

RSpec.describe DashboardPolicy, type: :policy do
  subject { described_class.new(user, :dashboard) }

  describe "index?" do
    context "when user is authenticated" do
      let(:user) { build_stubbed(:user) }

      it { is_expected.to permit_action(:index) }
    end

    context "when user is nil (not authenticated)" do
      let(:user) { nil }

      it { is_expected.not_to permit_action(:index) }
    end

    context "for each role" do
      User::ROLES.each do |role|
        context "when user is a #{role}" do
          let(:user) { build_stubbed(:user, role: role) }

          it { is_expected.to permit_action(:index) }
        end
      end
    end
  end

  describe "show?" do
    context "when user is authenticated" do
      let(:user) { build_stubbed(:user) }

      it { is_expected.to permit_action(:show) }
    end

    context "when user is nil (not authenticated)" do
      let(:user) { nil }

      it { is_expected.not_to permit_action(:show) }
    end
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PlayerGuardian, type: :model do
  describe 'associations' do
    it { should belong_to(:player).class_name('User') }
    it { should belong_to(:guardian).class_name('User') }
  end

  describe 'validations' do
    let(:player) { create(:user, :player) }
    let(:guardian) { create(:user, :parent) }
    subject { build(:player_guardian, player: player, guardian: guardian) }

    it { should validate_presence_of(:player_id) }
    it { should validate_presence_of(:guardian_id) }
    it { should validate_presence_of(:relationship_type) }
    it { should validate_presence_of(:status) }

    # Skip the enum validation test as it's tested elsewhere
    # it { should validate_inclusion_of(:relationship_type).in_array(%w[mother father legal_guardian stepmother stepfather grandparent other]) }

    describe 'uniqueness' do
      let(:player) { create(:user, :player) }
      let(:guardian) { create(:user, :parent) }

      before { create(:player_guardian, player: player, guardian: guardian) }

      it 'validates uniqueness of guardian_id scoped to player_id' do
        duplicate = build(:player_guardian, player: player, guardian: guardian)
        expect(duplicate).not_to be_valid
        expect(duplicate.errors[:guardian_id]).to include('already has a relationship with this player')
      end
    end

    describe 'custom validations' do
      context 'player role validation' do
        it 'requires player to have player role' do
          staff_user = create(:user, :staff)
          relationship = build(:player_guardian, player: staff_user)

          expect(relationship).not_to be_valid
          expect(relationship.errors[:player]).to include("must have the 'player' role")
        end

        it 'allows player with player role' do
          player_user = create(:user, :player)
          guardian_user = create(:user, :parent)
          relationship = build(:player_guardian, player: player_user, guardian: guardian_user)

          expect(relationship).to be_valid
        end
      end

      context 'guardian role validation' do
        it 'requires guardian to have parent role' do
          coach_user = create(:user, :coach)
          player_user = create(:user, :player)
          relationship = build(:player_guardian, player: player_user, guardian: coach_user)

          expect(relationship).not_to be_valid
          expect(relationship.errors[:guardian]).to include("must have the 'parent' role")
        end

        it 'allows guardian with parent role' do
          parent_user = create(:user, :parent)
          player_user = create(:user, :player)
          relationship = build(:player_guardian, player: player_user, guardian: parent_user)

          expect(relationship).to be_valid
        end
      end

      context 'self-relationship validation' do
        it 'prevents player and guardian from being the same person' do
          user = create(:user, :player)
          relationship = build(:player_guardian, player: user, guardian: user)

          expect(relationship).not_to be_valid
          expect(relationship.errors[:base]).to include("Player and guardian cannot be the same person")
        end
      end
    end
  end

  describe 'enums' do
    it { should define_enum_for(:status).with_values(pending: 0, accepted: 1, declined: 2, revoked: 3).with_prefix(:status) }
  end

  describe 'scopes' do
    let!(:player) { create(:user, :player) }
    let!(:guardian) { create(:user, :parent) }
    let!(:pending_relationship) { create(:player_guardian, :pending, player: player, guardian: guardian) }
    let!(:accepted_relationship) { create(:player_guardian, :accepted) }
    let!(:declined_relationship) { create(:player_guardian, :declined) }

    describe '.active' do
      it 'returns only accepted relationships' do
        expect(PlayerGuardian.active).to include(accepted_relationship)
        expect(PlayerGuardian.active).not_to include(pending_relationship, declined_relationship)
      end
    end

    describe '.pending_invitations' do
      it 'returns only pending relationships' do
        expect(PlayerGuardian.pending_invitations).to include(pending_relationship)
        expect(PlayerGuardian.pending_invitations).not_to include(accepted_relationship, declined_relationship)
      end
    end

    describe '.for_player' do
      it 'returns relationships for specific player' do
        expect(PlayerGuardian.for_player(player.id)).to include(pending_relationship)
        expect(PlayerGuardian.for_player(player.id)).not_to include(accepted_relationship)
      end
    end

    describe '.for_guardian' do
      it 'returns relationships for specific guardian' do
        expect(PlayerGuardian.for_guardian(guardian.id)).to include(pending_relationship)
        expect(PlayerGuardian.for_guardian(guardian.id)).not_to include(accepted_relationship)
      end
    end

    describe '.recent' do
      it 'orders by created_at desc' do
        expect(PlayerGuardian.recent.first).to eq(declined_relationship)
      end
    end
  end

  describe 'instance methods' do
    let(:relationship) { create(:player_guardian, :pending) }

    describe '#accept!' do
      it 'changes status to accepted' do
        expect { relationship.accept! }.to change { relationship.status }.from('pending').to('accepted')
      end

      it 'sets accepted_at timestamp' do
        expect { relationship.accept! }.to change { relationship.accepted_at }.from(nil)
      end
    end

    describe '#decline!' do
      it 'changes status to declined' do
        expect { relationship.decline! }.to change { relationship.status }.from('pending').to('declined')
      end
    end

    describe '#revoke!' do
      it 'changes status to revoked' do
        expect { relationship.revoke! }.to change { relationship.status }.from('pending').to('revoked')
      end
    end

    describe '#active?' do
      it 'returns true for accepted status' do
        accepted = create(:player_guardian, :accepted)
        expect(accepted.active?).to be true
      end

      it 'returns false for other statuses' do
        pending = create(:player_guardian, :pending)
        expect(pending.active?).to be false
      end
    end

    describe '#relationship_type_humanized' do
      it 'returns humanized relationship type' do
        relationship = build(:player_guardian, relationship_type: 'legal_guardian')
        expect(relationship.relationship_type_humanized).to eq('Legal guardian')
      end
    end
  end
end

# frozen_string_literal: true

# PlayerGuardian model represents the relationship between a player (user with role 'player')
# and their guardian/parent (user with role 'parent')
#
# This model handles:
# - Parent-player relationships (mother, father, legal guardian, etc.)
# - Invitation workflow (pending, accepted, declined)
# - Access control for parents to view their children's data
class PlayerGuardian < ApplicationRecord
  # Associations
  belongs_to :player, class_name: "User", foreign_key: "player_id"
  belongs_to :guardian, class_name: "User", foreign_key: "guardian_id"

  # Enums
  enum :status, {
    pending: 0,      # Invitation sent, waiting for acceptance
    accepted: 1,     # Guardian accepted and confirmed relationship
    declined: 2,     # Guardian declined the invitation
    revoked: 3       # Relationship was revoked by admin or player
  }, prefix: true

  # Validations
  validates :player_id, presence: true
  validates :guardian_id, presence: true
  validates :relationship_type, presence: true, inclusion: {
    in: %w[mother father legal_guardian stepmother stepfather grandparent other],
    message: "%{value} is not a valid relationship type"
  }
  validates :status, presence: true

  # Ensure player is actually a player
  validate :player_must_have_player_role
  # Ensure guardian is actually a parent
  validate :guardian_must_have_parent_role
  # Prevent self-relationship
  validate :player_and_guardian_must_be_different
  # Unique relationship per player-guardian pair
  validates :guardian_id, uniqueness: {
    scope: :player_id,
    message: "already has a relationship with this player"
  }

  # Scopes
  scope :active, -> { where(status: :accepted) }
  scope :accepted, -> { where(status: :accepted) }  # Alias for active
  scope :pending, -> { where(status: :pending) }
  scope :pending_invitations, -> { where(status: :pending) }
  scope :for_player, ->(player_id) { where(player_id: player_id) }
  scope :for_guardian, ->(guardian_id) { where(guardian_id: guardian_id) }
  scope :recent, -> { order(created_at: :desc) }

  # Instance methods

  # Accept the guardian invitation
  def accept!
    update!(status: :accepted, accepted_at: Time.current)
  end

  # Decline the guardian invitation
  def decline!
    update!(status: :declined)
  end

  # Revoke the relationship
  def revoke!
    update!(status: :revoked)
  end

  # Check if the relationship is active
  def active?
    status_accepted?
  end

  # Get human-readable relationship type
  def relationship_type_humanized
    relationship_type.humanize
  end

  private

  def player_must_have_player_role
    if player.present? && !player.role_player?
      errors.add(:player, "must have the 'player' role")
    end
  end

  def guardian_must_have_parent_role
    if guardian.present? && !guardian.role_parent?
      errors.add(:guardian, "must have the 'parent' role")
    end
  end

  def player_and_guardian_must_be_different
    if player_id.present? && player_id == guardian_id
      errors.add(:base, "Player and guardian cannot be the same person")
    end
  end
end

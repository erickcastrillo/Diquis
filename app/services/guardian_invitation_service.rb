# frozen_string_literal: true

# GuardianInvitationService handles the process of inviting a parent/guardian
# to be linked to a player's account
#
# Usage:
#   service = GuardianInvitationService.new(
#     player: player_user,
#     guardian_email: "parent@example.com",
#     relationship_type: "mother",
#     invited_by: current_user
#   )
#   result = service.call
#
#   if result[:success]
#     guardian = result[:guardian]
#     relationship = result[:relationship]
#   else
#     errors = result[:errors]
#   end
class GuardianInvitationService
  attr_reader :player, :guardian_email, :relationship_type, :invited_by, :errors

  def initialize(player:, guardian_email:, relationship_type:, invited_by:, notes: nil)
    @player = player
    @guardian_email = guardian_email.to_s.downcase.strip
    @relationship_type = relationship_type
    @invited_by = invited_by
    @notes = notes
    @errors = []
  end

  def call
    validate_inputs
    return failure_result if @errors.any?

    ActiveRecord::Base.transaction do
      @guardian = find_or_create_guardian
      @relationship = create_relationship

      # TODO: Send invitation email in Phase 5
      # GuardianInvitationMailer.invite(@relationship).deliver_later

      success_result
    end
  rescue ActiveRecord::RecordInvalid => e
    @errors << e.message
    failure_result
  rescue StandardError => e
    @errors << "An unexpected error occurred: #{e.message}"
    failure_result
  end

  private

  def validate_inputs
    # Validate player
    unless @player.is_a?(User) && @player.role_player?
      @errors << "Player must be a user with 'player' role"
    end

    # Validate email format
    unless @guardian_email.match?(URI::MailTo::EMAIL_REGEXP)
      @errors << "Invalid email address"
    end

    # Validate relationship type
    valid_types = %w[mother father legal_guardian stepmother stepfather grandparent other]
    unless valid_types.include?(@relationship_type)
      @errors << "Invalid relationship type. Must be one of: #{valid_types.join(', ')}"
    end

    # Check if relationship already exists
    if @player && PlayerGuardian.exists?(
      player_id: @player.id,
      guardian: User.find_by(email: @guardian_email)
    )
      @errors << "A relationship with this guardian already exists"
    end
  end

  def find_or_create_guardian
    # Try to find existing parent user
    guardian = User.find_by(email: @guardian_email)

    if guardian
      # User exists - verify they have parent role
      unless guardian.role_parent?
        @errors << "User with email #{@guardian_email} exists but is not a parent"
        raise ActiveRecord::RecordInvalid.new(guardian)
      end
    else
      # Create new parent user with temporary password
      temp_password = generate_temporary_password
      guardian = User.create!(
        email: @guardian_email,
        role: :parent,
        password: temp_password,
        password_confirmation: temp_password,
        # Note: Devise will require email confirmation before they can log in
        # They'll also need to set a new password via the reset password flow
      )
    end

    guardian
  end

  def create_relationship
    relationship = PlayerGuardian.create!(
      player: @player,
      guardian: @guardian,
      relationship_type: @relationship_type,
      status: :pending,
      invited_at: Time.current,
      notes: @notes
    )

    relationship
  end

  def generate_temporary_password
    # Generate a secure random password
    # Parent will need to reset via email before first login
    SecureRandom.alphanumeric(16)
  end

  def success_result
    {
      success: true,
      guardian: @guardian,
      relationship: @relationship,
      newly_created: @guardian.persisted? && @guardian.created_at > 1.minute.ago
    }
  end

  def failure_result
    {
      success: false,
      errors: @errors
    }
  end
end

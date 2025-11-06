# frozen_string_literal: true

# PlayerGuardianPolicy handles authorization for managing player-guardian relationships
#
# Authorization rules:
# - Players can view their own guardians and invite new ones
# - Parents can view their assigned players and accept/decline invitations
# - Staff and above can manage all relationships
# - Academy admins and owners can manage relationships within their scope
# - Super admins can manage all relationships
class PlayerGuardianPolicy < ApplicationPolicy
  # View list of guardianships
  def index?
    # Staff and above can view all relationships
    user.role_staff? || user.role_coach? || user.admin?
  end

  # View a specific guardianship
  def show?
    # Can see if you're the player, the guardian, or staff+
    is_involved_party? || user.role_staff? || user.role_coach? || user.admin?
  end

  # Create a new guardianship (invite a guardian)
  def create?
    # Players can invite guardians for themselves
    # Staff+ can create relationships for any player
    return true if user.admin? || user.role_staff? || user.role_coach?

    # Player can create for themselves
    record.is_a?(PlayerGuardian) && record.player_id == user.id
  end

  # Alias for create
  def new?
    create?
  end

  # Update guardianship (e.g., accept/decline invitation)
  def update?
    # Guardian can accept/decline their own invitations
    # Player can update notes or revoke
    # Staff+ can update any relationship
    return true if user.admin? || user.role_staff? || user.role_coach?

    is_involved_party?
  end

  # Alias for update
  def edit?
    update?
  end

  # Delete/revoke a guardianship
  def destroy?
    # Player can remove their guardians
    # Staff+ can remove any relationship
    return true if user.admin? || user.role_staff? || user.role_coach?

    # Player can remove their own guardianships
    record.player_id == user.id
  end

  # Accept invitation (guardian-specific action)
  def accept?
    # Only the invited guardian can accept
    record.guardian_id == user.id && record.status_pending?
  end

  # Decline invitation (guardian-specific action)
  def decline?
    # Only the invited guardian can decline
    record.guardian_id == user.id && record.status_pending?
  end

  # Revoke relationship (player or admin action)
  def revoke?
    # Player can revoke their own guardianships
    # Staff+ can revoke any relationship
    return true if user.admin? || user.role_staff? || user.role_coach?

    record.player_id == user.id
  end

  # Scope - filter relationships based on user role
  class Scope < ApplicationPolicy::Scope
    def resolve
      case user.role
      when "player"
        # Players see only their own guardianships
        scope.where(player_id: user.id)
      when "parent"
        # Parents see only relationships where they are the guardian
        scope.where(guardian_id: user.id)
      when "staff", "coach"
        # Staff and coaches see all relationships
        scope.all
      when "academy_admin", "academy_owner", "super_admin"
        # Admins see all relationships
        # TODO: Scope by academy when multi-tenancy is implemented
        scope.all
      else
        scope.none
      end
    end
  end

  private

  def is_involved_party?
    record.player_id == user.id || record.guardian_id == user.id
  end
end

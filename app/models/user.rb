class User < ApplicationRecord
  # Enable multi-tenancy with acts_as_tenant
  acts_as_tenant :academy

  # Enable audit logging for all user changes
  has_paper_trail on: %i[create update destroy], ignore: %i[updated_at last_sign_in_at current_sign_in_at]

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable, :trackable, :timeoutable

  # Role enum - hierarchical from lowest to highest
  enum :role, {
    player: 0,
    parent: 1,
    staff: 2,
    coach: 3,
    academy_admin: 4,
    academy_owner: 5,
    super_admin: 6
  }, prefix: true

  # Associations
  belongs_to :academy, class_name: "Academies::Academy", optional: true

  # Player-Guardian relationships
  has_many :player_guardianships, class_name: "PlayerGuardian", foreign_key: "player_id", dependent: :destroy
  has_many :guardians, through: :player_guardianships, source: :guardian

  # When user is a guardian (parent), they can have many players (children)
  has_many :guardian_relationships, class_name: "PlayerGuardian", foreign_key: "guardian_id", dependent: :destroy
  has_many :players, through: :guardian_relationships, source: :player

  # Validations
  validates :role, presence: true
  # Custom validation for academy_id presence, allowing super_admins to be nil
  validate :academy_required_unless_super_admin

  def academy_required_unless_super_admin
    puts "[DEBUG] Validating academy presence for user with role=#{role.inspect} and academy_id=#{academy_id.inspect}"
    role_val = self.role_before_type_cast || self.role
    return if role_val.blank? # Don't validate if role is not set yet
    # Accept integer (6), string ("super_admin"), or symbol (:super_admin)
    if (role_val != 6 && role_val.to_s != "super_admin" && role_val != :super_admin) && academy_id.blank?
      errors.add(:academy_id, "must exist")
    end
  end
  validates :first_name, presence: true, if: -> { role_player? || role_parent? }
  validates :last_name, presence: true, if: -> { role_player? || role_parent? }
  validates :phone, format: { with: /\A[+]?[\d\s\-()]+\z/, allow_blank: true }
  validates :password, strong_password: true, if: :password_required?

  # Role helper methods
  def admin?
    role_academy_admin? || role_academy_owner? || role_super_admin?
  end

  def can_manage_users?
    role_academy_admin? || role_academy_owner? || role_super_admin?
  end

  def can_access_academy?(target_academy)
    return true if role_super_admin?
    self.academy == target_academy
  end

  def can_manage_academy?(target_academy)
    return true if role_super_admin?
    role_academy_owner? && self.academy == target_academy
  end

  def full_name
    "#{first_name} #{last_name}".strip.presence || email
  end

  def display_role
    role.humanize
  end

  # Guardian relationship helper methods
  def active_guardians
    guardians.joins(:player_guardianships).where(player_guardianships: { status: :accepted })
  end

  def active_players
    players.joins(:guardian_relationships).where(player_guardians: { status: :accepted })
  end

  def has_guardian?(guardian_user)
    player_guardianships.accepted.exists?(guardian_id: guardian_user.id)
  end

  def has_player?(player_user)
    guardian_relationships.accepted.exists?(player_id: player_user.id)
  end

  def pending_guardian_invitations
    player_guardianships.pending
  end

  def pending_player_invitations
    guardian_relationships.pending
  end
end

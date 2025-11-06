class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable, :trackable

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

  # Validations
  validates :role, presence: true
  validates :first_name, presence: true, if: -> { role_player? || role_parent? }
  validates :last_name, presence: true, if: -> { role_player? || role_parent? }
  validates :phone, format: { with: /\A[+]?[\d\s\-()]+\z/, allow_blank: true }

  # Role helper methods
  def admin?
    role_academy_admin? || role_academy_owner? || role_super_admin?
  end

  def can_manage_users?
    role_academy_admin? || role_academy_owner? || role_super_admin?
  end

  def can_manage_academy?
    role_academy_owner? || role_super_admin?
  end

  def full_name
    "#{first_name} #{last_name}".strip.presence || email
  end

  def display_role
    role.humanize
  end
end

# frozen_string_literal: true

# Explicitly require the Academies::Academy model to ensure it's loaded before use in seeds
require_relative '../app/slices/academy/academies/models/academy'

# Diquis Application Seeds
# This file creates sample data for development and demonstration purposes.
# The data is idempotent - running seeds multiple times won't create duplicates.
#
# 🔒 SECURITY NOTE:
# Passwords are loaded from environment variables or Rails credentials.
# A fallback default is provided for local development only.
# Production accounts should ALWAYS be created manually with secure,
# unique passwords through the admin interface.

# Only seed in development environment to prevent accidental data creation in production
unless Rails.env.production?
  puts "\n🌱 Seeding Diquis application data..."
  puts "=" * 80

  # Get default password from environment or credentials (fallback for dev)
  DEFAULT_SEED_PASSWORD = ENV.fetch("SEED_DEFAULT_PASSWORD") do
    credentials_password = Rails.application.credentials.dig(:seed, :default_password)

    if credentials_password
      credentials_password
    else
      # ⚠️ SECURITY WARNING: Using hardcoded fallback password
      warn "⚠️  WARNING: Using hardcoded default seed password. This is insecure!"
      warn "   Set SEED_DEFAULT_PASSWORD environment variable or configure in Rails credentials."
      warn "   Run: rails credentials:edit and add seed.default_password"
      "Dev3l0pment!2025" # ggignore
    end
  end

  # Helper method to create or find user
  def create_user(email:, password:, role:, first_name:, last_name:, phone: nil, academy: nil)
    user = User.find_or_initialize_by(email: email)
    if user.new_record?
      user.role = role # Assign role first so enum is set before validation
      user.assign_attributes(
        password: password,
        password_confirmation: password,
        first_name: first_name,
        last_name: last_name,
        phone: phone
      )
      user.academy = academy if academy && role != :super_admin # Assign academy unless super_admin
      puts "[DEBUG] Creating user: email=#{email}, role=#{role.inspect}, academy_id=#{academy&.id.inspect}, assigned_academy_id=#{user.academy_id.inspect}"
      user.skip_confirmation!
      user.save!
      puts "  ✅ Created #{role.to_s.humanize}: #{first_name} #{last_name} (#{email})"
    else
      puts "  ⏭️  Skipped #{role.to_s.humanize}: #{email} (already exists)"
    end
    user
  end

  # =============================================================================
  # ACADEMIES
  # =============================================================================
  puts "\n🏫 Creating Academies..."
  puts "-" * 80

  default_academy = Academies::Academy.find_or_create_by!(
    name: "Diquis Football Academy",
    email: "info@diquis.com",
    subdomain: "diquis",
    status: :active,
    address: "123 Main St, Anytown, USA",
    phone: "+15551234567"
  )
  puts "  ✅ Created/Found Academy: #{default_academy.name} (#{default_academy.subdomain})"

  # =============================================================================
  # ADMINISTRATIVE USERS
  # =============================================================================
  puts "\n👑 Creating Administrative Users..."
  puts "-" * 80

  # Super Admin - Full system access
  _super_admin = create_user(
    email: "admin@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :super_admin,
    first_name: "System",
    last_name: "Administrator",
    phone: "+15551234567"
  )

  # Academy Owner - Owner of the football academy
  _academy_owner = create_user(
    email: "owner@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :academy_owner,
    first_name: "Carlos",
    last_name: "Rodríguez",
    phone: "+50688889999",
    academy: default_academy
  )

  # Academy Admin - Administrative staff
  _academy_admin = create_user(
    email: "admin.academy@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :academy_admin,
    first_name: "María",
    last_name: "González",
    phone: "+50688887777",
    academy: default_academy
  )

  # =============================================================================
  # E2E TEST USERS
  # =============================================================================
  puts "\n🧪 Creating E2E Test Users..."
  puts "-" * 80

  # Test Academy Admin
  _test_academy_admin = create_user(
    email: "academy@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :academy_admin,
    first_name: "Test",
    last_name: "Academy Admin",
    phone: "+50688887778",
    academy: default_academy
  )

  # Test Coach
  _test_coach = create_user(
    email: "coach@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :coach,
    first_name: "Test",
    last_name: "Coach",
    phone: "+50688886667",
    academy: default_academy
  )

  # Test Player
  _test_player = create_user(
    email: "player@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :player,
    first_name: "Test",
    last_name: "Player",
    phone: "+50688870007",
    academy: default_academy
  )

  # =============================================================================
  # COACHING STAFF
  # =============================================================================
  puts "\n⚽ Creating Coaching Staff..."
  puts "-" * 80

  # Head Coach
  _coach1 = create_user(
    email: "coach.main@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :coach,
    first_name: "Diego",
    last_name: "Martínez",
    phone: "+50688886666",
    academy: default_academy
  )

  # Assistant Coach
  _coach2 = create_user(
    email: "coach.assistant@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :coach,
    first_name: "Luis",
    last_name: "Hernández",
    phone: "+50688885555",
    academy: default_academy
  )

  # Youth Coach
  _coach3 = create_user(
    email: "coach.youth@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :coach,
    first_name: "Ana",
    last_name: "Ramírez",
    phone: "+50688884444",
    academy: default_academy
  )

  # =============================================================================
  # SUPPORT STAFF
  # =============================================================================
  puts "\n🏃 Creating Support Staff..."
  puts "-" * 80

  # Fitness Trainer
  _staff1 = create_user(
    email: "staff.fitness@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :staff,
    first_name: "Roberto",
    last_name: "Sánchez",
    phone: "+50688883333",
    academy: default_academy
  )

  # Medical Staff
  _staff2 = create_user(
    email: "staff.medical@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :staff,
    first_name: "Elena",
    last_name: "Morales",
    phone: "+50688882222",
    academy: default_academy
  )

  # Equipment Manager
  _staff3 = create_user(
    email: "staff.equipment@diquis.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :staff,
    first_name: "Pedro",
    last_name: "López",
    phone: "+50688881111",
    academy: default_academy
  )

  # =============================================================================
  # PARENTS/GUARDIANS
  # =============================================================================
  puts "\n👨‍👩‍👧‍👦 Creating Parent/Guardian Accounts..."
  puts "-" * 80

  parents = []

  # Parent 1 - Will have 2 children
  parents << create_user(
    email: "parent1@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :parent,
    first_name: "Juan",
    last_name: "Pérez",
    phone: "+50688880001",
    academy: default_academy
  )

  # Parent 2 - Will have 1 child
  parents << create_user(
    email: "parent2@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :parent,
    first_name: "Laura",
    last_name: "Jiménez",
    phone: "+50688880002",
    academy: default_academy
  )

  # Parent 3 - Will have 1 child
  parents << create_user(
    email: "parent3@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :parent,
    first_name: "Miguel",
    last_name: "Castro",
    phone: "+50688880003",
    academy: default_academy
  )

  # Parent 4 - Will have 2 children (shares with parent 1)
  parents << create_user(
    email: "parent4@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :parent,
    first_name: "Carmen",
    last_name: "Pérez",
    phone: "+50688880004",
    academy: default_academy
  )

  # Parent 5 - Will have 1 child
  parents << create_user(
    email: "parent5@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :parent,
    first_name: "Fernando",
    last_name: "Vargas",
    phone: "+50688880005",
    academy: default_academy
  )

  # =============================================================================
  # PLAYERS
  # =============================================================================
  puts "\n⚽ Creating Player Accounts..."
  puts "-" * 80

  players = []

  # Player 1 - Child of parents 1 and 4 (siblings)
  players << create_user(
    email: "player1@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :player,
    first_name: "Carlos",
    last_name: "Pérez",
    phone: "+50688870001",
    academy: default_academy
  )

  # Player 2 - Sibling of player 1
  players << create_user(
    email: "player2@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :player,
    first_name: "Sofia",
    last_name: "Pérez",
    phone: "+50688870002",
    academy: default_academy
  )

  # Player 3 - Child of parent 2
  players << create_user(
    email: "player3@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :player,
    first_name: "Diego",
    last_name: "Jiménez",
    phone: "+50688870003",
    academy: default_academy
  )

  # Player 4 - Child of parent 3
  players << create_user(
    email: "player4@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :player,
    first_name: "Valentina",
    last_name: "Castro",
    phone: "+50688870004",
    academy: default_academy
  )

  # Player 5 - Child of parent 5
  players << create_user(
    email: "player5@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :player,
    first_name: "Mateo",
    last_name: "Vargas",
    phone: "+50688870005",
    academy: default_academy
  )

  # Player 6 - No parent assigned yet
  players << create_user(
    email: "player6@example.com",
    password: DEFAULT_SEED_PASSWORD,
    role: :player,
    first_name: "Isabella",
    last_name: "Rojas",
    phone: "+50688870006",
    academy: default_academy
  )

  # =============================================================================
  # PLAYER-GUARDIAN RELATIONSHIPS
  # =============================================================================
  puts "\n👨‍👧‍👦 Creating Player-Guardian Relationships..."
  puts "-" * 80

  def create_relationship(player, guardian, relationship_type, status = :accepted)
    relation = PlayerGuardian.find_or_initialize_by(
      player: player,
      guardian: guardian
    )

    if relation.new_record?
      relation.assign_attributes(
        relationship_type: relationship_type,
        status: status
      )
      relation.save!
      puts "  ✅ Linked #{player.full_name} ← #{relationship_type.to_s.humanize} → #{guardian.full_name} (#{status})"
    else
      puts "  ⏭️  Skipped relationship (already exists)"
    end
    relation
  end

  # Player 1 & 2 (Carlos and Sofia Pérez) - Children of Juan and Carmen Pérez
  create_relationship(players[0], parents[0], :father, :accepted)  # Carlos → Juan (Father)
  create_relationship(players[0], parents[3], :mother, :accepted)  # Carlos → Carmen (Mother)
  create_relationship(players[1], parents[0], :father, :accepted)  # Sofia → Juan (Father)
  create_relationship(players[1], parents[3], :mother, :accepted)  # Sofia → Carmen (Mother)

  # Player 3 (Diego Jiménez) - Child of Laura Jiménez
  create_relationship(players[2], parents[1], :mother, :accepted)  # Diego → Laura (Mother)

  # Player 4 (Valentina Castro) - Child of Miguel Castro
  create_relationship(players[3], parents[2], :father, :accepted)  # Valentina → Miguel (Father)

  # Player 5 (Mateo Vargas) - Child of Fernando Vargas
  create_relationship(players[4], parents[4], :father, :accepted)  # Mateo → Fernando (Father)

  # Example of pending invitation - Player 6 invited by a guardian but not accepted yet
  create_relationship(players[5], parents[1], :legal_guardian, :pending)  # Isabella → Laura (Pending)

  # =============================================================================
  # SUMMARY
  # =============================================================================
  puts "\n" + "=" * 80
  puts "✅ Seed data creation complete!"
  puts "=" * 80

  puts "\n📊 Summary:"
  puts "  • Super Admins: #{User.role_super_admin.count}"
  puts "  • Academy Owners: #{User.role_academy_owner.count}"
  puts "  • Academy Admins: #{User.role_academy_admin.count}"
  puts "  • Coaches: #{User.role_coach.count}"
  puts "  • Staff: #{User.role_staff.count}"
  puts "  • Parents: #{User.role_parent.count}"
  puts "  • Players: #{User.role_player.count}"
  puts "  • Total Users: #{User.count}"
  puts "  • Player-Guardian Links: #{PlayerGuardian.count} (#{PlayerGuardian.accepted.count} accepted, #{PlayerGuardian.pending.count} pending)"

  puts "\n🔐 Test Credentials:"
  puts "  All accounts use the same password: #{DEFAULT_SEED_PASSWORD}"
  puts "  Sample logins:"
  puts "  - Super Admin:    admin@diquis.com"
  puts "  - Academy Owner:  owner@diquis.com"
  puts "  - Coach:          coach.main@diquis.com"
  puts "  - Parent:         parent1@example.com"
  puts "  - Player:         player1@example.com"

  puts "\n💡 Password Configuration:"
  puts "   • Set via SEED_DEFAULT_PASSWORD env var"
  puts "   • Or in Rails credentials under seed.default_password"
  puts "   • Current: #{DEFAULT_SEED_PASSWORD.chars.first(4).join}#{'*' * (DEFAULT_SEED_PASSWORD.length - 4)}"

  puts "\n🚀 Ready to test! Visit http://localhost:3000"
  puts "=" * 80
  puts ""

else
  puts "⚠️  Skipping seeds in production environment"
  puts "   Create production data manually through the admin interface"
end

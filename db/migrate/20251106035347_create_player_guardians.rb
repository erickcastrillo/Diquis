class CreatePlayerGuardians < ActiveRecord::Migration[8.1]
  def change
    create_table :player_guardians, id: :uuid do |t|
      t.uuid :player_id, null: false
      t.uuid :guardian_id, null: false
      t.string :relationship_type, null: false
      t.integer :status, null: false, default: 0
      t.datetime :invited_at
      t.datetime :accepted_at
      t.text :notes

      t.timestamps
    end

    add_index :player_guardians, :player_id
    add_index :player_guardians, :guardian_id
    add_index :player_guardians, [ :player_id, :guardian_id ], unique: true, name: 'index_player_guardians_on_player_and_guardian'
    add_index :player_guardians, :status

    add_foreign_key :player_guardians, :users, column: :player_id
    add_foreign_key :player_guardians, :users, column: :guardian_id
  end
end

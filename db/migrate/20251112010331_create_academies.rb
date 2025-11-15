class CreateAcademies < ActiveRecord::Migration[8.1]
  def change
    create_table :academies, id: :uuid do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :subdomain, null: false
      t.string :status, null: false
      t.string :address
      t.string :phone
      t.string :slug
      t.timestamps
    end
    add_index :academies, :slug, unique: true
    add_index :academies, :email, unique: true
    add_index :academies, :subdomain, unique: true
  end
end

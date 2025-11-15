class AddAcademyToUsers < ActiveRecord::Migration[8.1]
  def change
    add_reference :users, :academy, null: true, default: nil, foreign_key: true, type: :uuid
  end
end

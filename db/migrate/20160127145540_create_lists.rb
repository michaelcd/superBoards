class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.integer :board_id, null: false
      t.string :title, null: false
      t.integer :ord, null: false
      t.boolean :archived, default: false

      t.timestamps null: false
    end
    add_index :lists, :board_id
  end
end

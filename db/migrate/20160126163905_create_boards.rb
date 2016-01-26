class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :title, null: false
      t.integer :author_id, null: false
      t.boolean :archived, default: false

      t.timestamps null: false
    end
    add_index :boards, :author_id
  end
end

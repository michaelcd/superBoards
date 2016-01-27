class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.integer :list_id, null: false
      t.integer :ord, null: false
      t.integer :author_id, null: false
      t.string :title, null: false
      t.text :description, default: ""
      t.boolean :archived, default: false

      t.timestamps null: false
    end
  end
end

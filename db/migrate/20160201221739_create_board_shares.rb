class CreateBoardShares < ActiveRecord::Migration
  def change
    create_table :board_shares do |t|
      t.integer :user_id, null: false
      t.integer :board_id, null: false
      t.timestamps null: false
    end
    add_index :board_shares, :user_id
    add_index :board_shares, :board_id
  end
end

class CreatePgSearchDocuments < ActiveRecord::Migration
  def self.up
    say_with_time("Creating table for pg_search multisearch") do
      create_table :pg_search_documents do |t|
        t.text :content #=> "the post title   the post body"
        t.belongs_to :searchable, :polymorphic => true, :index => true
        # t.integer :searchable_id  #=> 1
        # t.string :searchable_type #=> Post
        t.timestamps null: false
      end
    end
  end

  def self.down
    say_with_time("Dropping table for pg_search multisearch") do
      drop_table :pg_search_documents
    end
  end
end

class CreateTables < ActiveRecord::Migration
  def change
    create_table :users  do |t|
      t.string  :username
      t.string  :password_hash

      t.timestamps
    end

    create_table :surveys  do |t|
      t.string    :name
      t.belongs_to :user

      t.timestamps
    end

    create_table :choices  do |t|
      t.belongs_to  :question
      t.string  :content

      t.timestamps
    end

    create_table :votes  do |t|
      t.belongs_to :user
      t.belongs_to :choice
      t.belongs_to  :survey
      t.belongs_to  :question

      t.timestamps
    end

    create_table :questions  do |t|
      t.belongs_to :survey
      t.string  :content
      
      t.timestamps
    end
  end
end

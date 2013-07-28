class Choice < ActiveRecord::Base
  has_many  :votes
  belongs_to :question, dependent: :destroy
  # Remember to create a migration!
end

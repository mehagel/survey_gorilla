class Choice < ActiveRecord::Base
  has_many  :votes
  belongs_to :question
  # Remember to create a migration!
end

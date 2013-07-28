class Survey < ActiveRecord::Base

  has_many  :questions
  has_many  :votes
  belongs_to  :user, dependent: :destroy
  # Remember to create a migration!
end

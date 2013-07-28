class Question < ActiveRecord::Base
    has_many  :choices
    has_many  :votes
    belongs_to  :survey, dependent: :destroy
    
  # Remember to create a migration!
end

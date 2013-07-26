class Question < ActiveRecord::Base
    has_many  :choices
    has_many  :votes
    belongs_to  :survey
    
  # Remember to create a migration!
end

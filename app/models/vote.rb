class Vote < ActiveRecord::Base

  belongs_to  :user, dependent: :destroy
  belongs_to  :survey, dependent: :destroy
  belongs_to  :question, dependent: :destroy
  belongs_to  :choice, dependent: :destroy
  # Remember to create a migration!
end

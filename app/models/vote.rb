class Vote < ActiveRecord::Base

  belongs_to  :user, dependent: :destroy
  belongs_to  :survey, dependent: :destroy
  belongs_to  :question, dependent: :destroy
  belongs_to  :choice, dependent: :destroy
  accepts_nested_attributes_for :choice, :survey, :question
  # Remember to create a migration!
end

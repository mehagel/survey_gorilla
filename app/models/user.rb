class User < ActiveRecord::Base

  has_many :surveys
  # has_many :surveys, through: :votes
  has_many :votes

  # Remember to create a migration!
end

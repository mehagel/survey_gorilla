class User < ActiveRecord::Base
  has_many :surveys
  has_many :votes
  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.login(params)
    @user = User.find_by_username(params[:username])
    if @user.password == params[:password]
      return @user 
    else
      false
    end
  end
end

helpers do

  def current_user
    User.find(session[:id])
  end

  def logged_in?
    !session[:id].nil? 
  end

end

def logout
  session.clear
end 

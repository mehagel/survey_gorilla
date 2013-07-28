get '/' do
  @surveys = Survey.all
  erb :select_survey
end

get '/surveys/:id' do
  @survey = Survey.find(params[:id])

  erb :display_survey

end

get '/create_user' do
  erb :login
end 

post '/login_user' do
  user = User.where(username: params[:username]).first_or_create! { |user| user.password = params[:password]}
  p user.error_messages
  # redirect '/'
end

# post '/login' do 
#   session[:id] = User.login(params).id
#   redirect '/' 
# end 

get '/logout' do
  session.clear
  redirect '/'
end 

post '/vote' do



redirect '/'
end

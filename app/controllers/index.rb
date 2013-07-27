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

post '/create_user' do
  User.create(params)
  erb :index
end

post '/login' do 
  session[:id] = User.login(params).id
  redirect '/create_user' 
end 

get '/logout' do
  session.clear
  redirect '/'
end 

post '/vote' do
  @vote = Vote.new(params)
  # once the helper method current_user function is active this needs to be active
  # @vote.user_id = current_user.id
  @vote.save
  erb :index
end

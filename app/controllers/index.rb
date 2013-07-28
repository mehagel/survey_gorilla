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
  session[:id] = user.id
  # redirect '/'
  content_type :json
  {user: true}.to_json
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

  @vote = Vote.new(params)
  # once the helper method current_user function is active this needs to be active
  @vote.user_id = (session[:id])
  @vote.save
  erb :index

redirect '/'

end


post '/dummy' do
  @surveys = Survey.all
  @surveys_taken = Survey.find(Vote.find_by_user_id(session[:id]).survey_id)
  @surveys_created = Survey.find_by_user_id(session[:id])
  erb :profile
end

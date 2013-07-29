get '/' do
  erb :select_survey
  # if session[:id]
  #   @surveys = Survey.all
  #   erb :select_survey
  # else
  #   erb :select_survey
  # end
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
  # user.errors.each do |attr, msg|
  #   p attr
  #   p msg
  # end
  session[:id] = user.id
  content_type :json
  {user: user.username}.to_json
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
 survey = Survey.find(params.shift[1])
 params.each do |key, value|
    survey.votes.create(user_id: current_user.id, choice_id: value, question_id: key)
 end
 redirect '/'
end


post '/dummy' do
  @surveys = Survey.all
  @surveys_taken = Survey.find(Vote.find_by_user_id(session[:id]).survey_id)
  @surveys_created = Survey.find_by_user_id(session[:id])
  erb :profile
end

get '/bubbles' do
  erb :bubbles
end

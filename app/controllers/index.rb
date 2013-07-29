get '/' do
  if session[:id]
    if Survey.all.length > 0
      @surveys = true
      erb :select_survey
    else
      @surveys = false
      erb :select_survey
    end
  else
    erb :select_survey
  end

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
  content_type :json
  {user: user.username}.to_json
end

get '/logout' do
  session.clear
  redirect '/'
end 

post '/vote' do
 p params 
 # p params[:survey]
 # p params[:survey]["20"].each_key do |question, answer|
 # end
   
 # # choice = params[:choice]
 # # choice.map {|key, value| key = key.to_i}
 # # p choice
 # vote = current_user.votes.create()
 # p params[:question]
 
 # puts "GREGS TRY"
 # params[:question].each do |question|
 #  question.each do |k,v|
 #    puts v
  # end
 # end

 # params[:question].each do |question|
 #  question.each_key do |key|
 #    p question.fetch(key)
 #  end
 # end
 # p params[:question_id]
 # p params[:survey_id]
 # current_user.votes.create(params)
 # vote = current_user.votes.create(params)
 # erb :select_survey
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

get '/profile' do
  erb :profile
end

get '/' do
  @surveys = Survey.all
  # Look in app/views/index.erb

  erb :select_survey
end

get '/surveys/:id' do
  @survey = Survey.find(params[:id])

  # Look in app/views/index.erb
  erb :display_survey
endgit 

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
  


 p params
  erb :index
end

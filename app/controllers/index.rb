get '/' do
  # Look in app/views/index.erb
  erb :index 
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

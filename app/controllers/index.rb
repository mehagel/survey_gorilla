get '/' do
  @surveys = Survey.all
  # Look in app/views/index.erb
  erb :select_survey
end

get '/surveys/:id' do

  # Look in app/views/index.erb
  erb :display_survey
end


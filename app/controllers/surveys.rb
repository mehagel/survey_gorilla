get '/surveys/:id/results' do

  @survey = Survey.find_by_id(params[:id])
  # Look in app/views/index.erb
  erb :survey_results
end
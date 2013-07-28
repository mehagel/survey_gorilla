get '/surveys/:id/results' do

  # this breaks easily with the current implementation of current_user
  # @user = current_user # uncomment this line for real behavior
  @survey = Survey.find_by_id(params[:id])

  @user = @survey.user # comment this line for real behavior

  if @user == @survey.user
    erb :survey_results, :layout => :chart
  else
    erb :not_authorized
  end

end

get '/surveys/:id/results/chart' do

  p params

  content_type :json
  {stuff: true}.to_json
end
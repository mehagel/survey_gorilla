get '/surveys/:id/results' do

  # this breaks easily with the current implementation of current_user
  # @user = current_user
  @survey = Survey.find_by_id(params[:id])

  @user = @survey.user # comment this line out for real behavior

  if @user == @survey.user
    erb :survey_results
  else
    erb :not_authorized
  end

end
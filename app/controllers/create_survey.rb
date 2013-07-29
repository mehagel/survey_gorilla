get '/create_survey' do
  # @survey = Survey.find(params[:id])
  erb :create_survey
end

post '/create_survey' do
  p params
  survey = current_user.surveys.create(name: params[:name])
  # params[:questions].each do |question|
  #   the_question = survey.questions.create(content: question[1][:content])
  #   question[1][:choice].each do |choice|
  #     the_question.choices.create(content: choice)
  #   end
  # end
end


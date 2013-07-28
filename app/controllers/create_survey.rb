get '/create_survey' do
  # @survey = Survey.find(params[:id])
  erb :create_survey
end

post '/create_survey' do
  new_survey = current_user.surveys.create(params[:survey])
  new_question = new_survey.questions.create(params[:question])
  new_question.choices.create(params[:choiceone])
  new_question.choices.create(params[:choicetwo])
  new_question.choices.create(params[:choicethree])
redirect "/"  
end


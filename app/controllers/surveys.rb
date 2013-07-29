get '/surveys/:id/results' do

  # this breaks easily with the current implementation of current_user
  @user = current_user # uncomment this line for real behavior
  @survey = Survey.find_by_id(params[:id])
  # @user = @survey.user # comment this line for real behavior
  if @user == @survey.user
    erb :survey_results, :layout => :chart
  else
    erb :not_authorized
  end
end

get '/surveys/:survey_id/results/get' do
  survey = Survey.find_by_id(params[:survey_id])
  results = {}
  survey.questions.each do |question|
    results[question.content] = {}
    question.choices.each do |choice|
      results[question.content][choice.content] = choice.votes.length
    end
  end
  content_type :json
  {results: results}.to_json
end

post '/get_surveys' do
  surveys = Survey.all
  array = []
  surveys.each do |survey|
    array << survey.id
  end
  content_type :json
  if surveys.length > 0
    {surveys: array}.to_json
  else
    {surveys: false}.to_json
  end
end

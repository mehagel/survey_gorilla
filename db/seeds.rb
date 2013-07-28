nick = User.create(username: "nick", password: "1")

my_survey = nick.surveys.create(name: "My Survey")

my_question = my_survey.questions.create(content: "Favorite Color?")
blue_choice = my_question.choices.create(content: 'blue')
red_choice = my_question.choices.create(content: 'red')
green_choice = my_question.choices.create(content: 'green')

blue_choice.votes.create(user_id: 1, survey_id: 1, question_id: 1)
blue_choice.votes.create(user_id: 1, survey_id: 1, question_id: 1)
blue_choice.votes.create(user_id: 1, survey_id: 1, question_id: 1)


my_question2 = my_survey.questions.create(content: "Favorite Fruit?")
apple_choice = my_question2.choices.create(content: 'apple')
orange_choice = my_question2.choices.create(content: 'orange')
grape_choice = my_question2.choices.create(content: 'grape')

orange_choice.votes.create(user_id: 1, survey_id: 1, question_id: 2)
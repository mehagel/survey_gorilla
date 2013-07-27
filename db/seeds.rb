nick = User.create(username: "nick", password: "1")
my_survey = nick.surveys.create(name: "My Survey")
my_question = my_survey.questions.create(content: "Favorite Color?")
my_question.choices.create(content: 'blue')
my_question.choices.create(content: 'red')
my_question.choices.create(content: 'green')


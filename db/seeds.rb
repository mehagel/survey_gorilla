test_user = User.create(username:"bob", password_hash: "password")
test_survey = test_user.surveys.create(name: "Best survey")
test_question = test_survey.questions.create(content: "What's the color of a carrot")
test_choice = test_question.choices.create(content: "Orange")
test_choice2 = test_question.choices.create(content: "Red")
 
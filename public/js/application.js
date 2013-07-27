$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()


//Add New Question
$('#add_question').on('click', function() {
  console.log('hello')
   $('#add_another_question').clone().appendTo('#partial');
});

});



  // $('#add-another-card').on('click', function() {
  //   $(".add-card").clone().toggle().prependTo("#add-more-cards");
  // });

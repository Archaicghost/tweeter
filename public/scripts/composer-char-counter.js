$(document).ready(function() {

  let textarea = $('textarea');
  let counter = textarea.siblings('.counter');

  textarea.on('input', function(){

    let textarea = $(this)
    let charIn = textarea.val().length;
    let charCount = 140 - charIn;

    counter.text(charCount)

    if (charCount <= 0) {
      counter.css('color', 'red');
    } else { 
      counter.css('color', 'black');
    }

  })
});
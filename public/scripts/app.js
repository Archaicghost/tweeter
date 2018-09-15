
$(function () {
//Handle submit event emited by form
//prevent default behavour (event.preventDefualt()
//send query string to body of AJAX post request (.serialize() turns data into query sting)
//use console log to validate ajax request (Network Tab)

$('#tweetForm').on('submit', function(event) {
    event.preventDefault();

    // 1. Grab the content of the form
    let formData = $('#tweetForm').serialize();
    let entry = $('#textarea').val();

    console.log(entry)
    if (entry === null || entry === ''){
      alert('text too short!')
    }if (entry.length > 140){
      alert('text too long!')
    } else {
    // 2. Submit using ajax
    $.ajax('/tweets', {
      method: 'POST',
      data: formData,
    }).then(function(success) {
      // 3. Clear the form
      // $('#tweetForm input').val('');
      // $('#tweetForm').empty();
        console.log('succesful')
      // 4. Make sure the new tweet shows
      return $.ajax('/tweets');
    }).then(renderTweets);
    }
  })

function loadTweets(){
let $submit = $('#new-tweet-text');

  $.ajax('/tweets', { method: 'GET' })
  .then(function (myJson) {
    console.log('Success: ', myJson);
    $submit.replaceWith(myJson);

  });
}
loadTweets()






  
  function renderTweets(tweets) {

    for (let userData in tweets) {

    let tweet = tweets[userData];
    let newComment = createTweetElement(tweet)
     
    $('#tweets-container').prepend(newComment)

    }
    
  }
  
  function createTweetElement(tweet) {
    //   console.log(tweet.user.name)
    let $tweet = $('<article>').addClass('tweet');
    let $commentHeader = $('<header>').addClass('commentHeader');
    let $avatar = $('<img>').addClass('avatar').attr("src", tweet.user.avatars.small);
    let $name = $('<name>').addClass('name').text(tweet.user.name); 
    let $userId = $('<userId>').addClass('userId').text(tweet.user.handle);
    let $tweetText= $('<div>').addClass('tweetText').text(tweet.content.text);
    let $timeStamp= $('<span>').addClass('timeStamp').text(tweet.created_at);
    let $commentFooter = $('<footer>').addClass('commentFooter');
    let $hiddenFlag = $('<img>').addClass('hiddenIcon').attr("src", "/images/flag.png");
    let $hiddenHeart = $('<img>').addClass('hiddenIcon').attr("src", "/images/heart.png");
    let $hiddenReblog = $('<img>').addClass('hiddenIcon').attr("src", "/images/reblog.png");

    $commentHeader.append($avatar, $name, $userId)

    $commentFooter.append($timeStamp, $hiddenReblog, $hiddenHeart, $hiddenFlag )
    
    $tweet.append($commentHeader, $tweetText, $commentFooter)

    return $tweet;

   
  }

//   console.log(createTweetElement(data)); // to see what it looks like
//   $('#tweets-container').append($tweet);
//   renderTweets(data);

// $ is a shortcut for document.getElementById().

});
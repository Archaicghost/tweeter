$(function () {

  $('#error1').hide();
  $('#error2').hide();

//Toggle compose tweet with button
    $( ".compose" ).click(function() {
      $( ".new-tweet" ).slideToggle( "slow" );
        textarea.focus()
    });
 
  //make new tweet with ajax and compose tweet input
  $('#tweetForm').on('submit', function(event) {
    event.preventDefault();
  
  // Grab the content of the tweet textarea
  let formData = $('#tweetForm').serialize();
  let entry = $('#textarea').val();
      
    if (entry === null || entry === ''){
        
      $('#error1').show('fast');
      $('#error2').hide();
        
    }else if (entry.length > 140){
        
      $('#error2').show('fast');
      $('#error1').hide();
       
    } else {
    //Submit using ajax
      $.ajax('/tweets', {
      method: 'POST',
      data: formData,
      }).then(function() {
     //Clear the form
      $('.counter').text(140)
      $('#textarea').val('');
      $('#textarea').empty();
      $('#error1').hide();
      $('#error2').hide();

    //Make sure the new tweet shows
        return $.ajax('/tweets');
      }).then(renderTweets);
    }
  })
  
  //Loading new tweets and rendering previous tweets to page
  function loadTweets(){
  let $submit = $('.new-tweet-text');
 
  $.ajax('/tweets', { method: 'GET' })
    .then(function (myJson) {
      renderTweets(myJson)
        $submit.replaceWith(myJson);
    });
  }
  loadTweets()
  
  //rendering tweets submitted
  function renderTweets(tweets) {
  
    for (let userData in tweets) {
  
    let tweet = tweets[userData];
    let newComment = createTweetElement(tweet)
  //adding tweet to top of list
      $('.tweets-container').prepend(newComment)
    }
  }
  renderTweets()
  
  //creating composed tweets with user info and textarea input
  function createTweetElement(tweet) {
  
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
      //appending to document
      $commentHeader.append($avatar, $name, $userId)
      $commentFooter.append($timeStamp, $hiddenReblog, $hiddenHeart, $hiddenFlag )
      $tweet.append($commentHeader, $tweetText, $commentFooter)
  
        return $tweet;
  }
  
  

  
  });
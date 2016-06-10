$(document).ready(function(){
  $('button').on('click', function (){
    console.log("hello!");
    var message = $('textarea').val();
    console.log(message);
    var old = $('#chat-box').html();
    console.log(old);
    return $('#newMessage').html(old + '<p>' + message + '</p>' );
  });
});

$(document).ready(function(){
  brewskiChatski.init();
});


var brewskiChatski = {
  url: "http://tiny-tiny.herokuapp.com/collections/brewskiChatski",
  chatArr: [],
  init: function () {
    brewskiChatski.styling();
    brewskiChatski.events();
  },
  styling: function () {
    // setInterval(function (){
    //   brewskiChatski.readMessage();
    // },2000)
  },
  events: function () {
    // creates the form id in tinytiny
    $('form').on('submit', function (event){
      event.preventDefault();
      console.log("hello!");
      var message = {
        chat: $('#newMessage').val(),
        username: $(".username").val(),
      };
      brewskiChatski.createMessage(message)
      $('#newMessage').val('');
      });
      //clearing the chat id from the 'x' button
      $('#chat-box').on('click', 'a', function (event){
        event.preventDefault();
        var clearChat = $(this).parent().data('id');
        console.log("cleared", clearChat);
        $(this).parent().remove();
        brewskiChatski.deleteMessage(clearChat);
      })
},

createMessage: function(whateverYouWantGiveMe){
  $.ajax({
    url: brewskiChatski.url,
    method: 'POST',
    data: whateverYouWantGiveMe,
    success: function (data){
      console.log("yes!", data);
      //trying to save message to the chat-box
      $('#chat-box').append(`<p data-id="${data._id}"><a href=""> <i class="fa fa-beer" aria-hidden="true"></i></a><span>${data.username} : </span>${data.chat}</p>`);
      brewskiChatski.chatArr.push(data);
    },
    error: function () {
      console.log("not yet..", err );
    }
  })
},

readMessage: function (){
  $.ajax({
    url: brewskiChatski.url,
    method: 'GET',
    success: function (data){
      console.log("yes!", data);
      data.forEach (function (element) {
        $('#chat-box').append(`<p data-id="${element._id}"><a href="#"><i class="fa fa-beer" aria-hidden="true"> </i></a>${element.chat}</p>`);
        brewskiChatski.chatArr.push(element);
      })
    },
    error: function () {
      console.log("not yet..", err );
    }
  })
},

updateMessage: function (data){
  $.ajax({
    url: brewskiChatski.url,
    method: 'PUT',
    data: data,
    success: function (data){
      console.log("yes!",data );
    },
    error: function (err) {
      console.log("not yet..", err );
    }
  })
},

deleteMessage: function (chatID){
  var deleteChat = brewskiChatski.url + '/' + chatID;
  $.ajax({
    url: deleteChat,
    method: 'DELETE',
    success: function (){
      console.log("we did it!", "");
      // brewskiChatski.readMessage();
    },
    error: function (err) {
      console.log("not yet..", err );
    }
  })
},

}

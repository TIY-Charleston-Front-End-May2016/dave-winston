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
    brewskiChatski.getChatRoom();
  },
  events: function () {

      $('button').on('click', function (){
        console.log("hello!");
        var message = {
          chat: $('textarea').val()
        }
        // brewskiChatski.createMessage(message)
        // $('#chat-box').append(`<p data-id`)$('#newMessage').html(old + '<p>' + message + '</p>' );
      });




    // // creating a new message and saving it the chat-box
    // $('form').on('submit', function (){
    //   event.preventDefault();
    //   var newMessage = {
    //     chat: $(this).children('input').val();
    //   }
    //   brewskiChatski.createMessage(newMessage)
    //   $(this).children('input').val();
    //   })
    // });
    //
    // // trying to refresh page each second
    // <brewskiChatski onload = "setInterval('chat.update()',1000)">
},

createMessage: function (){
  $.ajax({
    url: brewskiChatski.url,
    method: 'POST',
    data: ,
    success: function (){
      console.log("yes!", );
      //trying to save message to the chat-box
      $('form textarea').append(`<li data-id="${data._id}"><a href=""> x</a>${data.chat}</li>`);
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
    data: ,
    success: function (){
      console.log("yes!");
    },
    error: function () {
      console.log("not yet..", err );
    }
  })
},

updateMessage: function (){
  $.ajax({
    url: brewskiChatski.url + "/" + '',
    method: 'PUT',
    data: ,
    success: function (){
      console.log("yes!", );
    },
    error: function () {
      console.log("not yet..", err );
    }
  })
},

deleteMessage: function (){
  $.ajax({
    url: deleteUrl,
    method: 'DELETE',
    data: ,
    success: function (){
      console.log("yes!", );
    },
    error: function () {
      console.log("not yet..", err );
    }
  })
},

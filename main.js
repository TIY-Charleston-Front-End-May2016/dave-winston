$(document).ready(function(){
  brewskiChatski.init();
});


var brewskiChatski = {
  url: "http://tiny-tiny.herokuapp.com/collections/brewskiChatski",
  chatArr: [],
  init: function () {
    brewskiChatski.styling();
    brewskiChatski.events();
    brewskiChatski.readMessage();
  },
  styling: function () {
    setInterval(function (){
      brewskiChatski.readNewMessages();
    },2000)

  },
  events: function () {
    // creates the form id in tinytiny
    $('form').on('submit', function (event){
      event.preventDefault();
      console.log("hello!");
      var message = {
        chat: $('#newMessage').val(),
        username: $(".username").val(),
        timestamp: new Date().getTime()
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
      data.sort(brewskiChatski.sortMessage).forEach (function (element) {
        $('#chat-box').append(`<p data-id="${element._id}"><a href="#"><i class="fa fa-beer" aria-hidden="true"> </i></a><span>${element.username} : </span>${element.chat}</p>`);
        brewskiChatski.chatArr.push(element);
      })
    },
    error: function () {
      console.log("not yet..", err );
    }
  })
},

readNewMessages: function () {
  $.ajax({
    url: brewskiChatski.url,
    method: 'GET',
    success: function (data){
      var chatIDs = brewskiChatski.chatArr.map( function(x){ return x._id; } );
      var dataIDs = data.map( function(x){ return x._id; } );
      data.forEach (function (element) {
        if (chatIDs.indexOf(element._id)<0){
          $('#chat-box').append(`<p data-id="${element._id}"><a href="#"><i class="fa fa-beer" aria-hidden="true"> </i></a><span>${element.username} : </span>${element.chat}</p>`);
          brewskiChatski.chatArr.push(element);
        }
      });
      var idsToRmv = [];
      brewskiChatski.chatArr.forEach (function (element, idx){
        if (dataIDs.indexOf(element._id)<0){
          $('p[data-id="' + element._id + '"]').remove();
          idsToRmv.push(idx);
        }
      });
    },
    error: function () {
      console.log("not yet..", error );
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

sortMessage: function(a,b){
  return a.timestamp - b.timestamp;
}

}

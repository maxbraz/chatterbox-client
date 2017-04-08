// ********************** EXAMPLE POST MESSAGE **********************************
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
// $(document).ready(function() {
//  app.init();
// });

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

var app = {};

app.init = () => {
  app.fetch();
};

app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

var messageText = document.getElementById('messageText');
console.log('this is the message text: ', messageText);

app.send = (message) => {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('this is the children length ', $('#chats').children().length);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = () => {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {},
    contentType: 'application/json',
    success: function (data) {
      for (var i = data.results.length - 1; i >= 0; i--) {
        $('#chats').append('<div>' + data.results[i].username + ': ' + data.results[i].text + '</div>');
      }
      console.log('chatterbox: Messages received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message', data);
    }
  });
};

app.clearMessages = () => {
  $('#chats').empty();
};

app.renderMessage = (message) => {
  // app.send(message);
  $('#chats').append('<div>' + message.text + '</div>');
};

app.init();





















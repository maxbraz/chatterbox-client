// YOUR CODE HERE:

//********************** EXAMPLE POST REQUEST  *********************************
//$.ajax({
  // This is the url you should use to communicate with the parse API server.
  //   url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
  //   type: 'POST',
  //   data: JSON.stringify(message),
  //   contentType: 'application/json',
  //   success: function (data) {
  //     console.log('chatterbox: Message sent');
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to send message', data);
  //   }
  // });

// ********************** EXAMPLE POST MESSAGE **********************************
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};


var app = {};

app.init = () => {

};

app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

app.send = (data) => {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message', data);
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
      _.each(data.results, function(message) {
        $('.messages').append('<p>' + message.text + '</p>');
      });
      console.log('chatterbox: Message received', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message', data);
    }
  });
};

app.clearMessages = () => {

};

app.fetch();
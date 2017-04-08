$(document).ready(function() {
  app.init();

  $('#postMessage').on('click', function(event) {
    event.preventDefault();
    console.log('we got the click');
    var $text = $('#messageText').val();
    var $url = $(location).attr('href');
    var $username //= get the username from the url
    var $roomname //= get the room from the url

    var $message = {
      username: $username,
      text: $text,
      roomname: $roomname
    }

    app.send($message);
  });

});

var app = {};

app.init = () => {
  app.fetch();
  console.log(app.fetch())
};

app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

// Two lines below are for Message implementation


// Dropdown functionality ______________________________________________

var myFunction = () => {
  document.getElementById('myDropdown').classList.toggle('show');
}

window.onclick = function(event) {
  if (event.target.matches('#lobby')) {
    app.fetch( 'lobby' )
  } else if (event.target.matches('#China')) {
    app.fetch('China') 
  } else if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// window.onclick = function(event) {
//   if (event.target.matches('#lobby')) {
//     app.fetch()
//   }
// }
// window.onclick = function(event) {
//   if (event.target.matches('#spaceball')) {
//     app.clearMessages();
//   }
// }
// End DropDown functionality ______________________________________________

app.send = (message) => {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      app.renderMessage(message);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = ( nameOfRoom ) => {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {},
    contentType: 'application/json',
    success: function (data) {
      // nameOfRoom = nameOfRoom || data.results;
      var filteredArr = _.filter(data.results, function(dataObj) {
        return dataObj.roomname === nameOfRoom
      });

      app.clearMessages();

      for (let message of filteredArr) {
        $('#chats').prepend('<div>' + message.username + ': ' + message.text + ': ' + message.roomname + '</div>' + '<br>');
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

// var message = {
//   text: 'Yo',
//   username: 'Jonathan',
//   room: 'lobby'
// }

app.renderMessage = (message) => {
  $('#chats').prepend('<div>' + message.text + '</div>');
};

// JT creates Add Room functionality to add to #roomSelect Div
app.renderRoom = (makeRoom) => {
  console.log('<div>' + makeRoom + '</div>');
  $('#roomSelect').append('<div>' + makeRoom + '</div>');
}


// if lobby was selected from dropDown
  // fetch all data
  // app.fetch = (  'room' )
    // newArr = [];
    // filter all objects with roomname === lobby.  //('room')













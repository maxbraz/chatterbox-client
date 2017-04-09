$(document).ready(function() {
  app.init();

  $('#postMessage').on('click', function(event) {
    event.preventDefault();
    var $text = $('#messageText').val();
    var $url = $(location).attr('href');
    var $username = $url.slice($url.indexOf('=') + 1, $url.indexOf('#'));
    var $roomname = $url.slice($url.indexOf('#') + 1);

    var $message = {
      username: $username,
      text: $text,
      roomname: $roomname
    }
    app.send($message);
  });

  $('#CreateRoom').on('click', function(event) {
    console.log('we got the click');
    app.renderRoom( prompt('new roomname here: ') )
  });

  $('#myDropdown').click(function() {
    console.log('What did we click?',this.id)
    app.fetch (this.id);
  });

});

var app = {};
app.init = () => {
  app.fetch('lobby');
};

app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

// Two lines below are for Message implementation


// Dropdown functionality ______________________________________________

var myFunction = () => {
  document.getElementById('myDropdown').classList.toggle('show');
}

window.onclick = function(event) {
  if (event.target.matches('#lobby')) {
    app.fetch( 'lobby' );
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

app.encodeHTML = (s) => {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

app.fetch = ( nameOfRoom ) => {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {"order":"-createdAt", "limit": 1000},
    contentType: 'application/json',
    success: function (data) {
      // nameOfRoom = nameOfRoom || data.results;
      var filteredArr = _.filter(data.results, function(dataObj) {
        return dataObj.roomname === nameOfRoom;
      });

      app.clearMessages();

      for (let message of filteredArr) {

        var text = app.encodeHTML(message.text);   
        console.log(text)
        var username = app.encodeHTML(message.username);
        console.log(username)
        var roomname = app.encodeHTML(message.roomname);
        console.log(roomname)

        $('#chats').append('<div>' + username + ': ' + text + ': ' + roomname + '</div>' + '<br>');
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
  $('#chats').append('<div>' + message.username + ': ' + message.text + ': ' + message.roomname + '</div>');
};

app.renderRoom = (roomName) => {
  $('#myDropdown').append('<a href=#' + roomName + ' id=' + roomName + '>' + roomName + '</a>');
};












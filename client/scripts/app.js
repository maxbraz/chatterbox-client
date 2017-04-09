$(document).ready(function() {
  app.init();

  $('#send').on('click', function(event) {
    event.preventDefault();
    let $text = $('#messageText').val();
    let $url = $(location).attr('href');
    let $username = $url.slice($url.indexOf('=') + 1, $url.indexOf('#'));
    let $roomname = $url.slice($url.indexOf('#') + 1);

    let $message = {
      username: $username,
      text: $text,
      roomname: $roomname
    };

    app.send($message);
    app.handleSubmit();
    $('#messageText').val('');
  });

  $('#CreateRoom').on('click', function(event) {
    app.renderRoom(prompt('new roomname here: '));
  });

  $('#roomSelect').on('click', function() {
    app.fetch(this.id);
  });

  $('#chats').on('click', '.username', function() {
    $(this).css('color', 'blue');
    app.handleUsernameClick();
  });
});

let app = {};

app.friends = {};

app.init = () => {
  app.fetch('lobby');
};

app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

let myFunction = () => {
  document.getElementById('roomSelect').classList.toggle('show');
};

window.onclick = function(event) {
  if (event.target.matches('#lobby')) {
    app.fetch('lobby');
  } else if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

app.send = (message) => {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      app.renderMessage(message);
      console.log('chatterbox: Message sent');
    },
    error: function(data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.encodeHTML = (s) => {
  if (s === undefined) {
    return;
  }
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

app.fetch = (nameOfRoom) => {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: { 'order': '-createdAt', 'limit': 1000 },
    contentType: 'application/json',
    success: function(data) {
      nameOfRoom = nameOfRoom || 'lobby';
      let filteredArr = _.filter(data.results, function(dataObj) {
        return dataObj.roomname === nameOfRoom;
      });

      app.clearMessages();

      for (let message of filteredArr) {
        let text = app.encodeHTML(message.text);
        let username = app.encodeHTML(message.username);
        let roomname = app.encodeHTML(message.roomname);

        $('#chats').append('<div>' + '<span>' + username + ': ' + '</span>' + text + ': ' + roomname + '</div>' + '<br>');
        $('span').addClass('username');
      }
      console.log('chatterbox: Messages received');
    },
    error: function(data) {
      console.error('chatterbox: Failed to retrieve message', data);
    }
  });
};

app.clearMessages = () => {
  $('#chats').empty();
};

app.renderMessage = (message) => {
  $('#chats').prepend('<div>' + '<span>' + message.username + ': ' + '</span>' + message.text + ': ' + message.roomname + '</div>');
  $('span').addClass('username');
  $('span').addClass('col-lg-6');
};

app.renderRoom = (roomName) => {
  $('#roomSelect').append('<a href=#' + roomName + ' id=' + roomName + '>' + roomName + '</a>');
};

app.handleUsernameClick = (username) => {
  app.friends[username] = username;
};

app.handleSubmit = () => {

};
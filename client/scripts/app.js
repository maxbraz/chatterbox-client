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

// Two lines below are for Message implementation
var test = () => {
  var postedMessage = document.getElementsById('#messageText').value;
  console.log('this is the message text: ', postedMessage, 'hello' );

}

// Dropdown functionality ______________________________________________

var myFunction = () => {
  document.getElementById('myDropdown').classList.toggle('show');
}
window.onclick = function(event) {
  if (event.target.matches('#lobby')) {
    app.fetch()
  } else if (event.target.matches('#spaceball')) {
    app.clearMessages(); 
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
      //console.log(data.results).   <-- shows me roomName
      for (var i = data.results.length - 1; i >= 0; i--) {
        $('#chats').append('<div>' + data.results[i].username + ': ' + data.results[i].text + ': ' + data.results[i].roomname + '</div>');
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

var message = {
  text: 'Yo';
}
app.renderMessage = (message) => {
  // app.send(message);
  $('#chats').append('<div>' + message.text + '</div>');
};

// JT creates Add Room functionality to add to #roomSelect Div
app.renderRoom = (makeRoom) => {
  console.log('<div>' + makeRoom + '</div>');
  $('#roomSelect').append('<div>' + makeRoom + '</div>');
}

app.init();



















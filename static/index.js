$(() => {
  $("#submit").click(handleClick);
});
  
const handleClick = () => {
  var artist_name = $('#artist').val();
  var album_name = $('#album').val();
  post('/', {
    artist: artist_name,
    album: album_name
  }).then(data => {
    if (data.id) {
      return post('/', {id: data.id});
    } else {
      throw "nothing found for " + artist_name + " " + album_name;
    }
  }).then(data => {
    if (data.url) {
      $("body").append('<p>' + data.url + '</p>');
    } else {
      throw "nothing found for " + data.id;
    }
  }).catch(alert);
};

function post(host, data) {
  return new Promise( function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", host, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    //Call a function when the state changes.
    xhr.onreadystatechange = function() {
      if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(JSON.parse(this.responseText));
      } else if (this.status != 200) {
        reject("Request failed, response code: " + this.status);
      }
    }
    xhr.send(URLEncode(data));
  })
}

function URLEncode(data) {
  var str = [];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
  }
  return str.join('&');
}

$(() => {
  $("#submit").click(handleClick);
});
  
const handleClick = () => {
  var artist_name = $('#artist').val();
  var album_name = $('#album').val();
  $.post('/', {
    artist: artist_name,
    album: album_name
  }).then(data => {
    if (data.id) {
      return $.post('/', {id: data.id});
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
}

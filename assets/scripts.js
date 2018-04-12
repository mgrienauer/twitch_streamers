
$(document).ready(function(){

  //create array to store list of streamer usernames
  let streamerArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "T90Official", "theviperaoc", "RobotCaleb", "noobs2ninjas"];

  //create function that updates streamer's channel info in html
  function ajaxChannelCall(streamer){
    //make streamer toLowerCase
    streamer = streamer.toLowerCase();
    //make ajax call to retrieve streamer's channel info
    $.ajax({
     type: 'GET',
     url: 'https://api.twitch.tv/kraken/channels/' + streamer,
     dataType: 'json',
     headers: {
       'Client-ID': 'ieym1jzi0ljgp9ntvvw0dcuxaw4hzf'
     },
     success: function(data) {
       //console.log(data);
       //create variable to store streamer div
       let streamerDiv = `
        <div class="streamer-div streamer-offline" id=${streamer}>
          <i class="fa fa-twitch fa-2x icon-offline" id=${streamer}-icon></i>
          <img src=${data.logo} class='streamer-logo'></img>
          <a href=${data.url} target='#blank' class='streamer-name'> <h3>${data.display_name}</h3> </a>
          <h3 class='streamer-followers'> Followers: ${data.followers} <h3>
        </div>
       `;
       //append the streamer's div to html doc
       $('.wrapper').append(streamerDiv);
     },
    });

    return 1;
  }

  //create function that take a streamer username as input and returns json data from twitch api
  function ajaxStreamCall(streamer){
    //make streamer lower case
    streamer = streamer.toLowerCase();
    //make ajax call with streamer name to check stream status
    $.ajax({
     type: 'GET',
     url: 'https://api.twitch.tv/kraken/streams/' + streamer,
     dataType: 'json',
     headers: {
       'Client-ID': 'ieym1jzi0ljgp9ntvvw0dcuxaw4hzf'
     },
     // log data to console if success
     success: function(data) {
       console.log(data);
       if (data.stream !== null){
         updateStreamData();
       }

      //create function that takes twitch api data and updates html on page
      function updateStreamData(){
        //create vars to store status data and viewers
        let streamStatus = data.stream.channel.status;
        let streamViewers = data.stream.viewers;
        //remove streamer followers
        $(`#${streamer} .streamer-followers`).remove();
        //append stream status and current viewers
        $('#'+streamer).append(`<p class='stream-status'>${streamStatus}</p>`);
        $('#'+streamer).append(`<h3 class='stream-viewers'>Viewers:<br/>${streamViewers}`);
        $(`#${streamer}`).toggleClass('streamer-offline streamer-online');
        $(`#${streamer}-icon`).toggleClass('icon-offline icon-online');
      }
     }
    });
  }

  //make a function that takes a streamer id as input and returns a special streamer div
  function searchedStreamerDiv(){
    let streamer = $('#streamer-search').val().toLowerCase();
    //check if streamer is already in wrapper
    if( $(`#${streamer}`).length > 0 ){
      //hide all streamer divs
      $('.streamer-div').hide();
      //show searched streasmer div
      $(`#${streamer}`).show();
    } else if (ajaxChannelCall(streamer) == 1){
      //if no streamer found, change palceholder text
      $('#streamer-search').attr('placeholder', 'Streamer not found');
    } else {
      ajaxChannelCall(streamer);
      ajaxStreamCall(streamer);
    }
  }

  //make event handler for when online button clicked
  $('.btn-online').click(function(){
    //show all online players
    $('.streamer-online').show();
    //hide all offline palyers
    $('.streamer-offline').hide();
  });

  //make event handler for when offline button clicked
  $('.btn-offline').click(function(){
    //show all offline players
    $('.streamer-offline').show();
    //hide all online palyers
    $('.streamer-online').hide();
  });

  //make event handler for when all button is clicked
  $('.btn-all').click(function(){
    //show all online players
    $('.streamer-online').show();
    //show all offline palyers
    $('.streamer-offline').show();
  });

  //add event handler for when search button pressed
  $('.btn-search').click(searchedStreamerDiv);

  //for each streamer, make an ajax request and create an html div with relevant info
  streamerArr.forEach(ajaxChannelCall);
  streamerArr.forEach(ajaxStreamCall);



});

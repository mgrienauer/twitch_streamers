$(document).ready(function(){

  //create array to store list of streamer usernames
  let streamerArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "T90Official", "theviperaoc", "RobotCaleb", "noobs2ninjas"];

  //create function that updates streamer's channel info in html
  function ajaxChannelCall(streamer){
    //make ajax call to retrieve streamer's channel info
    $.ajax({
     type: 'GET',
     url: 'https://api.twitch.tv/kraken/channels/' + streamer,
     headers: {
       'Client-ID': 'ieym1jzi0ljgp9ntvvw0dcuxaw4hzf'
     },
     success: function(data) {
       console.log(data);
       //create variable to store streamer div
       let streamerDiv = `
        <div class="streamer-div streamer-offline">
          <i class="fa fa-twitch fa-2x icon-offline"></i>
          <img src=${data.logo} class='streamer-logo'></img>
          <a href=${data._links.self} class='streamer-name'> <h3>${data.display_name}</h3> </a>
          <h3 class='streamer-followers'> Followers: ${data.followers} <h3>
        </div>
       `;

       $('.wrapper').append(streamerDiv);
     }
    });


  }


  //create function that take a streamer username as input and returns json data from twitch api
  function ajaxStreamCall(streamer){
    //make ajax call with streamer name to check stream status
    $.ajax({
     type: 'GET',
     url: 'https://api.twitch.tv/kraken/streams/' + streamer,
     headers: {
       'Client-ID': 'ieym1jzi0ljgp9ntvvw0dcuxaw4hzf'
     },
     // log data to console if success
     success: function(data) {
       //console.log(data);
       //create function that takes twitch api data and updates html on page
       function updateStreamData(){
         //update html on streamer div to display current stream info
         if (data.stream !== null){

         }
       }
     }
    });
  }

  //for each streamer, make an ajax request and create an html div with relevant info
  streamerArr.forEach(ajaxChannelCall);







});

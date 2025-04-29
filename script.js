var url = "https://api.minetools.eu/ping/ForgedSeas.cubed.pro/25565";

$.getJSON(url, function(r) {
    //data is the JSON string
 if(r.error){
    $('#rest').html('Server Offline');
   return false;
 }
var pl = '';
 if(r.players.sample.length > 0 ){
   $(document).ready(function() {
      var list = "";
      for(i=0; i<r.players.sample.length; i++){
         list+="<li>"+r.players.sample[i].name+"</li>"
      }
      $("#playerlist").append(list)
   })
 }
  $('#rest').html(r.description.replace(/§(.+?)/gi, '')+'<br><b>Players Online:</b> '+r.players.online+pl);
 $('#favicon').attr('src', r.favicon);

});
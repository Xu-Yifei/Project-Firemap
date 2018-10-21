var map;
   var marker;
   var infowindow;
   var messagewindow;

   function initMap() {
     var home = {lat: -34.397, lng: 150.644};
     map = new google.maps.Map(document.getElementById('map'), {
       center: home,
       zoom: 4.5
     });

     infowindow = new google.maps.InfoWindow({
       content: document.getElementById('form')
     });

     messagewindow = new google.maps.InfoWindow({
       content: document.getElementById('message')
     });

     google.maps.event.addListener(map, 'click', function(event) {
       marker = new google.maps.Marker({
         position: event.latLng,
         map: map
       });


       google.maps.event.addListener(marker, 'click', function() {
         infowindow.open(map, marker);
         form.hidden = false;
       });
     });
   }

   function saveData() {
     var location = escape(document.getElementById('Location').value);
     var type = document.getElementById('type').value;
     var latlng = marker.getPosition();
     var url = 'phpsqlinfo_addrow.php?Location=' + location +
               '&lat=' + latlng.lat() + '&lng=' + latlng.lng() + '&type=' + type;

     downloadUrl(url, function(data, responseCode) {

       if (responseCode == 200 && data.length <= 1) {
         infowindow.close();
         messagewindow.open(map, marker);
       }
     });
   }

   function downloadUrl(url, callback) {
     var request = window.ActiveXObject ?
         new ActiveXObject('Microsoft.XMLHTTP') :
         new XMLHttpRequest;

     request.onreadystatechange = function() {
       if (request.readyState == 4) {
         request.onreadystatechange = doNothing;
         callback(request.responseText, request.status);
       }
     };

     request.open('GET', url, true);
     request.send(null);
   }

   function doNothing () {
   }

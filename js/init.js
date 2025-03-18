let getLocation = function(){
    if (navigator.geolocation) {
        // Get the current location of the user
        navigator.geolocation.getCurrentPosition(function(position) {

           
            let currentLoc = function(){
                  // Get the latitude and longitude from the Geolocation API
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Create a map centered on the user's location
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                center: userLocation,
            });

            // Add a marker at the user's location
            const marker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "You are here"
            });
            }

            this.setTimeout(currentLoc(), 2000);
          

        }, function() {
            // Handle error if geolocation fails
            alert("Geolocation failed. Please allow access to your location.");
        });
    } else {
        // Handle the case where geolocation is not supported
        alert("Geolocation is not supported by this browser.");
    }
}


function initMap() {
    const locationPermission = sessionStorage.getItem('locationPermission');
    getLocation();
   
    // if (locationPermission === 'granted') {
     
    // } else {
    //     alert("Location permission denied. The map will not display your current location.");
    // }
}



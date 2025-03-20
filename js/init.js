function getLocation() {
    if (navigator.geolocation) {
        // Get the current location of the user
        navigator.geolocation.getCurrentPosition(function(position) {
            let currentLoc = function() {
                // Get the latitude and longitude from the Geolocation API
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Create a map container dynamically
                var mapDiv = document.getElementById("map");
                mapDiv.style.height = '85vh';
                mapDiv.style.width = '100%';
                // if(!mapDiv){
                //     mapDiv = document.createElement('div');
                //     mapDiv.id = "map"
                //     mapDiv.style.height = '100vh'; // Make the map fill the entire viewport
                //     mapDiv.style.width = '100%';
                //     document.body.appendChild(mapDiv);
                // }

                // Create a Google Map centered on the user's location
                const map = new google.maps.Map(mapDiv, {
                    zoom: 14,
                    center: userLocation,
                });

                // Function to add markers
                let addMarker = function(coords, title) {
                    var markerProperty = {
                        position: coords,
                        map: map,
                        title: title,
                    };

                    if(title === "You are here") {
                        markerProperty.icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                    }

                    var marker = new google.maps.Marker(markerProperty);

                    var infoWindow = new google.maps.InfoWindow({
                        content: `<h4>${title}</h4>`
                    });

                    marker.addListener("click", function() {
                        infoWindow.open(map, marker);
                    });
                };

                // Add a marker for the user's current location
                addMarker(userLocation, 'You are here');

                // Example of adding other markers
                addMarker({lat: 14.667157615576736, lng: 121.10769854232787}, 'Mang Inasal - Nangka');
                addMarker({lat: 14.660311027190282, lng: 121.11335611595432}, 'Mang Inasal - Parang');
                addMarker({lat: 14.651425960460292, lng: 121.10400057091037}, 'Mang Inasal - Concepcion Uno');
            };

            currentLoc(); // Directly call currentLoc
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
    // Initialize map as soon as the DOM is ready
    getLocation();
}

// Call initMap when the page is ready
//initMap();

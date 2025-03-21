function initMap() {
    if (navigator.geolocation) {
        // Get the current location of the user
        navigator.geolocation.getCurrentPosition(function(position) {
           // Get the latitude and longitude from the Geolocation API
        const defaultLocation = {
          lat: 14.651055652787212,
          lng: 121.09984831690286
        };
        let mapDiv = document.getElementById("map");
        const map = new google.maps.Map(mapDiv, {
            zoom: 13,
            center: defaultLocation,
        });
       
       
        // Store branches
        let stores = getStoreLocation();

        let listContainer = document.getElementById("storeList");
        listContainer.innerHTML = ""
        stores.forEach(store => {
            addPinMarker({
                position: {lat: store.coordinates.latitude, lng: store.coordinates.longitude},
                map: map,
                title: store.name,
                address: store.address
            });

            addLocationItems(listContainer, store)


        });
       
        }, function() {
            // Handle error if geolocation fails
            alert("Geolocation failed. Please allow access to your location.");
        });
    } else {
        // Handle the case where geolocation is not supported
        alert("Geolocation is not supported by this browser.");
    }
}

function addPinMarker(markerProperty){

    let marker = new google.maps.Marker(markerProperty);

    let infoWindow = new google.maps.InfoWindow({
        content: `<div class="store-info-window">
                <div class="info-header">
                    <span class="info-title">${markerProperty.title}</span>
                </div>
                <div class="info-body">
                    <img src="./resources/images/mcdo_sample.jpg" alt="Store Image" class="info-image" style="width: 150px;">
                    <div class="info-details">
                        <p>${markerProperty.address}</p>
                        <p>123456789 </p>
                    </div>
                </div>
                <button class="info-details-btn">Show Details <i class="fa-solid fa-chevron-right"></i></button>
            </div>`
    });

    marker.addListener("click", function() {
        infoWindow.open(markerProperty.map, marker);
    });

}

function getStoreLocation(){
    // Ex: Mcdonald's

    const storeJsonString = `{
        "store_locations": [
          {
            "name": "McDonald's Marcos Highway",
            "address": "1 Gunting St. corner Marcos Highway, Brgy. San Roque, Marikina City",
            "coordinates": {
              "latitude": 14.621283,
              "longitude": 121.102763
            }
          },
          {
            "name": "McDonald's Sumulong Highway",
            "address": "McDonald's Avenue, Sumulong Highway, Marikina, 1800 Metro Manila, Philippines",
            "coordinates": {
              "latitude": 14.65073,
              "longitude": 121.1028546
            }
          },
          {
            "name": "McDonald's Nangka Marikina",
            "address": "SM City Marikina, Marcos Highway, Brgy. Calumpang, Marikina, Metro Manila, Philippines",
            "coordinates": {
              "latitude": 14.671097539354154,
              "longitude": 121.10782682208213
            }
          },
           {
            "name": "McDonald's SM City San Mateo",
            "address": "SM City San Mateo, Gen. Luna Ave, Ampid 1, San Mateo, 1850 Rizal",
            "coordinates": {
              "latitude": 14.680403892098179,
              "longitude": 121.11424249154959
            }
          },
           {
            "name": "McDonald's Concepcion Marikina",
            "address": "Bayan-Bayanan Avenue Cor. E Santos, Candazo St, Marikina, 1800 Metro Manila",
            "coordinates": {
              "latitude": 14.65184015520653,
              "longitude": 121.1048869465057
            }
          },
           {
            "name": "McDonald's Marikina Prodigy",
            "address": "24 Sumulong Hwy, Marikina, 1800 Metro Manila",
            "coordinates": {
              "latitude": 14.636809484272232,
              "longitude": 121.09965127450857
            }
          }
        ]
      }`;
      
    const storeData = JSON.parse(storeJsonString);
    
    return storeData.store_locations;

}

function addLocationItems(listContainer, store){
  const listItem = document.createElement("a");
  listItem.className = "list-group-item list-group-item-action d-flex align-items-start";
  listItem.href = "#"; // Add link if needed

  listItem.innerHTML = `
      <img src="https://via.placeholder.com/40" class="store-icon">
      <div class="ms-3 flex-grow-1">
          <h6 class="mb-1 fw-bold">${store.name}</h6>
          <p class="mb-1 text-muted text-wrap">${store.address}</p>
      </div>
      <i class="fa-solid fa-angle-right text-secondary"></i>
  `;

  listContainer.appendChild(listItem);
}

// Call initMap when the page is ready
//initMap();

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 14.6504, lng: 121.1029 }, // Marikina City
        zoom: 14,
    });

    // Search for McDonald's immediately after map loads
    searchMcDonalds(map.getCenter());
}

function searchMcDonalds(location) {
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: location,
        radius: 5000, // 5 km radius
        type: "restaurant",
        keyword: "McDonald's"
    }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayStores(results);
        }
    });
}

function displayStores(stores) {
    const storeList = document.getElementById("store-list");
    storeList.innerHTML = "";

    stores.forEach((store) => {
        const marker = new google.maps.Marker({
            position: store.geometry.location,
            map: map,
            title: store.name,
            icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });

        const storeItem = document.createElement("a");
        storeItem.classList.add("list-group-item", "list-group-item-action");
        storeItem.innerHTML = `<strong>${store.name}</strong><br>${store.vicinity}`;
        storeItem.onclick = () => {
            map.setCenter(store.geometry.location);
            map.setZoom(15);
        };
        storeList.appendChild(storeItem);
    });
}

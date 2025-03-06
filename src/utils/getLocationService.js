export default function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            console.log(lat , lon); 
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

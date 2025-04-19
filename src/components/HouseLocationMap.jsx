import React, { useEffect } from "react";

const HouseLocationMap = ({ lat, lng }) => {
  useEffect(() => {
    const initMap = () => {
      const houseLocation = { lat: lat, lng: lng }; // Use the passed lat/lng

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: houseLocation,
        zoom: 15,
        gestureHandling: "none", // Disables zoom and panning gestures
        disableDefaultUI: true, // Hides all default UI elements
      });

      new window.google.maps.Marker({
        position: houseLocation,
        map: map,
      });
    };

    // Load the Google Maps script
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = callback;
      document.body.appendChild(script);
    };

    // Load Google Maps API
    loadScript(
      ``,
      initMap
    );
  }, [lat, lng]); // Run effect when lat or lng changes

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default HouseLocationMap;

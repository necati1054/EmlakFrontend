import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function MyComponent({ center, setCenter, markerPosition, setMarkerPosition }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCZ2lv_291yFguiqfick2M6d_jatFdjFNs", // Google API anahtarınızı buraya ekleyin
  });

  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Kullanıcının konumunu al ve haritayı o konuma ayarla
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
        },
        () => {
          console.warn(
            "Konum bilgisi alınamadı, varsayılan konum kullanılacak."
          );
        }
      );
    }
  }, []);

  // Haritaya tıklayınca marker'ı tıklanan yere koy ve konumu al
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  const handleMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center} // Dinamik merkezi haritaya veriyoruz
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick} // Harita tıklama olayını ekledik
    >
      <Marker
        position={markerPosition}
        draggable={true} // İşaretçi sürüklenebilir
        onDragEnd={handleMarkerDragEnd} // Sürükleme sonrası konum alınıyor
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

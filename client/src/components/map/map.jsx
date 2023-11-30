import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ address }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      //NOMINATIM
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const coords = [data[0].lat, data[0].lon];
            setPosition(coords);
          }
        });
    }
    
  }, [address]);

  const customIcon = new L.divIcon({
    className: "custom-div-icon",
    html: "<div style='color: red; font-size: 24px;'><strong>X</strong></div>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

  if (!position) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={customIcon}>
       
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
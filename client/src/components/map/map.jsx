import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ address, location }) => {
  const [position, setPosition] = useState(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    
    const query = `${address}${location ? ", " + location : ""}`;

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const coords = [data[0].lat, data[0].lon];
          setPosition(coords);
        } else {
        
        
        }
      })
      .catch((error) => {
     
        notifyError("Error al buscar la dirección y provincia:", error);
      });
  }
}, [address, location]); 

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
      <Marker position={position} icon={customIcon}></Marker>
    </MapContainer>
  );
};

export default MapComponent;

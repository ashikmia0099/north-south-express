import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";




// Fix icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapModal = ({ open, handleClose, latitude, longitude }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          width: "80%",
          height: "60%",
          margin: "auto",
          marginTop: "5%",
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>Delivery Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </Modal>
  );
};

export default MapModal;

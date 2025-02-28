import React, { useState } from 'react';
import MapModal from '../../../pages/Homepage/Homepage/MapModal';

const Map = () => {
    const [modalOpen, setModalOpen] = useState(false);

    // Example latitude and longitude
    const latitude = 23.8103; // Replace with actual latitude
    const longitude = 90.4125; // Replace with actual longitude
  
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
  
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <button
          onClick={handleOpen}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          See Location
        </button>
  
        <MapModal
          open={modalOpen}
          handleClose={handleClose}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
    );
};

export default Map;
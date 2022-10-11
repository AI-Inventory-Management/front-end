import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";

var containerStyle = {
  width: "100%",
  height: "100%",
};

var markers = [
  {
    id: 0,
    position: {
      lat: 19.42847,
      lng: -99.12766,
    },
    img: "Rojo.png",
  },
  {
    id: 1,
    position: {
      lat: 25.67507,
      lng: -100.31847,
    },
    img: "Verde.png",
  },
  {
    id: 2,
    position: {
      lat: 20.66682,
      lng: -103.39182,
    },
    img: "Verde.png",
  },
  {
    id: 3,
    position: {
      lat: 24.02032,
      lng: -104.65756,
    },
    img: "Amarillo.png",
  },
  {
    id: 4,
    position: {
      lat: 28.63528,
      lng: -106.08889,
    },
    img: "Rojo.png",
  },
  {
    id: 5,
    position: {
      lat: 19.03793,
      lng: -98.20346,
    },
    img: "Verde.png",
  },
  {
    id: 6,
    position: {
      lat: 19.18095,
      lng: -96.1429,
    },
    img: "Verde.png",
  },
  {
    id: 7,
    position: {
      lat: 20.97537,
      lng: -89.61696,
    },
    img: "Amarillo.png",
  },
  {
    id: 8,
    position: {
      lat: 16.56975,
      lng: -92.72037,
    },
    img: "Rojo.png",
  },
];

// llamada a back para info de markers

const Map = (props) => {
  // props.markers -> object arrary  para sustituir markers
  // props.onSelectStore -> pasar id a Map.js
  // props.isShowingInfo -> bool if true change the
  // center of the map, this has to occcur once (not iplemented yet)

  const [center, setCenter] = useState({
    lat: 22.42847,
    lng: -99.12766,
  });
  // center when the info is shown
  // const center = {
  //   lat: 25,
  //   lng: -94,
  //   // Default value
  // };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
        {markers.map((marker) => (
          <MarkerF
            key={marker.id}
            clickable={true}
            onClick={() => {
              props.onSelectStore(marker.id);
            }}
            position={marker.position}
            icon={{ url: require(`../images/${marker.img}`) }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

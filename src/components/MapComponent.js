import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

var containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 19.42847,
  lng: -99.12766,
};

var markers = [
  {
    position: {
      lat: 19.42847,
      lng: -99.12766,
    },
    img: "Rojo.png",
  },
  {
    position: {
      lat: 25.67507,
      lng: -100.31847,
    },
    img: "Verde.png",
  },
  {
    position: {
      lat: 20.66682,
      lng: -103.39182,
    },
    img: "Verde.png",
  },
  {
    position: {
      lat: 24.02032,
      lng: -104.65756,
    },
    img: "Amarillo.png",
  },
  {
    position: {
      lat: 28.63528,
      lng: -106.08889,
    },
    img: "Rojo.png",
  },
  {
    position: {
      lat: 19.03793,
      lng: -98.20346,
    },
    img: "Verde.png",
  },
  {
    position: {
      lat: 19.18095,
      lng: -96.1429,
    },
    img: "Verde.png",
  },
  {
    position: {
      lat: 20.97537,
      lng: -89.61696,
    },
    img: "Amarillo.png",
  },
  {
    position: {
      lat: 16.56975,
      lng: -92.72037,
    },
    img: "Rojo.png",
  },
];

const Map = (props) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
        {markers.map((marker) => (
          <MarkerF
            position={marker.position}
            icon={{ url: require(`../images/${marker.img}`) }}
          />
        ))}
        {/* <MarkerF
          position={markerPosition}
          icon={{
            url: require("../images/Rojo.png"),
          }}
        />
        <MarkerF
          position={markerPosition2}
          icon={{
            url: require("../images/Amarillo.png"),
          }}
        /> */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

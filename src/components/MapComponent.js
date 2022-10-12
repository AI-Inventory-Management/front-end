import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";

var containerStyle = {
  width: "100%",
  height: "100%",
};

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

  const [markers, setMarkers] = useState([]); // array que contiene los marcadores con la info de la bd

  // mapeo de colores según el status del marcador
  const colors = {
    1: "Verde.png",
    2: "Amarillo.png",
    3: "Rojo.png",
  };

  // consultar todos las tiendas del back
  const getMarkerData = async () => {
    fetch("http://localhost:8080/store/getStoreCoordinates").then(
      (response) => {
        response.json().then((result) => {
          setMarkers(result);
        });
      }
    );
  };

  // ejecutar la consulta cuando cargue la página
  useEffect(() => {
    getMarkerData();
  }, []);

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
            icon={{ url: require(`../images/${colors[marker.status]}`) }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";

const Map = (props) => {
  const navigate = useNavigate();
  // props.markers -> object arrary  para sustituir markers
  // props.onSelectStore -> pasar id a Map.js
  // props.isShowingInfo -> bool if true change the
  // center of the map, this has to occcur once (not iplemented yet)
  const [markers, setMarkers] = useState([]); // array que contiene los marcadores con la info de la bd
  const [center, setCenter] = useState({
    lat: 22.42847,
    lng: -99.12766,
  });
  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    // libraries: ["geometry", "drawing"],
  });

  const containerStyle = {
    width: props.width ? props.width : "100%",
    height: props.height ? props.height : "100%",
  };

  // center when the info is shown
  // const center = {
  //   lat: 25,
  //   lng: -94,
  //   // Default value
  // };

  // mapeo de colores según el status del marcador
  const colors = {
    1: "Verde.png",
    2: "Amarillo.png",
    3: "Rojo.png",
  };

  // consultar todos las tiendas del back
  // const getMarkerData = async () => {
  //   var myHeadersToken = new Headers();
  //   myHeadersToken.append("Content-Type", "application/json");
  //   myHeadersToken.append(
  //     "Authorization",
  //     `Bearer ${window.sessionStorage.getItem("bearerToken")}`
  //   );

  //   const requestOptionsGET = {
  //     method: "GET",
  //     headers: myHeadersToken,
  //   };

  //   fetch(
  //     `${process.env.REACT_APP_BACKEND_URL}/store/getStoreCoordinates`,
  //     requestOptionsGET
  //   ).then(function (response) {
  //     if (response.status === 401) {
  //       // Authorization token
  //       window.sessionStorage.removeItem("isLoggedIn");
  //       window.sessionStorage.removeItem("role");
  //       window.sessionStorage.removeItem("bearerToken");
  //       navigate("/");
  //     }
  //     response.json().then((result) => {
  //       setMarkers(result);
  //     });
  //   });
  //};
    // ejecutar la consulta cuando cargue la página
  useEffect(() => {
    if (props.loggedIn === true) {
      // getMarkerData();
      var myHeadersToken = new Headers();
      myHeadersToken.append("Content-Type", "application/json");
      myHeadersToken.append(
        "Authorization",
        `Bearer ${window.sessionStorage.getItem("bearerToken")}`
      );
  
      const requestOptionsGET = {
        method: "GET",
        headers: myHeadersToken,
      };
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/store/getStoreCoordinates`,
        requestOptionsGET
      ).then(function (response) {
        if (response.status === 401) {
          // Authorization token
          window.sessionStorage.removeItem("isLoggedIn");
          window.sessionStorage.removeItem("role");
          window.sessionStorage.removeItem("bearerToken");
          navigate("/");
        }
        response.json().then((result) => {
          setMarkers(result);
        });
      });
    }
  }, [navigate, props.loggedIn]);

  if (!isLoaded) {
    return <div>Pou</div>;
  }
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      options={{
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      }}
    >
      {markers.map((marker) => (
        <MarkerF
          key={marker.id_store}
          clickable={true}
          onClick={() => {
            props.onSelectStore(marker.id_store);
            navigate(`/mapa/${marker.id_store}`);
          }}
          position={marker.position}
          icon={{
            url: require(`../images/${colors[marker.status]}`),
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;

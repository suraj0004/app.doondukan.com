import React, { useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";

const GoogleMaps = React.forwardRef((props, ref) => {
  const defaultCenter = { lat: 30.3246288, lng: 78.0420663 };
  const googleMapsObject = useRef(null);
  const myMap = useRef(null);
  const marker = useRef(null);
  const dragListener = useRef(null);
  const centerChangedListener = useRef(null);

  useEffect(() => {
    if (myMap.current && marker.current) {
      marker.current.setPosition({ lat: props.lat, lng: props.lng });
      myMap.current.setCenter({ lat: props.lat, lng: props.lng });
      myMap.current.setZoom(17);
    }
  }, [props]);

  useEffect(() => {
    return () => {
      if (
        myMap.current &&
        marker.current &&
        dragListener.current &&
        centerChangedListener.current
      ) {
        googleMapsObject.current.event.removeListener(dragListener.current);
        googleMapsObject.current.event.removeListener(
          centerChangedListener.current
        );
        console.log("GoogleMaps unmoundted");
      }
    };
  }, []);

  const loadMap = ({ map, maps }) => {
    googleMapsObject.current = maps;
    myMap.current = map;

    marker.current = new maps.Marker({
      position: defaultCenter,
      map,
      draggable: false,
    });

    dragListener.current = myMap.current.addListener("drag", () => {
      marker.current.setPosition(myMap.current.getCenter());
    });

    centerChangedListener.current = myMap.current.addListener(
      "center_changed",
      () => {
        marker.current.setPosition(myMap.current.getCenter());
      }
    );
  };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        id="My_map"
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={defaultCenter}
        defaultZoom={17}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={loadMap}
        ref={ref}
      />
    </div>
  );
});

export default GoogleMaps;

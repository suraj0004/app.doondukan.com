import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

// Get latitude & longitude from address.
export const convertAddressToLatLng = (address) => {
  return new Promise((resolve, reject) => {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        resolve({ lat, lng });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

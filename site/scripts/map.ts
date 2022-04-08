window.onload = () => {
  // @ts-expect-error Figure out how to handle Leaflet typing
  const L = window.L;
  const map = L.map("map").setView([51.505, -0.09], 13);

  // add the OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);

  // add GPX
  const gpx = "/assets/rengasreitti.gpx";
  new L.GPX(gpx, {
    async: true,
    marker_options: {
      startIconUrl: "/assets/pin-icon-start.png",
      endIconUrl: "/assets/pin-icon-end.png",
      shadowUrl: "/assets/pin-shadow.png",
      wptIconUrls: {
        "": "/assets/pin-icon-wpt.png",
      },
    },
    // @ts-expect-error TODO: Figure out how to type
  }).on("loaded", (e) => {
    map.fitBounds(e.target.getBounds());
  }).addTo(map);

  // show the scale bar on the lower left corner
  L.control.scale({ imperial: true, metric: true }).addTo(map);

  // show a marker on the map
  L.marker({ lon: 0, lat: 0 }).bindPopup("The center of the world").addTo(map);

  // allow printing
  L.easyPrint({
    title: "Tulosta",
    position: "topright",
    sizeModes: ["A4Portrait", "A4Landscape"],
  }).addTo(map);

  // figure out geolocation
  // @ts-expect-error TODO: Figure out how to type
  if (!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!");
  } else {
    // @ts-expect-error TODO: Figure out how to type
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("received position", position);

      map.setView([position.coords.latitude, position.coords.longitude]);
    });
  }
};

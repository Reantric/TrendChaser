function initAutocomplete() {
  // Create the search box and link it to the UI element.
  var defaultBounds = new google.maps.LatLngBounds(

  )
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.Autocomplete(input, {
    componentRestrictions: {country: ["us"]},
    strictBounds: true
  });
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
}
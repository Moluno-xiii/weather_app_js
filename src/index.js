import "./style.css";

const locationForm = document.querySelector("#locationForm");
const dataDiv = document.querySelector("#data");

locationForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(locationForm);
  const data = Object.fromEntries(formData);

  const locationData = await getLocationData(data.location);
  if (!locationData) return;
  dataDiv.textContent = `Timezone : ${locationData.timezone}, Latitude : ${locationData.latitude}, longitude : ${locationData.longitude}, address : ${locationData.resolvedAddress}, dateTime : ${locationData.currentConditions.datetime}, sunrise : ${locationData.currentConditions.sunrise}, sunset : ${locationData.currentConditions.sunset}, temperature : ${locationData.currentConditions.temp} degrees`;
  locationForm.reset();
});
const api_url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const api_key = "TQNETP4KRRNYZ84NATNXZ8GNR";

async function getLocationData(userLocation) {
  try {
    const response = await fetch(`${api_url}/${userLocation}?key=${api_key}`);
    if (!response.ok) throw Error(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occured :", error.message);
  }
}

// ctrl alt x on browser opens the ai tab.

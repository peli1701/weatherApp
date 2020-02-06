console.log("please");

window.addEventListener("load", () => {
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const temperatureDegree = document.querySelector(".temperature-degree");
  const timeZone = document.querySelector(".timezone");
  const wind = document.querySelector(".wind-speed");
  const degSection = document.querySelector(".degree-section");
  const degSymbol = document.querySelector(".deg-symbol");

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(position => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/86ffecc4a09d7f81d76847f69133ecff/${lat}, ${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

          //Retrieve Data
          const { temperature, summary, windSpeed, icon } = data.currently;
          const celcius = (((temperature - 32) * 5) / 9).toFixed(2);

          //Set User Timezone
          let zone = data.timezone;
          zone = zone.substring(zone.indexOf("/") + 1);
          timeZone.textContent = zone;

          //Set Weather Icon
          setIcons(icon, document.querySelector(".icon"));

          //Set Temp
          temperatureDegree.innerHTML = temperature;

          //Set Weather Conditions
          temperatureDescription.innerHTML = summary;

          //Set Wind Speed
          wind.innerHTML = windSpeed;

          //Change to Celcius

          degSection.addEventListener("click", () => {
            if (degSymbol.innerHTML === "F") {
              degSymbol.innerHTML = "C";
              temperatureDegree.innerHTML = celcius;
            } else {
              console.log("hello?");
              degSymbol.innerHTML = "F";
              temperatureDegree.innerHTML = temperature;
            }
          });
        });
    });
  }

  degSection.addEventListener(
    "mousedown",
    e => {
      e.preventDefault();
    },
    false
  );

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

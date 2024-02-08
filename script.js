let weather = {
    APIkey: "ce1be55960be4b13bb9132114242301",
    fetchWeather: function (city) {
        fetch("https://api.weatherapi.com/v1/current.json?key=" + this.APIkey + "&q=" + city + "&aqi=yes")
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name, region, country, localtime, tz_id } = data.location;
        const { temp_c, wind_kph } = data.current;
        const { text, icon } = data.current.condition;
        console.log(name, region, country, localtime, tz_id, temp_c, wind_kph, text, icon);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".state").innerText = region;
        document.querySelector(".Country").innerText = country;
        document.querySelector(".local-time").innerText = localtime;
        document.querySelector(".timezone").innerText = "Timezone: " + tz_id;
        document.querySelector(".temp").innerText = temp_c + "°C";
        document.querySelector(".Wind").innerText = "Wind speed: " + wind_kph + " km/h";
        document.querySelector(".description").innerText = text;
        document.querySelector(".icon").src = "https:" + icon;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
    });

document.querySelector(".search-bar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});


document.querySelector(".search-bar").addEventListener("input", function () {
    // Check if the search bar is empty
    if (this.value === "") {
        // Clear the displayed data
        document.querySelector(".city").innerText = "";
        document.querySelector(".state").innerText = "";
        document.querySelector(".Country").innerText = "";
        document.querySelector(".local-time").innerText = "";
        document.querySelector(".timezone").innerText = "";
        document.querySelector(".temp").innerText = "";
        document.querySelector(".Wind").innerText = "";
        document.querySelector(".description").innerText = "";
        document.querySelector(".icon").src = "";
        // You may also want to clear other elements like ".date"
    }
});
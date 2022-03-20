function loadCountries() {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", encodeURI("https://restcountries.com/v3.1/all"), true);
  httpRequest.responseType = "json";
  httpRequest.onload = () => {
    if (httpRequest.status === 200) {
      document.getElementById("jsonCountries").innerHTML
        = JSON.stringify(httpRequest.response);
    } else {
      alert("No hay conexión");
    }
  };
  httpRequest.send();
}



const httpRequest = new XMLHttpRequest();

function loadCountries() {
  request("all", receiveCountries);
}

function request(params, response) {
    httpRequest.open("GET", encodeURI(`https://restcountries.com/v3.1/${params}`), true);
    httpRequest.responseType = "json";
    httpRequest.onload = response;
    httpRequest.send();
}

function receiveCountries() {
    if (httpRequest.status === 200) {
        generateCountries(httpRequest.response
            .map(country => {
                return {
                    name: country.name.common,
                    flag: country.flags.svg
                };
            }));
    } else {
        alert("No hay conexión");
    }
}

function generateCountries(countries) {
    const main = document.getElementById("countries");
    for (let country of countries) {
        const div = document.createElement("div");
        div.name = country.name;
        const h2 = document.createElement("h2");
        div.appendChild(h2);
        h2.name = country.name;
        const text = document.createTextNode(country.name);
        h2.appendChild(text);
        const img = document.createElement("img");
        div.appendChild(img);
        img.name = country.name;
        img.src = country.flag;
        div.onclick = loadCountry;
        main.appendChild(div);
    }
}

function loadCountry(event) {
    request("name/" + event.target.name, receiveCountry);
}

function receiveCountry() {
    if (httpRequest.status === 200) {
        generateCountry(httpRequest.response[0]);
    } else {
        alert("No hay conexión");
    }
}

function generateCountry(country) {
    const main = document.getElementById("countries");
    main.innerHTML = "";
    const ul = document.createElement("ul");
    main.appendChild(ul);
    ul.appendChild(generateField("Nombre", country.name.common));
    ul.appendChild(generateField("Región", country.region));
    ul.appendChild(generateField("Subregión", country.subregion));
}

function generateField(field, value) {
    const li = document.createElement("li");
    const text = document.createTextNode(value);
    li.appendChild(text);
    return li;
}

const BASE_URL = "https://swapi.dev/api/people/?page=";
let genPopular, genSecondary, genOthers, data, data2;

function* generator(character, type) {
  const popular = document.getElementById("popular");
  const secondary = document.getElementById("secondary");
  const others = document.getElementById("others");
  let create = type;

  for (let temp of character) {
    yield temp.name;

    if (create === "popular") {
      popular.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="single-timeline-content d-flex">
          <div class="timeline-icon popular"></div>
            <div class="timeline-text">
              <h6>${temp.name}</h6>
                <p>Estatura: ${temp.height}cm Peso: ${temp.mass}kg</p>
            </div>
          </div>
        </div>
      `;
    } else if (create === "secondary") {
      secondary.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="single-timeline-content d-flex">
          <div class="timeline-icon secondary"></div>
            <div class="timeline-text">
              <h6>${temp.name}</h6>
                <p>Estatura: ${temp.height}cm Peso: ${temp.mass}kg</p>
            </div>
          </div>
        </div>
      `;
    } else {
      others.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="single-timeline-content d-flex">
          <div class="timeline-icon others"></div>
            <div class="timeline-text">
              <h6>${temp.name}</h6>
                <p>Estatura: ${temp.height}cm Peso: ${temp.mass}kg</p>
            </div>
          </div>
        </div>
      `;
    }
  }
}

const popular = (event) => {
  event.preventDefault();
  genPopular.next();
};

const secondary = (event) => {
  event.preventDefault();
  genSecondary.next();
};

const others = (event) => {
  event.preventDefault();
  genOthers.next();
};

document.addEventListener("DOMContentLoaded", async () => {
  const oneToFive = document.getElementById("oneToFive");
  const sixToEleven = document.getElementById("sixToEleven");
  const twelveToSeventeen = document.getElementById("twelveToSeventeen");

  const results = await fetch(`${BASE_URL}1`);
  const response = await results.json();
  data = response.results;

  const results2 = await fetch(`${BASE_URL}2`);
  const response2 = await results2.json();
  data2 = response2.results;

  const responses = data.concat(data2);

  genPopular = generator(responses.slice(0, 5), "popular");
  genPopular.next();
  genSecondary = generator(responses.slice(5, 10), "secondary");
  genSecondary.next();
  genOthers = generator(responses.slice(10, 15), "others");
  genOthers.next();

  oneToFive.addEventListener("mouseover", popular);
  sixToEleven.addEventListener("mouseover", secondary);
  twelveToSeventeen.addEventListener("mouseover", others);
});

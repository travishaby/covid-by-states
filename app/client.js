const dataUrl = "https://coronadatascraper.com/timeseries-byLocation.json"

const getData = () =>
  fetch(dataUrl)
    .then(response => response.json())
    .catch(console.alert);

module.exports = getData;
const csvsUrl =
  "https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports";

const csvFileRegex = new RegExp(/\d{2}-\d{2}-\d{4}\.csv/);

const getHopkinsCSVs = () =>
  fetch(csvsUrl)
    .then(response => response.json())
    .then(result => {
      return result.filter(file => {
        const notJanuary = file.name.indexOf("01") != 0;
        return notJanuary && file.name.match(csvFileRegex);
      });
    })
    .catch(console.alert);

module.exports = getHopkinsCSVs;
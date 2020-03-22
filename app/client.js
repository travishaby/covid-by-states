const csvsUrl =
  "https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports";

const csvFileRegex = new RegExp(/\d{2}-\d{2}-\d{4}\.csv/);

const getHopkinsCSVs = () =>
  fetch(csvsUrl)
    .then(response => response.json())
    .then(result => {
      return result
        .filter(item => {
          const notJan = item.name.indexOf("01") != 0;
          const notFeb = item.name.indexOf("02") != 0;
          return notJan && notFeb && item.name.match(csvFileRegex);
        })
        .map(item => item.download_url)
    })
    .catch(console.alert);

module.exports = getHopkinsCSVs;
let key = "4c057db7-d5ca-44c1-ac62-7ad54b4aecde";
let url = "https://polestarokinawa.microcms.io/api/v1/";

function get(path, params = "", callback) {
  $.ajaxSetup({
    cache: false,
    headers: {
      "X-API-KEY": key,
    },
  });
  $.getJSON(url + path, params)
    .done(function (data) {
      callback(data);
    })
    .fail(function (e) {
      //window.location.href = "index"
    });
}

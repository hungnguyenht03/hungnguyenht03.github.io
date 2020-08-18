var section__top;
var section__details;
var header;
let details_img;
let details_title;
let details_title_color;
let details_label;
let details_label_icon;
let details_label_color;
let details_date;
let details_content;
let details_main_content;
var myInterval;

(function ($) {
  init();
  const id = getIdPath("media_compass");
  if (id != null) {
    setUpDetails(id);
  }
  updateWrapBottomNav();
  //$(window).resize(updateElementByHeight);
})(jQuery);

function init() {
  section__top = document.getElementById("section__top");
  section__details = document.getElementById("section__details");
  header = document.getElementById("header_media_compass");
  details_img = document.getElementById("media_compass_details_background");
  details_title = document.getElementById("media_compass_details_title");
  details_title_color = document.getElementById(
    "media_compass_details_title_color"
  );
  details_label = document.getElementById("media_compass_details_label");
  details_label_icon = document.getElementById("media_compass_details_icon");

  details_label_color = document.getElementById(
    "media_compass_details_label_color"
  );
  details_date = document.getElementById("media_compass_details_date");
  details_content = document.getElementById("media_compass_details_content");
  details_main_content = document.getElementById("main_content_id");
}

function setUpDetails(id) {
  const draftKey = getParamFromUrl("draftKey");
  let url = "media_compass/" + id + "?draftKey=" + draftKey;
  get(url, null, setupDetailsPage);
  section__top.style.display = "none";
  section__details.style.display = "flex";
}

function back() {
  redirectTo("media_compass");
}

function setupDetailsPage(data) {
  let labelObj = getLabel(data.category);
  details_img.src = data.keyvisual && data.keyvisual.url ? data.keyvisual.url : 'https://images.microcms-assets.io/protected/ap-northeast-1:a3605d70-453d-49df-8545-77bfb92cb9a2/service/polestarokinawa/media/COMPASS_logo_fix_ol_yoko%20-%20%E3%82%B3%E3%83%94%E3%83%BC%20(2).png';
  details_img.alt = data.title;
  details_title.innerText = data.title;
  details_title_color.style.backgroundColor = labelObj.color;
  details_label.innerText = labelObj.text;
  details_label_color.style.backgroundColor = labelObj.color;
  details_label_icon.src = labelObj.icon;
  details_date.innerText = getReleaseDate(data.date);
  details_content.innerHTML = data.content;

  myInterval = setInterval(updateElementByHeight, 100);
  setTimeout(stopInterval, 3000);
}

function stopInterval() {
  clearInterval(myInterval);
}

function initState() {
  details_img.src = "";
  details_img.alt = "";
  details_title.innerText = "";
  removeColor(details_title_color);
  details_label.innerText = "";
  removeColor(details_label_color);
  details_date.innerText = "";
  details_content.innerHTML = "";
}

function removeColor(e) {
  e.classList.remove("bg-yellow");
  e.classList.remove("bg-red");
  e.classList.remove("bg-green");
}

function updateElementByHeight() {
  if (isMobileDevice) {
    let imageHeight = details_img.offsetHeight;
    if (imageHeight != 0) {
      let mainContentHeight = imageHeight - 45;
      $("#main_content_id").css("margin-top", mainContentHeight + "px");
      details_img.style.height = imageHeight + "px";
      details_img.style.objectFit = "cover";
    }
  }
}

function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

let section__top;
let section__details;
let details_title;
let details_date;
let details_content;
let previous_btn;
let next_btn;
let isFirst = true;
let isLast = false;
let id;
let index;

(function ($) {
  init();

  id = getIdPath("new_release");
  index = getParameterByName("index");
  draftKey = getParameterByName("draftKey");

  if (index != null || draftKey != null) {
    initDetails(index);
  }
  if (id != null) {
    initContent(id);
  }
})(jQuery);

function init() {
  section__top = document.getElementById("section__top");
  section__details = document.getElementById("section__details");
  details_title = document.getElementById("new_release_details_title");
  details_date = document.getElementById("new_release_details_date");
  details_content = document.getElementById("new_release_details_content");
  previous_btn = document.getElementById("new_release_previous");
  next_btn = document.getElementById("new_release_next");
  hideBtn(previous_btn);
  hideBtn(next_btn);
}

function initContent(id) {
  const draftKey = getParamFromUrl("draftKey");
  let url = "news/" + id + "?draftKey=" + draftKey;
  get(url, null, setupContentPage);
}

function setupContentPage(line) {
  details_title.innerText = line.title;
  details_date.innerText = getReleaseDate(line.date);
  details_content.innerHTML = line.content;
  updateWrapBottomNav();
}

function initDetails(index) {
  isFirstArticle = index == 0;
  const url = "news";
  isFirst = index == 0;
  const params = {
    limit: isFirst ? 2 : 3,
    offset: isFirst ? 0 : index - 1,
  };
  get(url, params, setupDetailsPage);
  section__top.style.display = "none";
  section__details.style.display = "flex";
}

function setupDetailsPage(data) {
  isLast = index != 0 && data.contents.length <= 2;
  if (isFirst || data.contents.length == 1) {
    setUpControllerButton(null, data.contents[1]);
  } else {
    setUpControllerButton(data.contents[0], data.contents[2]);
  }
  updateWrapBottomNav();
}

function setUpControllerButton(previous, next) {
  if (!isFirst) {
    showBtn(previous_btn);
    const previous_index = parseInt(index) - 1;
    const previous_id = previous.id;
    previous_btn.setAttribute(
      "onclick",
      'openDetailsNewRelease("' + previous_id + '","' + previous_index + '")'
    );
  }
  if (!isLast) {
    showBtn(next_btn);
    const next_index = parseInt(index) + 1;
    const next_id = next.id;
    next_btn.setAttribute(
      "onclick",
      'openDetailsNewRelease("' + next_id + '","' + next_index + '")'
    );
  }
}

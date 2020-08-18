var page_newRelease = 1;
var limit_newRelease;
(function ($) {
  const url = window.location.href;
  limit_newRelease = url.includes("new_release") ? 9 : 6;
  const id = getIdPath("new_release");

  if (id == null) {
    getListDataFromApiNewRelease();
  }
})(jQuery);

function getListDataFromApiNewRelease() {
  const getReports = function () {
    const url = "news";
    const params = {
      limit: limit_newRelease,
      offset: limit_newRelease * (page_newRelease - 1),
      fields: "id,title,date",
    };
    get(url, params, createListNewRelease);
  };
  getReports();
}

function loadMore() {
  page_newRelease++;
  getListDataFromApiNewRelease();
}

function createListNewRelease(data) {
  const div = document.getElementById("list_new_release");
  for (let i = 0, imax = data.contents.length; i < imax; i++) {
    const line = data.contents[i];
    const dl = document.createElement("dl");
    const dt = document.createElement("dt");
    const span_date = document.createElement("span");
    const dd = document.createElement("dd");
    const a = document.createElement("a");
    const span_title = document.createElement("span");
    let release_date = getReleaseDate(line.date);
    span_date.appendChild(document.createTextNode(release_date));
    a.href = "#";
    const index = limit_newRelease * (page_newRelease - 1) + i;
    a.setAttribute(
      "onclick",
      'openDetailsNewRelease("' + line.id + '" , "' + index + '")'
    );
    a.title = line.title;
    span_title.appendChild(document.createTextNode(line.title));
    a.appendChild(span_title);
    dt.appendChild(span_date);
    dd.appendChild(a);
    dl.appendChild(dt);
    dl.appendChild(dd);
    div.appendChild(dl);
  }
  updateWrapBottomNav();
  updateLoadMorebtn(data.totalCount);
  updateHrefLink();
}

function openDetailsNewRelease(id, index) {
  window.location.href = "/new_release/" + id + "?index=" + index;
}

function updateLoadMorebtn(totalItem) {
  const loadMoreBtn = document.getElementById("loadMore_btn");
  if (limit_newRelease * page_newRelease >= totalItem) {
    hideBtn(loadMoreBtn);
  }
}

function hideBtn(btn) {
  btn.style.opacity = "0";
  btn.style.cursor = "unset";
  btn.setAttribute("onclick", "");
}

function showBtn(btn) {
  btn.style.opacity = "1";
  btn.style.cursor = "pointer";
}

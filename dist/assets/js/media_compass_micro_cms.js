var page_mediaCompass = 0;
var countItem_mediaCompass = 0;

(function ($) {
  const id = getIdPath("media_compass");
  if (id == null) {
    getListDataFromApiMediaCompass();
  }
})(jQuery);

function getListDataFromApiMediaCompass() {
  const url = window.location.href;
  var limit;

  limit = url.includes("media_compass") ? 9 : 6;

  const getReports = function () {
    const url = "media_compass";
    const params = {
      limit: limit,
      offset: limit * page_mediaCompass,
      //fields: "id,title,labelType,thumbnail",
    };
    get(url, params, createListMediaCompass);
  };
  getReports();
}

function loadMore() {
  page_mediaCompass++;
  getListDataFromApiMediaCompass();
}

function createListMediaCompass(data) {
  const div = document.getElementById("list_media_compass");
  for (let i = 0, imax = data.contents.length; i < imax; i++) {
    countItem_mediaCompass++;
    const line = data.contents[i];
    const div_card_item = document.createElement("div");
    div_card_item.classList.add("card_item");
    div_card_item.setAttribute(
      "onclick",
      'openDetailsMediaCompass("' + line.id + '")'
    );
    const img = document.createElement("img");
    img.src = line.thumbnail.url;
    img.alt = line.title;
    //decorate label
    const div_badge = document.createElement("div");
    let labelObj = getLabel(line.category);
    div_badge.classList.add("badge");
    div_badge.style.backgroundColor = labelObj.color;
    const icon_badge = document.createElement("img");
    icon_badge.src = labelObj.icon;
    const text_badge = document.createElement("p");
    text_badge.innerText = labelObj.text;
    div_badge.appendChild(icon_badge);
    div_badge.appendChild(text_badge);
    //done decorate label
    const div_sub_card = document.createElement("div");
    div_sub_card.classList.add("sub_card");
    const p = document.createElement("p");
    p.classList.add("card_item_body");
    p.innerText = line.title;
    div_sub_card.appendChild(p);
    div_card_item.appendChild(img);
    div_card_item.appendChild(div_badge);
    div_card_item.appendChild(div_sub_card);
    div.appendChild(div_card_item);
  }
  updateWrapBottomNav();
  updateLoadMorebtn(data.totalCount);
  updateHrefLink();
}

function openDetailsMediaCompass(id) {
  window.location.href = "/media_compass/" + id;
}

function updateLoadMorebtn(totalItem) {
  const loadMoreBtn = document.getElementById("loadMore_btn");
  if (loadMoreBtn != null && countItem_mediaCompass >= totalItem) {
    hideBtn(loadMoreBtn);
  }
}

function hideBtn(btn) {
  btn.style.opacity = "0";
  btn.style.cursor = "unset";
  btn.setAttribute("onclick", "");
}

function getLabel(category) {
  return {
    icon: category.icon.url,
    text: category.category_ja,
    color: "#" + category.color,
  };
}

(function ($) {
  updateWrapBottomNav();
})(jQuery);

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function updateWrapBottomNav() {
  handleBottomNav();
  handleFloatingButton();
  handleHeader();
}

function handleBottomNav() {
  let wrap = document.getElementById("bottom_nav");
  let pos = $(window).scrollTop() + $(window).height();
  let tar = $(document).height() - 90;
  if ($(window).scrollTop() + $(window).height() > tar) {
    wrap.style.bottom = pos - tar + "px";
  } else {
    wrap.style.bottom = "10px";
  }
}

function handleFloatingButton() {
  let floatingBtn = document.getElementById("floating_btn");
  let pos = $(window).scrollTop();
  if (pos >= 200) {
    floatingBtn.style.opacity = "1";
  } else {
    floatingBtn.style.opacity = "0";
  }
}

function handleHeader() {
  let header_id = document.getElementById("header_id");
  let section_header_id = document.getElementById("section_header_id");
  let logo_header_id = document.getElementById("logo_header_id");
  let button_mobile_header_id = document.getElementById(
    "button_mobile_header_id"
  );

  let pos = $(window).scrollTop();
  if (pos >= 50) {
    logo_header_id.style.height = "60px";
    header_id.style.height = "70px";
    section_header_id.style.height = "70px";
    button_mobile_header_id.style.zoom = "0.7";
  } else {
    logo_header_id.style.height = "100px";
    header_id.style.height = "130px";
    section_header_id.style.height = "130px";
    button_mobile_header_id.style.zoom = "1";
  }
}

function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}

function redirectTo(url) {
  window.location.href = "/" + url;
}

function getParameterByName(name) {
  let url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getReleaseDate(jsonDate) {
  var my_date = new Date(jsonDate);
  var dd = my_date.getDate();
  var mm = my_date.getMonth() + 1;
  var yyyy = my_date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var release_date = yyyy + "." + mm + "." + dd;
  return release_date;
}

function getIdPath(name) {
  const fullPath = location.pathname;
  const path = fullPath.replace(/\/$/, "").split("/");
  const id = path[path.length - 1];

  if (
    fullPath.includes(name) &&
    id !== name &&
    /^[\w-]+$/.test(path[path.length - 1])
  ) {
    return id;
  }
  return null;
}

function getParamFromUrl(param) {
  const fullPath = location.href;
  if (fullPath.includes(param)) {
    const value = gup(param, fullPath);
    return value;
  }
  return null;
}

function gup(name, url) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
}

function updateHrefLink() {
  const url = window.location.href;
  let isAnchorLink = url.includes("#");
  if (isAnchorLink) {
    let sectionNameArray = url.split("#");

    let sectionName = sectionNameArray[sectionNameArray.length - 1];

    var scrollOffset = $("#" + sectionName).offset().top;

    function customScrollTo(to, duration) {
      var start = 0,
        change = to - start,
        currentTime = 0,
        increment = 20;

      var animateScroll = function () {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(0, val);

        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
      };
      animateScroll();
    }

    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    customScrollTo(scrollOffset, 100);
  }
}

import "./common.scss";
import rizzo from "rizzo-next/dist/rizzo";
import GlobalHeader from "rizzo-next/dist/components/header";
import GlobalFooter from "rizzo-next/dist/components/footer";
import FastClick from "fastclick";
import CookieUtil from "rizzo-next/dist/core/cookie_util";
import LoginManager from "rizzo-next/dist/components/login/login_manager";
import AdManager from "rizzo-next/dist/core/ads/ad_manager";
import Alert from "rizzo-next/dist/components/alert";
import "rizzo-next/dist/core/utils/preload";
import "rizzo-next/dist/core/utils/detect_swipe";
import "rizzo-next/dist/core/event_tracker";
import "rizzo-next/dist/components/ads";
import "rizzo-next/dist/components/svg_icons";
import "rc-slider/assets/index.css";

window.LP = window.LP || {};
window.LP.loginManager = new LoginManager();

// Create LP namespace if it isn"t there already
window.lp = window.lp || {};

rizzo.renderComponent(GlobalHeader, ".lp-global-header");
rizzo.renderComponent(GlobalFooter, ".lp-global-footer");

FastClick.attach(document.body);

if (process.env.NODE_ENV === "production") {
  require("trackjs");
}

const cookie = new CookieUtil();

// Show cookie notification for EU users
if (cookie.getCookie("lpCurrency") && cookie.getCookie("lpCurrency").match(/GBP|EUR/)) {
  rizzo.renderComponent(Alert, {
    el: "body",
    alert: {
      type: "default",
      text: "We use cookies to improve your experience on our website."
        + "You can update your settings",
      link_text: "here",
      link: "http://www.lonelyplanet.com/legal/cookies",
    },
  });
}

$.support.cors = true;

window.jQuery = $;
window.$ = $;

$.detectSwipe.preventDefault = false;

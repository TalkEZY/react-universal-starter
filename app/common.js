import rizzo from "rizzo-next/dist/rizzo";
import GlobalHeader from "rizzo-next/dist/components/header/header_component";
import GlobalFooter from "rizzo-next/dist/components/footer/footer_component";
import FastClick from "fastclick";
import LoginManager from "rizzo-next/dist/components/login/login_manager";
import "rizzo-next/dist/core/utils/preload";
import "rizzo-next/dist/core/utils/detect_swipe";
import postal from "postal";
import "./common.css";

if (process.env.NODE_ENV === "development") {
  postal.addWireTap((data, envelope) => {
    console.log(JSON.stringify(envelope));
  });
}

window.lp = window.lp || {};
window.lp.loginManager = new LoginManager();

// Create LP namespace if it isn"t there already
window.lp = window.lp || {};

rizzo.renderComponent(GlobalHeader, ".lp-global-header");
rizzo.renderComponent(GlobalFooter, ".lp-global-footer");

FastClick.attach(document.body);

if (process.env.NODE_ENV === "production") {
  require("trackjs");
}

$.support.cors = true;

window.jQuery = $;
window.$ = $;

$.detectSwipe.preventDefault = false;


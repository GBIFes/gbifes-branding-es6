var Sentry = require("@sentry/browser");
var gbifesjs = require("./settings");
var { locale } = require("./i18n_init");
var Cookies = require("js-cookie");

var user = Cookies.get("ALA-Auth");

if (typeof Sentry !== "undefined") {
  if (!gbifesjs.isDevel) {
    Sentry.init({ dsn: gbifesjs.sentryUrl });
    console.log("Sentry configured");
  }

  var user = Cookies.get("ALA-Auth", { domain: "gbif.es", path: "/" });

  if (typeof user !== "undefined") {
    Sentry.configureScope(function (scope) {
      scope.setUser({ email: user });
      console.log("Sentry setting email scope");
    });
  } else {
    console.log("Cannot set sentry email scope");
  }

  Sentry.configureScope(function (scope) {
    scope.setTag("page_locale", locale);
    console.log("Sentry setting lang scope");
  });

  const buildInfo = "$_BUILD";

  console.log(`sentry build info: ${buildInfo}`);

  Sentry.configureScope(function (scope) {
    scope.setExtra("gbif-es-build", buildInfo);
  });

  // Sentry test
  // myUndefinedFunction();
} else {
  console.log("Cannot use sentry, maybe is blocked");
}



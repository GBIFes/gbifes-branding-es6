import gbifesjs from './settings.js';

if (!gbifesjs.isDevel) {
  Sentry.init({ dsn: gbifesjs.sentryUrl });
  window.onload = function () {
    $( document ).ready(function() {
      // https://stackoverflow.com/questions/35722717/use-sentrys-raven-js-to-collect-all-http-errors
      // https://docs.sentry.io/clients/javascript/tips/#jquery-ajax-error-reporting
      $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
	Raven.captureMessage(thrownError || jqXHR.statusText, {
	  extra: {
	    type: ajaxSettings.type,
	    url: ajaxSettings.url,
	    data: ajaxSettings.data,
	    status: jqXHR.status,
	    error: thrownError || jqXHR.statusText,
	    response: jqXHR.responseText.substring(0, 100)
	  }
	});
      });
    });
  }
}

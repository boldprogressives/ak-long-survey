$(document).ready(function() {

  var css=document.createElement('link')
  css.setAttribute('rel', 'stylesheet')
  css.setAttribute('type', 'text/css')
  css.setAttribute('href', 'preview.css')
  document.getElementsByTagName('head')[0].appendChild(css)

  var bar = $('<div id="preview-bar"><ul><li><a href="househtml.html">house</a></li><li><a href="senatehtml.html">senate</a></li></ul></div>');

  
  $('body').append(bar);
});



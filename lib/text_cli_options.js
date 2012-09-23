(function(){
  var wordwrap, console_string, array_max, join$ = [].join;
  wordwrap = require('wordwrap');
  console_string = require('./console_string');
  array_max = function(arr){
    var x;
    x = [].concat(arr).sort(function(a, b){
      return b.length - a.length;
    });
    if (x.length) {
      return x[0];
    } else {
      return '';
    }
  };
  module.exports = function(settings, print){
    var rmargin, wrap, options_key_lmargin, title, lcol, lcol_out, longest_lcol, i, to$, rcol, l, k, rtext, rtext_lines, str_lcol, ret;
    settings || (settings = {});
    settings.options == null && (settings.options = {});
    settings.title == null && (settings.title = "Options:");
    settings.lmargin == null && (settings.lmargin = 0);
    settings.hmargin == null && (settings.hmargin = 1);
    settings.col1_lmarigin == null && (settings.col1_lmarigin = 2);
    settings.col2_lmarigin == null && (settings.col2_lmarigin = 2);
    settings.description == null && (settings.description = null);
    settings.align_right == null && (settings.align_right = false);
    settings.rmargin == null && (settings.rmargin = 80);
    rmargin = settings.rmargin;
    wrap = wordwrap(settings.lmargin, rmargin);
    options_key_lmargin = repeatString$(' ', settings.col1_lmarigin);
    title = wrap(settings.title) + "\n";
    if (settings.description) {
      console.log(settings.description + "\n");
    }
    lcol = Object.keys(settings.options);
    lcol_out = [];
    longest_lcol = array_max(lcol).length;
    settings.col1_width == null && (settings.col1_width = longest_lcol + 3);
    settings.col2_width == null && (settings.col2_width = rmargin - settings.col1_width - settings.col2_lmarigin);
    for (i = 0, to$ = lcol.length - 1; i <= to$; ++i) {
      lcol_out[i] = options_key_lmargin + lcol[i];
      lcol_out[i] = wordwrap(0, settings.col1_width)(lcol_out[i]);
    }
    rcol = Object.getOwnPropertyNames(settings.options);
    l = array_max(lcol_out).length;
    for (i = 0, to$ = lcol.length - 1; i <= to$; ++i) {
      k = lcol[i];
      if (settings.align_right === true) {
        lcol_out[i] = console_string.align_right(l, lcol_out[i]);
      }
      rtext = '';
      if (settings.options[k]) {
        rtext = settings.options[k];
      }
      rtext = wordwrap(0, settings.col2_width)(rtext);
      rtext_lines = rtext.split("\n").length;
      lcol_out[i] += repeatString$("\n", rtext_lines - 1);
      lcol_out[i] = console_string.override(settings.col1_width + settings.col2_lmarigin, lcol_out[i], rtext);
      lcol_out[i] += repeatString$("\n", settings.hmargin);
    }
    str_lcol = join$.call(lcol_out, "");
    ret = '';
    if (str_lcol.length) {
      ret = title + "\n" + str_lcol;
    }
    if (print) {
      return console.log(ret);
    } else {
      return ret;
    }
  };
  function repeatString$(str, n){
    for (var r = ''; n > 0; (n >>= 1) && (str += str)) if (n & 1) r += str;
    return r;
  }
}).call(this);

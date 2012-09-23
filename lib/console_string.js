(function(){
  var repeatString, split$ = ''.split, join$ = [].join, replace$ = ''.replace;
  repeatString = require('./repeatString');
  module.exports = {
    repeatString: repeatString,
    space_fill: function(rmax, str, fill_char){
      var arr_str, i, to$, s, spaces, m;
      fill_char || (fill_char = ' ');
      str = str.replace(/\r\n/, "\n");
      arr_str = split$.call(str, "\n");
      for (i = 0, to$ = arr_str.length - 1; i <= to$; ++i) {
        s = arr_str[i];
        if (fill_char == ' ') {
          (spaces = 0) || (m = s.match(/([ ]+)$/)) && (spaces = m[1].length);
        } else {
          spaces = 0;
        }
        s = s.substr(0, s.length) + this.repeatString(fill_char, parseInt((rmax - s.length - spaces) / fill_char.length));
        arr_str[i] = s;
      }
      return join$.call(arr_str, "\n");
    },
    override: function(rmax, lstr, rstr){
      var arr_lstr, arr_rstr, arr_new, i, to$, l, r;
      lstr = lstr.replace(/\r\n/, "\n");
      rstr = rstr.replace(/\r\n/, "\n");
      lstr = this.space_fill(rmax, lstr);
      arr_lstr = lstr.split("\n");
      arr_rstr = rstr.split("\n");
      arr_new = [];
      for (i = 0, to$ = lstr.length - 1; i <= to$; ++i) {
        l = arr_lstr[i];
        r = arr_rstr[i];
        if (r == null) {
          if (l) {
            arr_new.push(l);
          }
          break;
        }
        arr_new.push(l.substr(0, rmax) + r);
      }
      if (arr_new.length > 1) {
        return join$.call(arr_new, "\n");
      } else {
        return arr_new[0];
      }
    },
    align_right: function(stop, text){
      var arr_text, k, to$, t, lstr, rstr, d, m, l, s;
      text = text.replace(/\r\n/, "\n");
      arr_text = text.split("\n");
      for (k = 0, to$ = arr_text.length - 1; k <= to$; ++k) {
        t = arr_text[k];
        lstr = t.substr(0, stop);
        rstr = t.substr(stop, t.length);
        if (lstr.length < stop) {
          d = stop - lstr.length;
          lstr += repeatString$(' ', d);
        }
        if (m = lstr.match(/([ ]+)$/)) {
          l = m[1].length;
          s = repeatString$(' ', l);
          lstr = replace$.call(s + lstr, /[ ]+$/, '');
        }
        arr_text[k] = lstr + rstr;
      }
      return join$.call(arr_text, "\n");
    }
  };
  function repeatString$(str, n){
    for (var r = ''; n > 0; (n >>= 1) && (str += str)) if (n & 1) r += str;
    return r;
  }
}).call(this);

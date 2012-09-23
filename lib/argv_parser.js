(function(){
  var wordwrap, cli_options, parser, join$ = [].join, replace$ = ''.replace;
  wordwrap = require('wordwrap');
  cli_options = require('./text_cli_options');
  exports.parser = parser = (function(){
    parser.displayName = 'parser';
    var prototype = parser.prototype, constructor = parser;
    prototype.name = 'name_undefined';
    prototype.booleans = {};
    prototype.defaults = {};
    prototype.aliases = {};
    prototype.descriptions = {};
    prototype.examples = [];
    prototype.raw_argv = null;
    prototype.argv = {};
    prototype.parsed = false;
    prototype.show = {};
    function parser(settings){
      var name, o, k, value, ref$, to$, a, x;
      settings.aliases || (settings.aliases = {});
      settings.booleans || (settings.booleans = []);
      settings.defaults || (settings.defaults = {});
      settings.examples || (settings.examples = {});
      settings.descriptions || (settings.descriptions = {});
      settings.options || (settings.options = {});
      settings.display_settings || (settings.display_settings = {});
      settings.dependencies || (settings.dependencies = []);
      if (settings.argv) {
        this.set_argv(settings.argv);
      }
      if (Object.keys(settings.options).length > 0) {
        for (name in settings.options) {
          o = settings.options[name];
          for (k in o) {
            value = o[k];
            switch (k) {
            case 'boolean':
              if (value === true) {
                (settings.booleans || (settings.booleans = [])).push(name);
              }
              break;
            case 'alias':
              (ref$ = settings.aliases || (settings.aliases = {}))[name] || (ref$[name] = []);
              if (!(value instanceof Array)) {
                value = [value];
              }
              (ref$ = settings.aliases)[name] = ref$[name].concat(value);
              break;
            case 'description':
              (settings.descriptions || (settings.descriptions = {}))[name] = value;
              break;
            case 'default':
              (settings.defaults || (settings.defaults = {}))[name] = value;
            }
          }
        }
      }
      this.set_aliases(settings.aliases);
      this.set_defaults(settings.defaults);
      this.set_descriptions(settings.descriptions);
      this.set_examples(settings.examples);
      this.set_booleans(settings.booleans);
      this.display_settings = settings.display_settings;
      this.dependencies = settings.dependencies;
      this.convert_number = settings.convert_number;
      this.filename = settings.filename;
      for (k in settings) {
        if (k.match(/^show_/)) {
          if (settings[k] instanceof Function) {
            this[k] = settings[k];
          } else if (!settings[k]) {
            this[k] = fn$;
          }
        }
      }
      for (k = 0, to$ = (a = ['defaults', 'usage', 'examples', 'options', 'help', 'dependencies']).length - 1; k <= to$; ++k) {
        x = a[k];
        (fn1$.call(this, x, k));
      }
      function fn$(){}
      function fn1$(x, k){
        var this$ = this;
        this.show[x] = function(){
          return this$["show_" + x].apply(this$, arguments);
        };
      }
    }
    prototype.set_booleans = function(booleans){
      var k, b, results$ = [];
      if (booleans != null && !(booleans instanceof Array)) {
        booleans = [booleans];
      }
      for (k in booleans) {
        b = booleans[k];
        results$.push(this.booleans[b] = true);
      }
      return results$;
    };
    prototype.set_defaults = function(defaults){
      import$(this.argv, defaults);
      return import$(this.defaults, defaults);
    };
    prototype.set_examples = function(examples){
      this.examples = examples;
    };
    prototype.set_aliases = function(aliases){
      var k;
      for (k in aliases) {
        if (!(aliases[k] instanceof Array)) {
          aliases[k] = [aliases[k]];
        }
      }
      return this.aliases = aliases;
    };
    prototype.set_descriptions = function(descriptions){
      this.descriptions = descriptions;
    };
    prototype.string_override = function(lstr, rstr){};
    prototype.with_dashes = function(k){
      if (k.length > 1) {
        return "--" + k;
      } else {
        return "-" + k;
      }
    };
    prototype.show_usage = function(){
      return this.show_help();
    };
    prototype.show_help = function(){
      this.show_options();
      this.show_defaults();
      return this.show_examples();
    };
    prototype.show_dependencies = function(){
      var k, results$ = [];
      for (k in this.dependencies) {
        results$.push(console.log((k + ": ") + this.dependencies[k]));
      }
      return results$;
    };
    prototype.show_options = function(){
      var keys, keys_out, options, i, to$, k, a, ref$, opt, this$ = this;
      keys = Object.keys(this.descriptions);
      keys_out = Object.keys(this.descriptions);
      options = {};
      for (i = 0, to$ = keys_out.length - 1; i <= to$; ++i) {
        k = keys_out[i];
        keys_out[i] = this.with_dashes(k);
        if (a = this.aliases[k]) {
          if (a instanceof Array) {
            a = a.map(fn$);
            a = join$.call(a, ', ');
          } else {
            a = this.with_dashes(a);
          }
          keys_out[i] = this.with_dashes(k) + (", " + a);
        } else {
          keys_out[i] = this.with_dashes(k);
        }
        options[keys_out[i]] = this.descriptions[keys[i]];
      }
      opt = import$({
        title: "Options:",
        options: options,
        hmargin: 2
      }, (ref$ = this.display_settings).options || (ref$.options = {}));
      return cli_options(opt, true);
      function fn$(it){
        return this$.with_dashes(it);
      }
    };
    prototype.show_defaults = function(){
      var defaults, k, ref$, opt;
      defaults = {};
      for (k in this.defaults) {
        defaults[k] = this.defaults[k] + " [" + typeof this.defaults[k] + "]";
      }
      opt = import$({
        title: "Defaults:",
        options: defaults
      }, (ref$ = this.display_settings).defaults || (ref$.defaults = {}));
      return cli_options(opt, true);
    };
    prototype.show_examples = function(){
      var filename, name, examples, k, ref$, opt;
      filename = this.filename || module.parent.filename;
      name = require('path').basename(filename);
      examples = {};
      if (this.examples instanceof Array) {
        for (k in this.examples) {
          examples[this.examples[k]] = '';
        }
      } else {
        for (k in this.examples) {
          examples[name + " " + k] = this.examples[k];
        }
      }
      opt = import$({
        title: "Examples:",
        options: examples,
        align_right: false
      }, (ref$ = this.display_settings).examples || (ref$.examples = {}));
      return cli_options(opt, true);
    };
    prototype.show_nice_argv = function(){
      var k;
      if (Object.keys(this.argv).length > 0) {
        console.log("argv: {");
        for (k in this.argv) {
          console.log("\t" + k + ": " + this.argv[k]);
        }
        return console.log("}");
      } else {
        return console.log("argv: {}");
      }
    };
    prototype.set_argv = function(argv){
      return this.raw_argv = argv;
    };
    prototype.parse = function(){
      var argv, k, a, m, s, l, alias, i, b, dash_b, to$, _argv;
      if (this.raw_argv === null) {
        this.set_argv(process.argv.slice(2));
      }
      argv = [].concat(this.raw_argv);
      for (k in argv) {
        a = argv[k];
        if (m = a.match(/^-([A-z]+)/)) {
          if ((s = m[1].split('')).length > 1) {
            argv = argv.slice(0, k).concat(argv.slice(k + 1));
            this.set_booleans(s);
            for (k in s) {
              s[k] = "-" + s[k];
            }
            argv = argv.concat(s);
          }
        }
      }
      for (k in this.aliases) {
        for (l in this.aliases[k]) {
          alias = this.aliases[k][l];
          if ((i = argv.indexOf(this.with_dashes(alias))) !== -1) {
            argv[i] = this.with_dashes(k);
          }
        }
      }
      for (b in this.booleans) {
        dash_b = this.with_dashes(b);
        if ((i = argv.indexOf(dash_b)) !== -1) {
          argv = argv.slice(0, i).concat(argv.slice(i + 1));
          this.argv[b] = true;
        } else if ((i = argv.indexOf("--not-" + b)) !== -1) {
          argv = argv.slice(0, i).concat(argv.slice(i + 1));
          this.argv[b] = false;
        } else {
          this.argv[b] = null;
        }
      }
      for (k = 0, to$ = argv.length - 1; k <= to$; ++k) {
        a = argv[k];
        if (a != null && (m = a.match(/^(--|-)/))) {
          a = replace$.call(a, RegExp('^' + m[1]), '');
          if (argv[k + 1] != null && !argv[k + 1].match(/^(--|-)/)) {
            this.argv[a] = argv[k + 1];
            argv[k] = null;
            argv[k + 1] = null;
            k++;
          } else {
            this.argv[a] = null;
            argv[k] = null;
          }
        }
      }
      for (k in this.aliases) {
        for (l in this.aliases[k]) {
          alias = this.aliases[k][l];
          this.argv[alias] = this.argv[k];
        }
      }
      _argv = [].concat(argv);
      argv = [];
      for (k = 0, to$ = _argv.length - 1; k <= to$; ++k) {
        if (typeof _argv[k] !== 'undefined' && _argv[k] !== null) {
          argv.push(_argv[k]);
        }
      }
      this.argv._ = argv;
      return this.argv;
    };
    return parser;
  }());
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
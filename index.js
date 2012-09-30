(function(){
  var fs, path_helper, get_cli_settings;
  fs = require('fs');
  require('js-yaml');
  path_helper = require('path');
  get_cli_settings = function(path){
    var dir, stats, _dir, c, k, to$, _path, i$, ref$, len$, ext, __path, cli, e;
    dir = path;
    if (fs.existsSync(path)) {
      stats = fs.statSync(path);
      if (stats.isFile()) {
        dir = path_helper.dirname(dir);
      }
    }
    dir = dir.replace(/\\/g, '/');
    _dir = dir.split('/');
    c = _dir.length;
    for (k = 0, to$ = c - 1; k <= to$; ++k) {
      _path = _dir.join('/');
      _dir.pop();
      _path += '/CLI.';
      for (i$ = 0, len$ = (ref$ = ['json', 'yaml']).length; i$ < len$; ++i$) {
        ext = ref$[i$];
        __path = _path + ext;
        if (fs.existsSync(__path)) {
          try {
            cli = require(__path);
            break;
          } catch (e$) {
            e = e$;
            console.error("Cannot load " + __path + ": " + e);
          }
        }
      }
    }
    return cli;
  };
  module.exports = function(cli_options){
    var dir, _cli_options, cli_version, package_json, e, ref$, argv_parser, argv, i$, len$, k;
    cli_options || (cli_options = {});
    dir = require('path').dirname(module.parent.filename);
    _cli_options = get_cli_settings(dir);
    import$(cli_options, _cli_options);
    cli_options.aliases || (cli_options.aliases = {});
    cli_options.booleans || (cli_options.booleans = []);
    cli_options.defaults || (cli_options.defaults = {});
    cli_options.examples || (cli_options.examples = {});
    cli_options.descriptions || (cli_options.descriptions = {});
    cli_version = cli_options.version;
    if (!cli_options.no_default) {
      if (fs.existsSync(dir + "/package.json")) {
        try {
          package_json = require(dir + "/package.json");
          if (!cli_version) {
            cli_version = package_json.name + " " + package_json.version;
          }
          cli_options.dependencies = package_json.dependencies || (package_json.dependencies = {});
        } catch (e$) {
          e = e$;
          console.log("No package.json found");
          cli_version = '';
        }
      }
    }
    if (cli_version !== null) {
      (cli_options.booleans || (cli_options.booleans = [])).push('version');
    }
    if (!cli_options.no_default) {
      cli_options.booleans = cli_options.booleans.concat(['examples', 'defaults', 'help', 'options', 'dependencies']);
      ref$ = cli_options.descriptions;
      ref$.examples = "Show code examples";
      ref$.defaults = "Show default command line values";
      ref$.help = "Show help";
      ref$.version = "Show version";
      (ref$ = cli_options.aliases).help || (ref$.help = []);
      (ref$ = cli_options.aliases).help = ref$.help.concat(['usage', 'h']);
    }
    argv_parser = new (require('./lib/argv_parser').parser)(cli_options);
    argv_parser.parse();
    argv = argv_parser.argv;
    if (argv.version && cli_version !== null) {
      console.log(cli_version);
    }
    for (i$ = 0, len$ = (ref$ = ['help', 'examples', 'defaults', 'options', 'dependencies']).length; i$ < len$; ++i$) {
      k = ref$[i$];
      if (argv[k]) {
        console.log(cli_version + "\n");
        argv_parser.show[k]();
        break;
      }
    }
    return argv_parser;
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

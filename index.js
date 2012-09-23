(function(){
  var fs;
  fs = require('fs');
  module.exports = function(cli_options){
    var dir, yaml_path, json_path, e, cli_version, package_json, ref$, argv_parser, argv, i$, len$, k;
    dir = require('path').dirname(module.parent.filename);
    if (cli_options == null) {
      yaml_path = dir + '/CLI.yaml';
      json_path = dir + '/CLI.json';
      if (fs.existsSync(yaml_path)) {
        require('js-yaml');
        try {
          cli_options = require(yaml_path);
        } catch (e$) {
          e = e$;
          console.error("Could not get CLI.yaml");
          console.error("Yaml: " + e);
        }
      } else if (fs.existsSync(json_path)) {
        try {
          cli_options = require(json_path);
        } catch (e$) {
          e = e$;
          console.error("Could not get CLI.json");
          console.error("Json: " + e);
        }
      }
    }
    if (!cli_options) {
      cli_options = {};
    }
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
}).call(this);

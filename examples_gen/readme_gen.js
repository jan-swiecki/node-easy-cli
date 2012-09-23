(function(){
  var exec, fs, example_name, x, cmd_prefix, cmd, readme_md, out, _exec, join$ = [].join, split$ = ''.split;
  exec = require('child_process').exec;
  fs = require('fs');
  example_name = "example2";
  if (x = process.argv[2]) {
    example_name = x;
  }
  cmd_prefix = "node " + example_name + ".js";
  cmd = ["cat " + example_name + ".js", "cat CLI.json", cmd_prefix + "", cmd_prefix + " -x", cmd_prefix + " --bool", cmd_prefix + " -z 5 -x", cmd_prefix + " --opt 5 -x 12345", cmd_prefix + " aaaaa -z bbbbb ccccc ddddd", cmd_prefix + " aaaaa -x bbbbb ccccc ddddd", cmd_prefix + " -abcdefx --12345 67890", "cat header_src.html > " + example_name + ".html && markdown " + example_name + ".md >> " + example_name + ".html && cat footer_src.html >> " + example_name + ".html"];
  readme_md = example_name + ".md";
  fs.writeFileSync(readme_md, '');
  out = '';
  _exec = function(p){
    if (cmd[p + 1] == null) {
      fs.writeFileSync(readme_md, out, 'utf8');
      exec(cmd[p]);
      return;
    }
    return exec(cmd[p], function(arg$, stdout){
      var this$ = this;
      console.log("$ " + cmd[p]);
      out += "### `" + cmd[p] + "`\n\n";
      out += join$.call((split$.call(stdout, "\n")).map(function(it){
        return "\t" + it;
      }), "\n") + "\n";
      return _exec(p + 1);
    });
  };
  _exec(0);
}).call(this);

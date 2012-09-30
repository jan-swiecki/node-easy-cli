## Easy-CLI v0.1.1 (beta)

Easy Command Line Interface NodeJS module.

`easy-cli`:

* Easy `process.argv` handling. Install and forget.

* Automatically adds support for `--version`, `--usage`, etc. command line options by using `package.json` file and user provided simple optional settings.

* Supports boolean values

You can learn easy-cli fast by reading **basic usage** below. You can see examples too: [example1](examples/example.md), [example2](examples/example.md).

### Installation

`npm install easy-cli`

### Basic usage

	// program.js

	var easy_cli = require('easy-cli');
	var cli = easy_cli();

	var argv = cli.argv

&nbsp;

	// CLI.json
	{
		// non-value options
		// i.e. --opt     => argv.opt==true
		//      --not-opt => argv.opt==false
		//      --opt abc => argv.opt==true
		"booleans": ["bool", "opt"],

		// clone values across aliases
		// i.e. argv.bool == argv.x
		//      argv.z    == argv.opt == argv.a
		"aliases":
		{
			"bool": "x",
			"z": ["opt", "a"]
		},
		"defaults":
		{
			"z": 123,
			"a": "def"
		},
		"descriptions":
		{
			"bool": "Awesome boolean",

			// support for long string
			"z": "Lorem ipsum irure reprehenderit p... "
		},
		"examples":
		{
			"--opt": "Opt description",

			// support for VERY long string
			"--bool": "Lorem ipsum esse dolor mollit pariatur aliqua dolore exercitation dolor nulla quis qui in Ut esse mollit Ut veniam cupidatat est do labor... "
		}

&nbsp;

	// package.json
	{
		"name": "Program",
		"version": "0.1.0"
	}

&nbsp;

	$ node program.js --version
	Program 0.1.0

&nbsp;

	$ node program.js --help
	Options:

	             --bool, -x   Awesome boolean
	          -z, --opt, -a   Lorem ipsum irure reprehenderit proident nisi labore
	                          culpa adipisicing adipisicing pariatur ut eiusmod
	                          dolor proident id occaecat tempor ut pariatur in
	                          dolor minim nulla sint sunt do ut.
	             --examples   Show code examples
	             --defaults   Show default command line values
	  --help, --options, -h   Show help
	              --version   Show version

	Defaults:

	  z   123 [number]
	  a   def [string]

	Examples:

	   index.js --opt   Opt description
	  index.js --bool   Lorem ipsum esse dolor mollit pariatur aliqua dolore
	                    exercitation dolor nulla quis qui in Ut esse mollit Ut
	                    veniam cupidatat est do laboris pariatur dolore eiusmod
	                    elit sed ut reprehenderit exercitation ea et quis dolor
	                    exercitation non amet eu in elit cillum non et magna elit
	                    est elit enim amet fugiat Duis ad aute laboris elit
	                    pariatur labore tempor consectetur mollit in exercitation
	                    reprehenderit labore adipisicing non laboris id tempor
	                    eiusmod enim irure ut ullamco non consequat dolor Excepteur
	                    irure dolore laborum Ut in elit officia amet aute sit
	                    proident qui dolor sunt dolor aute irure ut ad ex in aliqua
	                    incididunt cillum in tempor non cupidatat pariatur labore
	                    commodo eu pariatur enim reprehenderit in culpa in commodo
	                    consectetur cillum mollit nisi dolore labore velit est
	                    ullamco eiusmod exercitation veniam amet in cupidatat
	                    ullamco proident anim ex dolore elit non do quis ex culpa
	                    officia id dolor aliqua elit sed ut cupidatat consequat
	                    sint enim sed mollit reprehenderit nulla cillum voluptate
	                    commodo magna sit sit veniam deserunt reprehenderit est
	                    mollit ex aute dolore minim sint irure ut ea Duis enim
	                    fugiat dolore ad aliqua consequat deserunt ut aliqua in
	                    deserunt labore do ad laborum magna officia ea laboris
	                    ullamco dolore ut dolore dolor nisi in dolore minim sed
	                    tempor occaecat culpa ut qui exercitation ea aute magna id
	                    eiusmod officia occaecat irure reprehenderit nulla
	                    consequat cillum minim occaecat commodo Duis mollit irure
	                    sint fugiat voluptate eu enim sunt Excepteur anim cillum
	                    deserunt exercitation incididunt elit Ut ex veniam aute ex
	                    pariatur nostrud cillum laboris nisi culpa adipisicing
	                    dolor enim cillum do ea adipisicing labore in laborum esse
	                    elit sint eiusmod proident amet eu adipisicing mollit
	                    veniam quis quis aliquip ut Ut veniam culpa et magna qui
	                    reprehenderit do sint.


### Default options

You can remove below behaviour by using `easy_cli({no_defaults: true})`.

You can override below behaviour by using `easy_cli({show_xxx: function() { /* your stuff */ }})` where `xxx` is one of `version`,`defaults`,`help`,`options`,`examples`.

* `--version`

 If there is `package.json` in the folder then

		var j = require('./package.json');
		console.log j.name + " " + j.version;
		process.exit(0);


* `--options`, `--help`

 Display help generated from `CLI.json` or `CLI.yaml` or provided settings (see below).

* `--defaults`

 Display default values from `CLI.json` or `CLI.yaml` or provided settings (see below).

* `--examples`

 Display default examples from `CLI.json` or `CLI.yaml` or provided settings (see below).

## API

### Introduction

`program.js`:
	
	// program.js

	var easy_cli = require('easy-cli');
	var cli = easy_cli();

Object `cli` exposes the following properties:

* [Object] `cli.argv` with **key**, **value** pairs from command line. `cli.argv._` stores *non*-key values.

 E.g. `node program.js abc -x 5` => `cli.argv == {x: 5, _: ['abc']}`

### Settings

`easy_cli` function accepts `settings` object as a parameter. If there are no settings defined then `easy_cli` will try to load settings object from `CLI.yaml` or `CLI.json` file (which will be searched in the directory tree up to the disk root).

`settings` object can have the following properties:

* `settings.aliases`
* `settings.booleans`
* `settings.defaults`
* `settings.examples`
* `settings.descriptions`
* `settings.no_defaults`
* `settings.display_settings`
* `settings.argv`

### settings.aliases (instanceof Object)

 Maps **keys** into corresponding `String alias`|`Array aliases`

 Aliases clone other **key**, **value** pairs (e.g. if we have `y` as the alias of `x` then `-y 5` in command line will save as `cli.argv.x = 5` and `cli.argv.y = 5`).

 E.g.

	 	settings.aliases = {
	 		x: ['y', 'z'],
	 		opt: 'opt2'
	 	}

 In the above example `node program.js -x 5` and `node program.js -y 5` is the same action. In other words after you define aliases you forget which **key** is alias and which is not alias. Aliases in `cli.argv` are indistinguishable from their non-alias counterparts, but values are the same!.

### settings.booleans (instanceof Array)

Array of **keys** that will be treated as booleans i.e. if a boolean key is encounter in the command line then it will be saved as `cli.argv. ... = true`.

E.g.

	settings.booleans = ['asd']

	...

	$ node program.js --asd xxx

will NOT make `cli.argv.asd = "xxx"`, but `cli.argv.asd = true`, and

	$ node program.js whatever

will make `cli.argv.asd = null`, and

	$ node program.js --not-asd

will make `cli.argv.asd = false`.

### settings.defaults (instanceof Object)

Maps **keys** to their default values. If **key** defined in `settings.defaults` is not in the command line then it will be stored with its default value.

E.g.

	settings.defaults = {
		x: 5
	}

	...

	$ node program.js -y 7

	...

	cli.argv.x == 5
	cli.argv.y == 7

### settings.descriptions (instanceof Object)

Maps **keys** into their **descriptions**.

### settings.examples (instanceof Object)

Maps command line examples into string.

E.g.

	settings.examples = {
		'program.js -x 7': 'example of this action'
	}

### settings.no_defaults (typeof 'bool')

If set to `true` then default behaviour for `--version`, `--help`, etc. is removed.

### settings.display_settings (instanceof Object)

`settings.display_settings` can have the following properties:

`settings.display_settings.options` corresponds to `cli.show_options()`, `--options`
`settings.display_settings.defaults` corresponds to `cli.show_defaults()`, `--defaults`
`settings.display_settings.examples` corresponds to `cli.show_examples()`, `--examples`

Below are default properties for `settings.display_settings.options`.

	title         : "Options: "
	lmargin       : 0 // left margin
	hmargin       : 1 // number of newlines between lines
	col1_lmarigin : 2 // left column left margin
	col2_lmarigin : 2 // right column left margin
	description   : null // text under `title`
	align_right   : false // right align left column?
	rmargin       : 80 // terminal (console) width

Except for `title` same default properties apply to other `display_settings`.

### settings.argv (array of string)

If this option is set then parser will use `settings.argv` instead of `process.argv.slice(2)`.

E.g. `settings.argv = ['-x', '123', '--opt']` will simulate `$ node program.js -x 123 --opt`.

## Parsing command line rules

	$ node program.js option1 option2 ... optionN ... optionL

* `optionN` is separated with spaces from surrounding options

* `optionL` is the last option entered in command line (e.g. `node program.js -a bcd --efg hij` then `optionL` is `hij`).

* `optionN` is parsed as following:

 * `optionN` that is a non-space string (e.g. `abcd`) **or** string wrapped in double quotes `"` (e.g. `"a b c d"`) is considered **valueN**. (RegExp: `/(?P<value>[^\ ]+|"[ ]+")/`)

 * If `optionN` begins with `-` followed by one *non*-`-`, *non*-space character then this character is considered **keyN**. (RegExp: `/-(?P<key>[^-\ ])/`)

 * If `optionN` begins with `--` followed by *non*-empty, *non*-space string (e.g. `--x`, `--xy`) then this string is considered **keyN**. (RegExp: `/--(?P<key>[^\ ]+)/`)

 * If `optionN` begins with `-` followed by two or more *non*-`-`, *non*-space characters then these characters are considered **multi-boolean** (see below). (RegExp: `/-(?P<multiboolean>[^-\ ]+)/`)

 * If **all** below statements are true
 
  * 1 < `N` < `L`
  * `optionN` is **keyN**
  * `optionN+1` is **valueN+1**
 
  then **valueN+1** is considered a value of **keyN** and both are stored as `cli.argv.keyN = valueN+1` (e.g. `-x abc` --> `cli.argv.x = "abc"`).

All single characters from **Multi-boolean** option (see `optionN` definition) are treated as boolean keys **except** characters that have *non*-boolean aliases.

--

### Changelog

* 0.1.2
 Program will search for `CLI.yaml` and `CLI.json` in the directory tree up to the disk root.

* 0.1.1
 Added `easy_cli().argv_not_null` containing `easy_cli().argv` without `null` variables.
 Added `easy_cli().argv_no_alias` containing `easy_cli().argv` without aliases.

--

### Inspiration from [substack/node-optimist](https://github.com/substack/node-optimist)

### Dependends on

* [substack/wordwrap](https://github.com/substack/node-wordwrap)
* [nodeca/js-yaml](https://github.com/nodeca/js-yaml)

### Developed using awesome [coco language](https://github.com/satyr/coco/).

### `cat example.js`

	var easy_cli = require('../index');
	
	var cli_options =
	{
		booleans: ['bool'],
		aliases:
		{
			bool: 'x',
			z: ['opt', 'a']
		},
		descriptions:
		{
			boolean: 'awesome boolean',
			options: 'Lorem ipsum'
		}
	};
	
	var cli = easy_cli(cli_options);
	
	console.log(cli.argv);
	
### `node example.js`

	{ bool: null,
	  version: null,
	  examples: null,
	  defaults: null,
	  help: null,
	  options: null,
	  dependencies: null,
	  x: null,
	  opt: undefined,
	  a: undefined,
	  usage: null,
	  h: null,
	  _: [] }
	
### `node example.js -x`

	{ bool: true,
	  version: null,
	  examples: null,
	  defaults: null,
	  help: null,
	  options: null,
	  dependencies: null,
	  x: true,
	  opt: undefined,
	  a: undefined,
	  usage: null,
	  h: null,
	  _: [] }
	
### `node example.js --bool`

	{ bool: true,
	  version: null,
	  examples: null,
	  defaults: null,
	  help: null,
	  options: null,
	  dependencies: null,
	  x: true,
	  opt: undefined,
	  a: undefined,
	  usage: null,
	  h: null,
	  _: [] }
	
### `node example.js -z 5 -x`

	{ bool: true,
	  version: null,
	  examples: null,
	  defaults: null,
	  help: null,
	  options: null,
	  dependencies: null,
	  z: '5',
	  x: true,
	  opt: '5',
	  a: '5',
	  usage: null,
	  h: null,
	  _: [] }
	
### `node example.js --opt 5 -x 12345`

	{ bool: true,
	  version: null,
	  examples: null,
	  defaults: null,
	  help: null,
	  options: null,
	  dependencies: null,
	  z: '5',
	  x: true,
	  opt: '5',
	  a: '5',
	  usage: null,
	  h: null,
	  _: [ '12345' ] }
	
### `node example.js aaaaa -z bbbbb ccccc ddddd`

	{ bool: null,
	  version: null,
	  examples: null,
	  defaults: null,
	  help: null,
	  options: null,
	  dependencies: null,
	  z: 'bbbbb',
	  x: null,
	  opt: 'bbbbb',
	  a: 'bbbbb',
	  usage: null,
	  h: null,
	  _: [ 'aaaaa', 'ccccc', 'ddddd' ] }
	
### `node example.js aaaaa -x bbbbb ccccc ddddd`

	{ bool: true,
	  version: null,
	  examples: null,
	  defaults: null,
	  help: null,
	  options: null,
	  dependencies: null,
	  x: true,
	  opt: undefined,
	  a: undefined,
	  usage: null,
	  h: null,
	  _: [ 'aaaaa', 'bbbbb', 'ccccc', 'ddddd' ] }
	
### `node example.js -abcdefx --12345 67890`

	{ '12345': '67890',
	  bool: true,
	  version: null,
	  examples: null,
	  defaults: null,
	  help: null,
	  options: null,
	  dependencies: null,
	  a: undefined,
	  b: true,
	  c: true,
	  d: true,
	  e: true,
	  f: true,
	  x: true,
	  z: undefined,
	  opt: undefined,
	  usage: null,
	  h: null,
	  _: [] }
	

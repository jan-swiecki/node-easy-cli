### `cat example2.js`

	var easy_cli = require('../index');
	
	var cli = easy_cli();
	
	var argv_ = {};
	
	console.log("{");
	
	// display all non-null, non-undefined options
	for(k in cli.argv)
	{
		if(cli.argv[k] !== null && typeof cli.argv[k] !== 'undefined')
		{
			if(k == '_')
			{
				console.log("\t"+k+": ["+cli.argv[k]+"]");
			}
			else
			{
				console.log("\t"+k+": "+cli.argv[k]);
			}
		}
	}
	
	console.log("}");
	
### `cat CLI.json`

	{
		"booleans": ["bool", "opt"],
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
			"z": "Lorem ipsum irure reprehenderit proident nisi labore culpa adipisicing adipisicing pariatur ut eiusmod dolor proident id occaecat tempor ut pariatur in dolor minim nulla sint sunt do ut. "
		},
		"examples":
		{
			"--opt": "Opt description",
			"--bool": "Lorem ipsum esse dolor mollit pariatur aliqua dolore exercitation dolor nulla quis qui in Ut esse mollit Ut veniam cupidatat est do laboris pariatur dolore eiusmod elit sed ut reprehenderit exercitation ea et quis dolor exercitation non amet eu in elit cillum non et magna elit est elit enim amet fugiat Duis ad aute laboris elit pariatur labore tempor consectetur mollit in exercitation reprehenderit labore adipisicing non laboris id tempor eiusmod enim irure ut ullamco non consequat dolor Excepteur irure dolore laborum Ut in elit officia amet aute sit proident qui dolor sunt dolor aute irure ut ad ex in aliqua incididunt cillum in tempor non cupidatat pariatur labore commodo eu pariatur enim reprehenderit in culpa in commodo consectetur cillum mollit nisi dolore labore velit est ullamco eiusmod exercitation veniam amet in cupidatat ullamco proident anim ex dolore elit non do quis ex culpa officia id dolor aliqua elit sed ut cupidatat consequat sint enim sed mollit reprehenderit nulla cillum voluptate commodo magna sit sit veniam deserunt reprehenderit est mollit ex aute dolore minim sint irure ut ea Duis enim fugiat dolore ad aliqua consequat deserunt ut aliqua in deserunt labore do ad laborum magna officia ea laboris ullamco dolore ut dolore dolor nisi in dolore minim sed tempor occaecat culpa ut qui exercitation ea aute magna id eiusmod officia occaecat irure reprehenderit nulla consequat cillum minim occaecat commodo Duis mollit irure sint fugiat voluptate eu enim sunt Excepteur anim cillum deserunt exercitation incididunt elit Ut ex veniam aute ex pariatur nostrud cillum laboris nisi culpa adipisicing dolor enim cillum do ea adipisicing labore in laborum esse elit sint eiusmod proident amet eu adipisicing mollit veniam quis quis aliquip ut Ut veniam culpa et magna qui reprehenderit do sint. "
		}
	}
### `node example2.js`

	{
		z: 123
		a: 123
		opt: 123
		_: []
	}
	
### `node example2.js -x`

	{
		z: 123
		a: 123
		bool: true
		opt: 123
		x: true
		_: []
	}
	
### `node example2.js --bool`

	{
		z: 123
		a: 123
		bool: true
		opt: 123
		x: true
		_: []
	}
	
### `node example2.js -z 5 -x`

	{
		z: 5
		a: 5
		bool: true
		opt: 5
		x: true
		_: []
	}
	
### `node example2.js --opt 5 -x 12345`

	{
		z: 5
		a: 5
		bool: true
		opt: 5
		x: true
		_: [12345]
	}
	
### `node example2.js aaaaa -z bbbbb ccccc ddddd`

	{
		z: bbbbb
		a: bbbbb
		opt: bbbbb
		_: [aaaaa,ccccc,ddddd]
	}
	
### `node example2.js aaaaa -x bbbbb ccccc ddddd`

	{
		z: 123
		a: 123
		bool: true
		opt: 123
		x: true
		_: [aaaaa,bbbbb,ccccc,ddddd]
	}
	
### `node example2.js -abcdefx --12345 67890`

	{
		12345: 67890
		bool: true
		b: true
		c: true
		d: true
		e: true
		f: true
		x: true
		_: []
	}
	

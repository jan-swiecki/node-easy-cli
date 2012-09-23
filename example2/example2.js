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

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	/*
	 * Constructor
	 */
	constructor(args, opts) {
		super(args, opts);
	}	

	/* 
	 * Install
	 */
	install() {
		// npm install if install flag is present
		this.spawnCommandSync(
			"npm",
			["install"]
		)

		// buld using gulp with jekyll
		this.spawnCommandSync(
			"gulp",
			["build"]
		)

		// browsersync and host 
		this.spawnCommandSync(
			"gulp"
		)
	}

	/* 
	 * End
	 */
	end() {}
};
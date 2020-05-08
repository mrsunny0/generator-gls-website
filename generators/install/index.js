const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	/*
	 * Constructor
	 */
	constructor(args, opts) {
        super(args, opts);
        this.log("installing...")
	}	

    /*
	 * Install
	 */
	install() {
        this.spawnCommandSync('npm', ['install']) // install npm packages
        this.spawnCommandSync("bundle", ['install']); // install ruby gems
        this.spawnCommandSync("bundle", ["exec", "jekyll", "build"]) // build jekyll site
        this.spawnCommandSync("gulp", ['build'])
        this.spawnCommandSync("gulp") // serve jekyll site with browersync
	}

	end() {
		this.log("...tidying up!")
	}

};
const Generator = require('yeoman-generator');
const path = require('path')
const template_finder = require("../template_finder")

module.exports = class extends Generator {
	/*
	 * Constructor
	 */
	constructor(args, opts) {
        super(args, opts);
		this.log("copying files...")

		// provided by app generator
		this.option('sourceRoot', {
			type: String
		})
	}	

	/*
	 * Paths
	 */
	paths() {
		this.finder = template_finder(this.options.sourceRoot)
		this.sourceRoot(this.finder('root', ""))
	}

    /*
	 * Writing
	 */
	writing() {
		/* copy all necessary files, except yml and scss
		 * these include:
		 * - _includes
		 * - _layouts
		 * - src/img
		 * - src/js
		 * - src/scss; however, some files will be overriden in the template engine
		 * - all root folders except: README.md, package.json
		 */
		var folders = [
			"_includes",
			"_layouts",
			"src"
		]
		folders.forEach((f) => {
			this.fs.copy(
				this.templatePath(f),
				this.destinationPath(f)
			)
		})

		var files = [
			".gitignore",
			"Gemfile",
			"gulpfile.js",
			"index.html",	
		]
		files.forEach((f) => {
			this.fs.copy(
				this.templatePath(f),
				this.destinationPath(f)
			),
			{},
			{},
			{
				globOptions: {
					dot: true
				}
			}
		})
    }

	end() {
		this.log("...tidying up!")
	}

};
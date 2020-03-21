const Generator = require('yeoman-generator');
var path = require('path')

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
		console.log("initializing")
	}	

	paths() {
		var sourceRoot = this.sourceRoot()
		sourceRoot = path.join(sourceRoot, "../../../_templates")
		sourceRoot = path.join(sourceRoot, "template-gh-pages/")
		this.sourceRoot(sourceRoot)
		console.log(this.sourceRoot())
	}

	// async promptin() {}

	// configuring() {}

	default() {}

	writing() {
		this.fs.copyTpl(
			this.templatePath("**/*"),
			this.destinationPath()
		)
	}

	// conflicts() {}

	install() {
		this.spawnCommandSync('npm', ['install'])
		this.spawnCommandSync("bundle", ['install']);
		this.spawnCommandSync("bundle", ["exec", "jekyll", "build"])
		this.spawnCommandSync("gulp")
	}

	// end() {}

};
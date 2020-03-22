const Generator = require('yeoman-generator');
const path = require('path')

module.exports = class extends Generator {
	/*
	 * Constructor
	 */
	constructor(args, opts) {
        super(args, opts);
        this.log("copying files...")
	}	

	/*
	 * Paths
	 */
	paths() {
		// create root template folder path
		var sourceRoot = this.sourceRoot()
		sourceRoot = path.join(sourceRoot, "../../../templates")
		this.sourceRoot(sourceRoot)

		// store template folders
		this.template_folder = {
			root: "template-gh-pages",
			yml: "template-yml-files",
			scss: "template-scss-files"
		}

		// add function to change between template dirs
		var that = this
		this.cd_template = function(which, file) {
			return path.join(
				that.sourceRoot(),
				that.template_folder[which],
				file
			)	
		}
	}

    /*
	 * Writing
	 */
	writing() {
        // copy all necessary files, except yml and scss
		this.fs.copyTpl(
			this.templatePath(this.cd_template("root", "**/*")),
			this.destinationPath(),
			{},
			{},
			{
				globOptions: {
					ignore: ["**/*.yml", "**/*_vars.scss"], // ignore all yml files, and _var.scss
					dot: true,
				}
			}
		)
    }

	end() {
		this.log("...tidying up!")
	}

};
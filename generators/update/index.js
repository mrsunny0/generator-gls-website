const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs-extra');

module.exports = class extends Generator {
	/*
	 * Constructor
	 */
	constructor(args, opts) {
        super(args, opts);
        
        // get options (prompts) from parent generator
		// and subset the answers into this
		var options = this.options
		this.answers = options.answers   
		this.build = options.build         
	}	
	
    /*
    * Paths
    */
	paths() {
		// create root template folder path 
		var sourceRoot = this.sourceRoot() 
		sourceRoot = path.join(sourceRoot, "../../_templates")
		this.sourceRoot(sourceRoot)
	}
	
	/*
    * Writing
    */
    writing() {
		/* FILES NOT TO REPLACE
		 * - yml files
		 * - package.json
		 * - package-lock.json
		 * - Gemfile
		 * - Gemfile.lock
		 * - README.md
		 * - TODO.md
		 * - src/img files
		 * - src/video files
		 * - _includes/google-analytics.html
		 * - .git (original git repo)
		 */

		const filesToIgnore = [
			"**/*.yml",
			"**/.git",
			"**/package.json",
			"**/package-lock.json",
			"**/Gemfile",
			"**/Gemfile.lock",
			"**/README.md",
			"**/TODO.md",
			"**/src/img/*", // ignores only top level example images
			"**/src/video/*",
			"**/_includes/google*",
			"**/assets",
			"**/site"
		]

		//----------------------------------
		// Replace all files
		//----------------------------------
		var replace_all = () => {
			this.fs.copy(
				this.templatePath("template-gh-pages/**/*"), 
				this.destinationPath("."), 
				{
					globOptions: {
						ignore: filesToIgnore,
						dot: true
					}
				},
			)
		}

		//----------------------------------
		// Replace what is specified
		//----------------------------------
		var replace_files = () => {
			const update_files = this.answers.update_files
			update_files.forEach((file) => {
				this.fs.copy(
					this.templatePath("template-gh-pages/" + file),
					this.destinationPath("./" + file.replace("**/*", "")), // replace glob pattern
					{
						globOptions: {
							ignore: filesToIgnore,
							dot: true
						}
					}
				)
			})
		}

		//----------------------------------
		// Copy data file
		//----------------------------------
		var copy_data = () => {
			const data_files = [
				"package.json",
				"_config.yml",
				"_data/icons.yml",
				"_data/sections.yml",
				"_data/footer.yml"
			] 
			data_files.forEach((file) => {
				this.fs.copy(
					this.templatePath("template-gh-pages/" + file),
					this.destinationPath("./" + file.replace(/(\.\w+)$/i, '_ref$1'))
				)
				console.log(file)
			})
		}

		// replace all
		if (this.answers.update == "all") {
			replace_all()
		} 
		// replace only need selections
		else {
			replace_files()
		}

		console.log(this.answers.update_data)
		// make a copy of reference data if asked for
		if (this.answers.update_data) {
			copy_data()
		}
	}
	
    /* 
	 * Install
	 */
	install() {
		if (this.answers.build) {
			this.composeWith(
				require.resolve('../install')
			) 
		}
	}

	/* 
	 * End
	 */
	end() {
		console.log("...cleaning up update")
	}
};
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	/*
	 * Constructor
	 */
	constructor(args, opts) {
        super(args, opts);
        
        // get options (prompts) from parent generator
		var options = this.options
		console.log("update folder")
        console.log(options.answers)
        
    }	
    
    writing() {
		//----------------------------------
		// Copy some boilerplate code
		//----------------------------------
		var copy_files = () => {
			this.fs.copyTpl(
				this.templatePath("template-gh-pages/**/*"),
				this.destinationPath("."),
				{},
				{},
				{
					globOptions: {
						ignore: ["package-lock.json", "Gemfile.lock"],
						dot: true
					}
				}
			)
		}
		//----------------------------------
		// Template some files
		//----------------------------------
		var template_files = () => {
			
			// set up template
			var config_json = {
				project_name: this.answers.project_name,
				packagejson_name: this.answers.project_name.replace(/\s+/g, '-').toLowerCase(),
				author: this.answers.author,
				website_meta_title: this.answers.website_meta_title,
				website_header_title: this.answers.website_header_title,
				website_description: this.answers.website_description,
			}

			// create files
			var config_files = ["README.md", "_config.yml", "package.json"]
			config_files.forEach((file) => {
				this.fs.copyTpl(
					this.templatePath("template-gh-pages--override/" + file),
					this.destinationPath(file),
					config_json,
					{},
					{
						globOptions: {
							dot: true
						}
					}
				)
			})

			// create data files
			var data_files = ["icons.yml", "sections.yml"]
			data_files.forEach((file) => {
				this.fs.copyTpl(
					this.templatePath("template-gh-pages--override/" + file),
					this.destinationPath("./_data/" + file),
					{},
					{},
					{
						globOptions: {
							dot: true
						}
					}
				)
			})
		}

		// call functions (in order)
		// copy_files()
		// template_files()
    }

	/* 
	 * End
	 */
	end() {}
};
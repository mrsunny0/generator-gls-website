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
		copy_files()
		template_files()
	}
	
    /* 
	 * Install
	 */
	install() {
		if (this.build) {
			this.composeWith(
				require.resolve('../install')
			) 
		}
	}

	/* 
	 * End
	 */
	end() {
		console.log("...cleaning up create")
	}
};
const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs-extra');
const { stripIndent } = require("common-tags")

module.exports = class extends Generator {
	/*
	 * Constructor
	 */
	constructor(args, opts) {
		super(args, opts);

		// default answers
		this.option("default", {
			desc: "Default option",
			type: Boolean,
			default: false
		})

		// flag for install
		this.option("noinstall", {
			desc: "Enable full installation",
			type: Boolean,
			default: true
		})
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
	 * Prompt user for input
	 */
	async prompting() {
		const answers = await this.prompt([
		{
			type: "input",
			name: "project_name",
			message: "Project name",
			default: this.appname // Default to current folder name
		},
		{
			type: "input",
			name: "author",
			message: "Author",
			default: "George L. Sun"
		},
		{
			type: "input",
			name: "website_meta_title",
			message: "Website meta head title",
			default: "TITLE"
		},
		{
			type: "input",
			name: "website_header_title",
			message: "Website header title",
			default: "HEADER"
		},
		{
			type: "input",
			name: "website_description",
			message: "Project description",
			default: "DESCRIPTION"
		},
		{
			type: "confirm",
			name: "build",
			message: "Compile and build website?",
			default: true
		},
		]);
	
		// save answers
		this.answers = answers;
	}

	/* 
	 * Compose multiple generators
	 */
	writing() {
		//----------------------------------
		// Copy some boilerplate code
		//----------------------------------
		var copy_files = () => {
			this.fs.copyTpl(
				this.templatePath("template-gh-pages/**/*"),
				this.destinationPath("."),
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
		var config_json = {
			project_name: this.answers.project_name,
			packagejson_name: this.answers.project_name.replace(/\s+/g, '-').toLowerCase(),
			author: this.answers.author,
			website_meta_title: this.answers.website_meta_title,
			website_header_title: this.answers.website_header_title,
			website_description: this.answers.website_description,
		}

		var template_files = () => {
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
		if (!this.options.noinstall || this.answers.build) {
			if (this.answers.build === true) {
				this.composeWith(
					require.resolve('../install')
				) 
			}
		}
	}

    /* 
	 * End
	 */
	end() {
		this.log("...tidying up")
	}

};
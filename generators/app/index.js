const Generator = require('yeoman-generator');
const path = require('path');
const yaml = require("js-yaml");
const fs = require('fs');

module.exports = class extends Generator {
	/*
	 * Constructor
	 */
	constructor(args, opts) {
		super(args, opts);

		// flag for default (no question) option
		this.option("default", {
			desc: "Use empty template",
			type: Boolean,
			default: false
		})

		// flag for no install
		this.option("install", {
			desc: "Prevent full installation",
			type: Boolean,
			default: true
		})

		this.log("templating files...")
	}	

	/*
	 * Paths
	 */
	paths() {
		// create root template folder path
		var sourceRoot = this.sourceRoot()
		sourceRoot = path.join(sourceRoot, "../../../_templates")
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
	 * Prompt user for input
	 */
	async prompting() {
		const answers = await this.prompt([
		{
			type: "input",
			name: "name",
			message: "Your project name",
			default: this.appname // Default to current folder name
		},
		{
			type: "input",
			name: "header_name",
			message: "Your website header name",
			default: this.appname
		},
		{
			type: "input",
			name: "main_color",
			message: "what color theme would you like?",
			default: "#000"
		},
		{
			type: "checkbox",
			name: "icons",
			message: "Which icons do you want in your header?",
			choices: ["email", "github", "linkedin", "twitter", "instagram", "scholar"]
		}
		]);
	
		// save answers
		this.answers = answers;
	}

	// configuring() {}

	// default() {}

	writing() {
		var icon_yml = yaml.safeLoad(
			fs.readFileSync(
				this.cd_template(
					"yml",
					"icons-template.yml"
				), 'utf-8'
			)
		)
				
		// template icon yml file
		this.fs.write(
			this.destinationPath(path.join("_data", "icons.yml")),
			yaml.safeDump(icon_yml)
		)

		// template sections yml file

		// template SCSS var values (e.g. color)
		this.fs.copyTpl(
			this.templatePath(this.cd_template("scss", "scss-template.scss")),
			this.destinationPath(path.join("src", "scss", "_vars.scss")),
			{
				main_color: this.answers.main_color
			}
		)
	}

	// conflicts() {}

	install() {
		if (this.option.install) {
			this.spawnCommandSync('npm', ['install']) // install npm packages
			this.spawnCommandSync("bundle", ['install']); // install ruby gems
			this.spawnCommandSync("bundle", ["exec", "jekyll", "build"]) // build jekyll site
			this.spawnCommandSync("gulp") // serve jekyll site with browersync
		} else {
			this.log("--install=false; skipping install")
		}
	}

	end() {
		this.log("...tidying up")
	}

};
const Generator = require('yeoman-generator');
const path = require('path');
const yaml = require("js-yaml");
const fs = require('fs-extra');
const template_finder = require("../template_finder")

console.log(template_finder)

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
			default: false
		})

		this.log("templating files...")
	}	

	/*
	 * Paths
	 */
	paths() {
		// create root template folder path
		var sourceRoot = this.sourceRoot()
		sourceRoot = path.join(sourceRoot, "../../../templates")
		this.sourceRoot(sourceRoot)
		this.finder = template_finder(this.sourceRoot())
	}

	/*
	 * Prompt user for input
	 */
	async prompting() {
		const answers = await this.prompt([
		{
			type: "input",
			name: "name",
			message: "Website name",
			default: this.appname // Default to current folder name
		},
		{
			type: "input",
			name: "author",
			message: "Website author",
			default: ""
		},
		{
			type: "input",
			name: "description",
			message: "Website description",
			default: ""
		},
		{
			type: "input",
			name: "header",
			message: "Website header name",
			default: this.appname
		},
		{
			type: "input",
			name: "main_color",
			message: "What color theme would you like?",
			default: "#000"
		},
		{
			type: "checkbox",
			name: "icons",
			message: "Which icons do you want in your header?",
			choices: ["email", "github", "linkedin", "twitter", "instagram", "scholar"],
			default: []
		}
		]);
	
		// save answers
		this.answers = answers;
	}

	/* 
	 * Compose multiple generators
	 */
	writing() {
		// copy all non-template files using sub-generator
		this.composeWith(
			// "gls-website:copy",
			require.resolve(path.join(__dirname, "..", "copy")),
			{
				sourceRoot: this.sourceRoot()
			}
		)
		
		// read in template yaml data
		var icon_yml = yaml.safeLoad(
			fs.readFileSync(
				this.finder(
					"yml",
					"icons-template.yml"
				), 'utf-8'
			)
		)
				
		// config
		// read package.json and .git/config for metadata
		this.fs.copyTpl(
			this.templatePath(
				this.finder("yml", "config-template.yml")
			),
			this.destinationPath("_config.yml"),
			{
				title: this.answers.name,
				description: "",
				gh_page: "",
				header: this.answers.header
			}
		)

		// template icon yml file
		this.fs.write(
			this.destinationPath(path.join("_data", "icons.yml")),
			yaml.safeDump(icon_yml)
		)

		// template sections yml file
		this.fs.copyTpl(
			this.templatePath(
				this.finder('yml', 'sections-template.yml')
			),
			this.destinationPath(path.join("_data", "sections.yml")),
			{
				header: this.answers.header
			}
		)

		// template SCSS var values (e.g. color)
		this.fs.copyTpl(
			this.templatePath(this.finder("scss", "scss-template.scss")),
			this.destinationPath(path.join("src", "scss", "_vars.scss")),
			{
				main_color: this.answers.main_color
			}
		)
	}

	install() {
		if (this.options.install) {
			this.composeWith(require.resolve(
				path.join(
					__dirname, 
					"../install"
				)	
			))
		}
	}

	end() {
		this.log("...tidying up")
	}

};
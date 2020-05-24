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
		// ~DEPRECATED
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

		// determine if user wants to update or 
		// create new website
		const intro = await this.prompt([
			{
				type: "list",
				name: "whattodo",
				message: "What would you like to do",
				choices: ["create", "update"],
				default: "update" 
			},
		])

		// save answers
		this.intro_answer = intro

		// on create
		if (intro.whattodo == "create") {
			const create_answers = await this.prompt([
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
			]);

			// save answers
			this.answers = create_answers
		} 

		// on update
		else if (intro.whattodo == "update") {
			const update_answers = await this.prompt([
				{
					type: "list",
					name: "update",
					message: "What would you like to update?",
					choices: ["all", "specific files"],
					default: "all"
				},
				{
					when: function(response) {
						return response.update != "all"	
					},
					type: "checkbox",
					name: "update_files",
					message: "What specific folders would you like to update?",
					choices: ["index.html", "gulpfile.js", "_layouts", "_includes", "src/**/*scss", "src/**/*js"],
					default: []
				},
				{
					type: "confirm",
					name: "update_data",
					message: "Data yml files have been updated, would you like to download a reference copy?",
					default: true
				},
			])

			// save answers
			this.answers = update_answers
		}

		// prompt to build website
		const build_answer = await this.prompt([
			{
				type: "confirm",
				name: "build",
				message: "Compile and build website?",
				default: false
			}
		])

		// store build answer directly as a boolean
		this.build = build_answer.build
	}

	/* 
	 * Compose multiple generators
	 */
	writing() {

		// Create subgenerator
		if (this.intro_answer.whattodo == "create") {
			this.composeWith(
				require.resolve(path.join(__dirname, "..", "create")),
				{
					answers: this.answers,
					build: this.build
				}
			)
		}

		// Update subgenerator
		else {
			this.composeWith(
				require.resolve(path.join(__dirname, "..", "update")),
				{
					answers: this.answers,
					build: this.build
				}
			)
		}
	}

    /* 
	 * Install
	 */
	install() {}

    /* 
	 * End
	 */
	end() {
		this.log("...tidying up")
	}

};
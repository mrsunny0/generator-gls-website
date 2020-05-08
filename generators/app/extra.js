        // random examples of inquirer
		{
			type: "number",
			name: "number",
			message: "number",
			default: 0,
        },
		{
			type: "confirm",
			name: "icons",
			message: "confirm",
			default: false
        },
		{
			type: "list",
			name: "list",
			message: "list",
			choices: ["apple", "orange", "banana"],
			default: "apple"
        },
		{
			type: "checkbox",
			name: "checkbox",
			message: "checkbox",
			choices: ["apple", "orange", "banana"],
			default: "apple"
		},
		{
			when: function(response) {
				return response.checkbox == "apple"	
			},
			type: "input",
			name: "afterQuestion",
			message: "this came after a prior question",
			default: "NA"
        },
		// rawlist, expand, password, editor (more here: https://github.com/SBoudrias/Inquirer.js/)
		
		write_files()
		use_subgenerator()

				//----------------------------------
		// Write some custom code
		//----------------------------------
		var write_files = () => {
			this.fs.write(
				path.join(__dirname, "file_name"),
				"contents"
			)
		}

		//----------------------------------
		// Use sub-generator to compose with
		//----------------------------------
		var use_subgenerator = () => {
			this.composeWith(
				require.resolve(path.join(__dirname, "..", "sub")),
				{
					option_value: "option_value"
				}
			)
		}
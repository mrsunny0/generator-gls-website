const helpers = require('yeoman-test');
const path = require('path')
const fs = require('fs-extra')

// location of test files
const test_dir = "test-dir"

// removing files
async function deleteDir(dir_name) {
    await fs.emptyDir(
        path.join(
            __dirname,
            test_dir,
            dir_name
        )
    )
}

// Test double to mock prompting
async function answerPrompts(answers, options, args, d) {
    // remove contents from dir
    // await deleteDir(d)

    // return Promise for answer prompts
    return helpers
        .run(path.join(__dirname, "../generators/app"))
        .inDir(path.join(__dirname, test_dir, d))
        .withOptions(options)
        .withArguments(args)
        .withPrompts({
            // intro answer
            whattodo: answers.whattodo ? answers.whattodo : "create",

            // create answers
            project_name: answers.project_name ? answers.project_name : "TEST NAME",
            author: answers.author ? answers.author : "test-author",
            website_meta_title: answers.website_meta_title ? answers.website_meta_title : "test-meta-title",
            website_header_title: answers.website_header_title ? answers.website_header_title : "test-header-title",
            website_description: answers.website_description ? answers.website_description : "test-header-description",

            // update answers
            update: answers.update ? answers.update : "be more specfic",
            update_files: answers.update_files ? answers.update_files : "index.html",
            update_data: answers.update_data ? answers.update_data : false,

            // build
            build: answers.build ? answers.build : false,
        })
}

module.exports = {
    answerPrompts: answerPrompts,
    deleteDir : deleteDir,
    test_dir: test_dir,
}
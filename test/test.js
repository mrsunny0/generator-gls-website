const assert = require('chai').assert
const config = require("./config.js")
const answerPrompts = config.answerPrompts
const fs = require('fs')

const helpers = require('yeoman-test');
const { exec } = require("child_process")
const { spawn } = require("child_process")
const deleteDir = config.deleteDir

describe.skip("Test Generator", () => {
    // basic testing of standard templating
    context("Basic templating", () => {
        it('create answers', () => {
            var answers = {
                whattodo: "create"
            }
            var options = {
                noinstall : true
            }
            answerPrompts(answers, options, [], "create-test")
        })

        it('update answers', () => {
            var answers = {
                whattodo: "update"
            }
            var options = {
                noinstall : true
            }
            answerPrompts(answers, options, [], "update-test")
        })
    })
})

describe.skip("Create Generator", () => {
    // basic testing of standard templating
    context("Create all", () => {
        it('Create with no install', () => {
            var answers = {
                whattodo: "create",
                build: false
            }
            var options = {
                noinstall : true
            }
            answerPrompts(answers, options, [], "create-test")
        })

        // with install
        xit('Create with install', () => {
            var answers = {
                whattodo: "create",
                build: true
            }
            var options = {
                noinstall : false
            }
            answerPrompts(answers, options, [], "create-test")
        })
    })
})

describe("Update Generator", () => {
    // basic testing of standard templating
    context("Update", () => {
        it('Update all', async () => {
            var answers = {
                whattodo: "update",
                update: "all",
                update_data: true,
                build: false
            }
            var options = {
                noinstall : true
            }
            answerPrompts(answers, options, [], "update-all")
        })

        xit('Update with no data ref', () => {
            var answers = {
                whattodo: "update",
                update_files: ["index.html", "gulpfile.js", "_layouts", "_includes", "src/**/*scss", "src/**/*js"],
                update_data: false,
                build: false
            }
            var options = {
                noinstall : true
            }
            answerPrompts(answers, options, [], "update-some")
        })

        xit('Update with data ref', () => {
            var answers = {
                whattodo: "update",
                update_files: ["index.html", "gulpfile.js", "_layouts", "_includes", "src/**/*scss", "src/**/*js"],
                update_data: true,
                build: false
            }
            var options = {
                noinstall : true
            }
            answerPrompts(answers, options, [], "update-data")
        })
    })
})
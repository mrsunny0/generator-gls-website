const helpers = require('yeoman-test');
const assert = require('chai')
const { exec } = require("child_process")
const { spawn } = require("child_process")
const config = require("./config.js")
const answerPrompts = config.answerPrompts
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

describe("Create Generator", () => {
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
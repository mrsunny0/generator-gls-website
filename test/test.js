const helpers = require('yeoman-test');
const assert = require('chai')
const { exec } = require("child_process")
const { spawn } = require("child_process")
const config = require("./config.js")
const answerPrompts = config.answerPrompts
const deleteDir = config.deleteDir

describe("Test Generator", () => {
    // basic testing of standard templating
    context("Basic templating", () => {
        it('default inputs', () => {
            var answers = {
            }
            var options = {
                noinstall : false
            }
            answerPrompts(answers, options, [], "second-test")
        })
    })
})
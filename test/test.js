const helpers = require('yeoman-test');
const assert = require('chai')
const { exec } = require("child_process")
const { spawn } = require("child_process")
const config = require("./config.js")
const answerPrompts = config.answerPrompts
const deleteDir = config.deleteDir

describe("Test package installations", () => {
    // basic testing of standard templating
    context("standard templating", () => {
        it('copy and past', () => {
            var answers = {
                // packages: "a b c d e",
                // devpackages: true,
                // type: "standard"
            }
            answerPrompts(answers, {}, [], "second-test")
        })
    })
})
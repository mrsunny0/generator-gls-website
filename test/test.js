const helpers = require('yeoman-test');
const assert = require('chai')
const { exec } = require("child_process")
const { spawn } = require("child_process")
const config = require("./config.js")
const answerPrompts = config.answerPrompts
const deleteDir = config.deleteDir

xdescribe("Test Generator", () => {
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

xdescribe("Test Generator", () => {
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
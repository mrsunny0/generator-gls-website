const helpers = require('yeoman-test');
const assert = require('chai')
const path = require('path')
const fs = require('fs-extra')

// Description
describe("Test package installations", () => {
    it('inspect package.json', () => {
        return helpers
            .run(path.join(__dirname, "../generators/app"))
            .inDir(path.join(__dirname, "test-dir"))
            .withOptions({
                install: false
            })
            .withArguments([])
            .withPrompts({
                name: 'test',
                author: 'test-name',
                description: 'test-description',
                header: "CUSTOM HEADER"
            }).then(() => {
            })
    })
})
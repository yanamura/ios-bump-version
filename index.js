const shell = require('shelljs');
const core = require('@actions/core');

const version = core.getInput('version')
const buildNumber = core.getInput('build-number')
const path = core.getInput('project-path')

if (path) {
    const command = `cd ./${path}`
    console.log(command)
    const result = shell.exec(command).code
    if (result != 0) {
        core.setFailed(`${command} fail with exit code: ${result}`)
    }
}

shell.exec('echo $PWD')
shell.exec('pwd')
shell.exec('ls')

if (version) {
    const command = `agvtool new-marketing-version ${version}`
    console.log(command)
    const result = shell.exec(command).code
    if (result != 0) {
        core.setFailed(`${command} fail with exit code: ${result}`)
    }
}

if (!buildNumber) {
    const command = `agvtool next-version -all`
    console.log(command)
    const result = shell.exec(command).code
    if (result != 0) {
        core.setFailed(`${command} fail with exit code: ${result}`)
    }
} else {
    const command = `agvtool next-version -all ${buildNumber}`
    console.log(command)
    const result = shell.exec(command).code
    if (result != 0) {
        core.setFailed(`${command} fail with exit code: ${result}`)
    }
}
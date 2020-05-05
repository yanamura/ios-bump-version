const core = require('@actions/core')
const exec = require('@actions/exec')

const version = core.getInput('version')
const buildNumber = core.getInput('build-number')

if (version) {
    const command = `agvtool new-marketing-version ${version}`
    console.log(command)
    const result = exec.exec(command)
    if (result != 0) {
        core.setFailed(`${command} fail with exit code: ${result}`)
    }
}

if (!buildNumber) {
    const command = `agvtool next-version -all`
    console.log(command)
    const result = exec.exec(command)
    if (result != 0) {
        core.setFailed(`${command} fail with exit code: ${result}`)
    }
} else {
    const command = `agvtool next-version -all ${buildNumber}`
    console.log(command)
    const result = exec.exec(command)
    if (result != 0) {
        core.setFailed(`${command} fail with exit code: ${result}`)
    }
}
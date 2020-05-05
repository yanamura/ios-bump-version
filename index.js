const core = require('@actions/core')
const exec = require('@actions/exec')

const version = core.getInput('version')
const buildNumber = core.getInput('build-number')

if (version) {
    const command = `agvtool new-marketing-version ${version}`
    console.log(command)
    exec.exec(command).catch(err => {
        core.setFailed(error.message)
    })
}

if (!buildNumber) {
    const command = `agvtool next-version -all`
    console.log(command)
    exec.exec(command).catch(err => {
        core.setFailed(error.message)
    })
} else {
    const command = `agvtool next-version -all ${buildNumber}`
    console.log(command)
    exec.exec(command).catch(err => {
        core.setFailed(error.message)
    })
}
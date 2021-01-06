const core = require('@actions/core')
const exec = require('@actions/exec')

const version = core.getInput('version')
const buildNumber = core.getInput('build-number')
const projectPath = core.getInput('project-path')

if (version) {
    const command = `agvtool new-marketing-version ${version}`
    console.log(command)
    exec.exec(command).catch(error => {
        core.setFailed(error.message)
    })
}

if (!buildNumber) {
    const command = `agvtool next-version -all`
    console.log(command)
    exec.exec(command).catch(error => {
        core.setFailed(error.message)
    })
} else {
    const command = `agvtool new-version -all ${buildNumber}`
    console.log(command)
    exec.exec(command).catch(error => {
        core.setFailed(error.message)
    })
}

if (projectPath) {
    const command = `cd ${projectPath}`
    console.log(command)
    exec.exec(command).catch(error => {
        core.setFailed(error.message)
    })
}


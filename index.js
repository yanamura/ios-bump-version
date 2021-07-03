const core = require('@actions/core')
const exec = require('@actions/exec')
const fs = require('fs')

let version = core.getInput('version')
const buildNumber = core.getInput('build-number')
const projectPath = core.getInput('project-path')
const versionPath = core.getInput('version-path')

function execCommand(command) {
  return exec.exec(command, [], {cwd: projectPath})
}

if (versionPath) {
    const content = fs.readFileSync(versionPath, 'utf8')
    version = content.trim()
}

if (version) {
    const command = `agvtool new-marketing-version ${version}`
    console.log(command)
    execCommand(command).catch(error => {
        core.setFailed(error.message)
    })
}

if (!buildNumber) {
    const command = `agvtool next-version -all`
    console.log(command)
    execCommand(command).catch(error => {
        core.setFailed(error.message)
    })
} else {
    const command = `agvtool new-version -all ${buildNumber}`
    console.log(command)
    execCommand(command).catch(error => {
        core.setFailed(error.message)
    })
}


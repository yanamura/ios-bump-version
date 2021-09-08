const core = require('@actions/core')
const exec = require('@actions/exec')
const fs = require('fs')

let version = core.getInput('version')
const buildNumber = core.getInput('build-number')
const projectPath = core.getInput('project-path')
const versionPath = core.getInput('version-path')

function execCommand(command, options = {}) {
    options.cwd = projectPath
    return exec.exec(command, [], options)
  }

if (versionPath) {
    const content = fs.readFileSync(versionPath, 'utf8')
    version = content.trim()
}

if (version) {
    core.setOutput('version', version)

    const command = `agvtool new-marketing-version ${version}`
    console.log(command)
    execCommand(command).catch(error => {
        core.setFailed(error.message)
    })
}

if (!buildNumber) {
    execCommand(`agvtool what-version -terse`, {
        listeners: { stdout: (data) => {
            core.setOutput('build-number', +data + 1)
        }}
    })

    const command = `agvtool next-version -all`
    console.log(command)
    execCommand(command).catch(error => {
        core.setFailed(error.message)
    })
} else {
    core.setOutput('build-number', +buildNumber + 1)

    const command = `agvtool new-version -all ${buildNumber}`
    console.log(command)
    execCommand(command).catch(error => {
        core.setFailed(error.message)
    })
}


const core = require('@actions/core')
const exec = require('@actions/exec')
const fs = require('fs')

async function execCommand(command, options = {}) {
    const projectPath = core.getInput('project-path')
    options.cwd = projectPath
    return exec.exec(command, [], options)
}

async function run() {
    let version = core.getInput('version')
    const buildNumber = core.getInput('build-number')
    const versionPath = core.getInput('version-path')

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
        const command = `agvtool next-version -all`
        console.log(command)
        await execCommand(command).catch(error => {
            core.setFailed(error.message)
        })
    } else {
        const command = `agvtool new-version -all ${buildNumber}`
        console.log(command)
        await execCommand(command).catch(error => {
            core.setFailed(error.message)
        })
    }

    await execCommand(`agvtool what-version -terse`, {
        listeners: { stdout: (data) => {
            console.log(data)
            core.setOutput('build-number', data.toString().trim())
        }}
    })
}

run()
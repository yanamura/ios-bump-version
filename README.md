# iOS-Bump-Version

This action increment build and version number using [agvtool](https://developer.apple.com/library/archive/qa/qa1827/_index.html).

## Usage

```yaml
- uses: yanamura/ios-bump-version@v1
  with:
    # version number
    # ex. 3.2.0
    # If version is not set, the version does not be changed.
    version: ''

    # build number
    # ex. 10
    # If build-number is not set, auto-increment build number.
    build-number: ''
```

> Note: Set `Current Project Version` and `Versioning System` to `Apple Generic` on your Xcode Project Setting.

## Senario

### specify version by using Manual Workflow
```yaml
on:
  workflow_dispatch:
    inputs:
      version:
        description: new app version x.x.x.

jobs:
  versionup:
    runs-on: macos-latest
    steps:
    - uses: actions/checkout@v3
    - uses: yanamura/ios-bump-version@v1
      with:
        version: ${{ github.event.inputs.version }}
- name: update
  run: |
    git add .
    git commit -m "bump version"
    git push origin HEAD
```

### auto increment build number
```yaml
- uses: actions/checkout@v3
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
- uses: yanamura/ios-bump-version@v1
  with:
    version: 1.1.0
- name: update
  run: |
    git add .
    git commit -m "bump version"
    git push origin HEAD
```

### specify build number using GITHUB_RUN_NUMBER and project path
```yaml
- uses: actions/checkout@v3
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
- uses: yanamura/ios-bump-version@v1
  with:
    version: 1.1.0
    build-number: ${{github.run_number}}
    project-path: ios #Example for React Native project
- name: update
  run: |
    git add .
    git commit -m "bump version"
    git push origin HEAD
```

### specify version from file
```yaml
- uses: actions/checkout@v3
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
- uses: yanamura/ios-bump-version@v1
  with:
    version-path: version.file
- name: update
  run: |
    git add .
    git commit -m "bump version"
    git push origin HEAD
```

# iOS-Bump-Versionn

This action incremennt build and version number using [agvtool](https://developer.apple.com/library/archive/qa/qa1827/_index.html).

# Usage

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

# Senario

```yaml
- uses: yanamura/ios-bump-version@v1
  with:
    version: 1.1.0
- uses: actions/checkout@v2
  with:
    token: ${{ secrets.GITHUB_TOKENN }}
- name: update
  run: |
    git add .
    git commit -m "bump version"
    git push origin HEAD
```
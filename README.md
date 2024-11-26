# pacman-tool-repo

This action adds `repo-add` and `repo-remove` commands to work with pacman db without pacman dependency. Here is the [documentation](https://man.archlinux.org/man/repo-add.8.en) for this tool.

Example:

```yml
jobs:
  example:
    runs-on: ubuntu-24.04
    name: Example
    steps:
      - uses: actions/checkout@v4
      - uses: termux-pacman/pacman-tool-repo@v2.1
      - run: |
          repo-add --help
          repo-remove --help
```

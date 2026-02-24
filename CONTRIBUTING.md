# Contributing

## Commit Messages

Cmdi uses the
[Angular commit format](https://github.com/angular/angular/blob/main/contributing-docs/commit-message-guidelines.md)
for commit messages. It should be made up of a header, body, and footer:

```txt
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

...where the header looks like:

```txt
<type>[scope]: <short summary>
```

A body is optional when a short summary explains everything. Footers are
required to show what issues the commit is related to.

### Types/Scopes

| Type     | Description                                                   |
| -------- | ------------------------------------------------------------- |
| build    | Changes that affect the build system or external dependencies |
| ci       | Changes to our CI configuration files and scripts             |
| docs     | Documentation only changes (including JSDoc comments)         |
| feat     | A new feature                                                 |
| fix      | A bug fix                                                     |
| perf     | A code change that improves performance                       |
| refactor | A code change that neither fixes a bug nor adds a feature     |
| test     | Adding missing tests or correcting existing tests             |
| chore    | Another misc change, e.g. releases or generating files        |
| revert   | A commit that reverts a change                                |
| style    | A commit making a stylistic change (lints included)           |

#### Notes

- Dependencies\
  In the case of a dependency change, you must supply the `deps` scope. For
  documentation dependencies, use `docs(deps)`. For any other dependencies, use
  `build(deps)`
- Features/Fixes/Performance/Refactor\
  In the case of any of these changes, you must supply a relevant scope based on
  where exactly a change was made. For development changes (linters, formatters,
  tools, etc.), use `type(dev)`. For changes to production packages, use their
  relevant scopes (`lang`, `core`, `ui`).

For certain commit types, a scope is required:

| Scope   | Description                                                            |
| ------- | ---------------------------------------------------------------------- |
| dev     | Changes to development tools and documentation                         |
| deps    | Changes to dependencies                                                |
| core    | Changes to `@rbxts/cmdi` (packages/core) or relevant docs              |
| lang    | Changes to `@rbxts/cmdi-language` (packages/language) or relevant docs |
| feat    | Changes to `@rbxts/cmdi-ui` (packages/ui) or relevant docs             |
| assets  | Changes to any assets (images, audio, etc.)                            |
| release | Releasing a new version                                                |

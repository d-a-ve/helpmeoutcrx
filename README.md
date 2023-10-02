
# HELP ME OUT CHROME EXTENSION

Help me out chrome extension is an extension for screen recording.



## Build Extension

Clone the project

```bash
  git clone https://github.com/d-a-ve/helpmeoutcrx
```

Go to the project directory

```bash
  cd my-project
```

Build the project

```bash
  npm build
```

> If an error occus when building due to `@types/har-format`, this is a package being used by `@types/chrome`. You can install with `npm i @types/har-format` and then build again

> The built project will be under the dist folder.

> This folder can be added to the chrome extension by selecting the `load unpacked` in the chrome extension.


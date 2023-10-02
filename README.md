
# HELP ME OUT CHROME EXTENSION

Help me out chrome extension is used for screen recording.

Download the files for using the extension locally here [here](https://www.dropbox.com/scl/fi/k3rv7lo73uv7gjr7v3b6v/dave-helpmeoutcrx.zip?rlkey=5yjewzb2m4l3xgqqkrhkepusq&dl=0)

## Notes
1. After downloading and loading the extension locally, you have to give the page you want to record a reload so the scripts for the extension can be added.
1. This extension can only work for `http://` or `https://` web origins. Any page other than this such as `blob://`, `chrome://`, etc will not work.


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


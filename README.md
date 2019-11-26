**still in working...**

<div align="center">
    <h1>👨🏻‍💻 WeNote</h1>
    <h3>A notebook app build for programmer</h3>
    <a href="javascript:;">Download</a> | <a href="javascript:;">Homepage</a>
</div>

![](./docs/preview.jpg)

### Features

* Write in WeNote and automatically deploy to other platforms:
    * Deploy to Github Pages by hexo or Jekyll
    * Deploy to [cnblogs.com](https://www.cnblogs.com/)
    * ...
* Programmer navigation station
* Password management tool
* Encryption and decryption tool
* Regular expression test tool
* JSON beautification tool
* Code formatting tool
* Add any tools you need !

### Installing

First download the code using Git:

```bash
git clone https://github.com/rmlzy/we-note.git
```

Install dependency:

```bash
cd we-note
npm install
```

Start dev mode:

```bash
npm run dev
```

Wait a minute. It'll turn on electron automatically.

## Deployment

```shell
# Build for macOS
npm run electron:mac

# Build for Linux
npm run electron:linux
```

## Built With

* [Angular](https://github.com/angular/angular) - The web framework used
* [Electron](https://github.com/electron/electron) - Dependency Management
* [Shelljs](https://github.com/shelljs/shelljs) - Used to run Unix shell commands in Node.js
* [NG-ZORRO](https://github.com/NG-ZORRO/ng-zorro-antd) - The UI library based on Ant Design and Angular
* [Lodash](https://github.com/lodash/lodash) - A JavaScript utility library
* [Brace](https://github.com/thlorenz/brace) - Browserify compatible version of the ace editor
* [node-jsonfile](https://github.com/jprichardson/node-jsonfile) - A tool used to read/write JSON files
 

## Authors

* [Jason Liu](https://github.com/rmlzy)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

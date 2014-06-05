lunch
=====

## Setting environment variables

### Application side

*Your application IDs, provided through Facebook and Google, will need to be available to the mobile application. This is done through angular.run.*

* In `app/scripts/app.js`, replace the IDs in `OpenFB.init` and `push.init` with your Facebook and Google application IDs, respectively.

### Server side

*Server side variables are set through the shell, and accessed using* `process.env.VAR_NAME` *in* **node**.

* *TODO*

## Bootstrapping

Off the bat, you'll need to use **grunt** and a local instance of **neo4j**.

#### Installing **grunt**

* npm install -g grunt-cli

### Installing **neo4j**

* If you use **brew**, `brew install neo4j`

* If you're not using **brew**, an image is available off of the [**neo4j** site](http://www.neo4j.org/download)

 *You'll need to set up a symbolic link to the binary to get it in your path,*

 `ln -s /where/you/install/neo4j/bin/neo4j /usr/local/bin/neo4j`

* Once installed, spin up the database with `neo4j start`

### Booting up a client

You can boot up a client through a browser, emulator, or mobile device:

* `npm i && grunt start:client` *Start up the client through a web browser*

* `npm i && grunt start:android` *Start up a client through a connected android device or local emulator*

* `npm i && grunt start:ios` *Start up a client through a local iOS emulator*

### Booting up the server

Logging is available through [**morgan**](https://www.npmjs.org/package/morgan) and [**colog**](https://www.npmjs.org/package/colog).

Set your shell's DEVELOPMENT variable to enable logging. We use **bash** and **zsh**, `export DEVELOPMENT=true`

* `nodemon server/server.js`

## Testing

* *TODO*
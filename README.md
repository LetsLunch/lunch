lunch
=====

## Setting environment variables

### Application side

*Your application IDs, provided through Facebook and Google, will need to be available to the mobile application. This is done through angular.run.*

* In `app/scripts/app.js`, replace the IDs in `OpenFB.init` and `push.init` with your Facebook and Google application IDs, respectively.

### Server side

*Server side variables are set through the shell, and accessed using process.env.VAR_NAME.*

* *TODO*

### Booting up a client

You can boot up a client through a browser or emulator:

* `npm i && grunt start:client` *Start up the client through a web browser*

* `npm i && grunt start:android` *Start up a client through a connected android device or local emulator*

* `npm i && grunt start:ios` *Start up a client through a local iOS emulator*


Lunch
=====

**Lunch** is an Android application to bring together like-minded people over lunch.

**Lunch** integrates with Facebook and has users choose desirable conversation topics to set up a basic profile. Users can then view 'matches' based on location, similar topics chosen, and similar Facebook likes (much like [Tinder](http://www.gottinder.com/)).

## User flow

*Screenshots coming soon!*

## Technologies

* **[angular](http://angularjs.org)** *HTML/JS application framework*

* **[ionic](http://ionicframework.com/)** *HTML5 mobile application framework wrapping angular*

 * The client was built using angular and ionic for a clean, mobile-friendly feel

* **[cordova](http://cordova.apache.org)** *Package JavaScript as a native Android application*

 * The client was ported to Java (for Android) using Apache's phonegap

* **[neo4j](http://neo4j.org)** *Graph database*

 * Neo4j was used to quickly retrieve matches for similarly-minded users

  By using neo4j instead of a 'traditional' RDBMS, entire tables do not need to be iterated over to find similar users. Instead, searches are localized to the originating node (the requesting user). Much (but not all) of our queries were done through API endpoints in [neo4j-swagger](http://neo4j-swagger.tinj.com/docs/).

* **[node](http://nodejs.org)** *Server-side JS*

* **[express](http://expressjs.com)** *Web application framework wrapping node*

# Configuring **Lunch** on your own machine

## Setting environment variables

### Client side

*Your application IDs, provided through [Facebook](https://developers.facebook.com/) and [Google](https://console.developers.google.com/project), will need to be available to the mobile application.*

* In `app/scripts/app.js`, set the correct IDs for `fbAPI`, `gcmAPI`, and `APIHost`.

 `fbAPI`: your Facebook App ID
 `gcmAPI`: your Google Project Number
 `APIHost`: the location of your own server

### Server side

*Server side variables are set through the shell, and accessed using* `process.env.VAR_NAME` *in* **node**. *An actual deployment may need these to be configured in a deployment script, the format of which is dependant on your hosting service.*

* `export GCM_KEY=your.Google.API.key`

 This is needed for Google Cloud Messaging (push notification service) to work.

* `export BASE_URL=http://your.api.endpoint`

 If you are running the server from a local machine (`http://localhost:8008`), this can be skipped.

* `export NEO4J_URL=http://your.neo4j.server:7474`

 If you are running neo4j from a local machine (`http://localhost:7474`), this can be skipped.

## Bootstrapping

Off the bat, you'll need to use **grunt** and a local instance of **neo4j**.

#### Installing **grunt**

* npm install -g grunt-cli

#### Installing **neo4j**

* If you use **brew**, `brew install neo4j`

* If you're not using **brew**, an image is available off of the [**neo4j** site](http://www.neo4j.org/download)

 *You'll need to set up a symbolic link to the binary to get it in your path,*

 `ln -s /where/you/install/neo4j/bin/neo4j /usr/local/bin/neo4j`

* Once installed, spin up the database with `neo4j start`

### Bootstrapping a client

You can boot up a client through a browser, emulator, or mobile device. Push notifications will only function if the client is booted on a mobile device.

*To facilitate testing, there is a mock polyfill for push notifications, but it will only work if the application is entered through the login screen, with `window.localStorage.fbtoken` undefined.*

* `npm i && grunt start:client` *Start up the client through a web browser*

* `npm i && grunt start:android` *Start up a client through a connected android device or local emulator*

 This will only work if you have configured your android to run in debug mode with your machine.

### Booting up the server

Logging is available through [**morgan**](https://www.npmjs.org/package/morgan) and [**colog**](https://www.npmjs.org/package/colog). To enable logging, set your shell's DEVELOPMENT variable to enable logging. Using **bash** and **zsh**, `export DEVELOPMENT=true`.

* `nodemon server/server.js`

## Testing

A mock dataset is available for the database. To empty your database and repopulate with mock data, run `node test/populateDatabase.js`.
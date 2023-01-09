# Ebay-ish clone

## Online shop where you can (not yet) sell and buy stuff, by bidding for the listed goods

In order to run this application you will need:

- Node js v16.15.0 - versions above this might not be compatible with the proxy used in the react application
  - Node version was updated to 16.15.* to be able to install usehooks node module
- Maven 3.8.6 with Java 11 - should work with versions of Java above 11 as well

To run this application:

- Start the server application - make sure nothing else is running on _localhost:8080_ or configure it from the _application.yaml_ file to run on another port (make sure to change it in the client proxy as well)
- Start the client application - first install all the required modules with `npm install` and then run it with `npm start`

Notes:
This application was developed as a university project, it is not meant to be used in any commercial environment. Any similarities with existing applications that serve a simmilar purpose is just the result of a series of adventitious google searches.

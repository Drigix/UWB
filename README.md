# UWB

This is an application for controlling data from monitoring areas using Ultra Wideband technology. It is a web application with an Angular framework-based interface. The server-side of the application has been developed using Java Spring Boot with a microservices architecture, and all data is managed in a PostgreSQL database. This is my Engineering work, and I have personally written all the code. If you are interested, you can gain knowledge about this technology.

## Project Structure

Node is required for generation and recommended for development. `package.json` is always generated for a better development experience with prettier, commit hooks, scripts and so on.


## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: Node is necessary for run a interface of the project.
    Depending on your system, you can install Node either from source or as a pre-packaged bundle.

```
npm install
```

The project use npm scripts and [Angular CLI][] with [Webpack][] as our build system.
Run the following command to start the interface application.

```
cd .\uwb-client-app\
npm start
```

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

2. [Java][version 17]: Java version 17 is necessary for run a server of the project.
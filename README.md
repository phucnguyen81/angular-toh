# AngularToh

This is an updated version of the [Tour of Heroes](https://angular.io/tutorial/tour-of-heroes) tutorial.
The frontend is hosted on [GitHub Pages](https://phucnguyen81.github.io/angular-toh).
The backend json server is hosted on [render.sh](https://angular-toh.onrender.com).

The main changes are:
- Updated to Angular 16
- Add signal and error handling
- Replace the in-memory-data-service with a json server
- Deploy to GitHub Pages

With the addition of signal, Angular provides a clear picture for component communication and state management:
- `@Input/@Output` for local/short distance, `Service` for global/long distance
- `signal` for internal state, and `RxJS` for external state

## Project setup

- Install [nvm](https://github.com/nvm-sh/nvm)
- Install [direnv](https://direnv.net/)
- Go to this directory, direnv will use nvm to activate the correct node version
- Install `npx` with `npm install -g npx`
- Install dependencies with `npx npm@9.6.6 install` (npm preferred version is in package.json)

## Development

- Run `npm run api` to start the json api server.
- Run `npm run start` to start the web dev server with autoreload at `http://localhost:4200/`
- Run `npm run lint` to to lint codes
- Run `npm run test` to run local tests

## Deployment

- Run `npm run prod:deploy` to deploy to GitHub Pages

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

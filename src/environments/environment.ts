// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mock: false,
  server: {
    url: 'http://yoga.booking.localdomain.com:8080'
  },
  firebase: {
    apiKey: "AIzaSyCFFv9w4nWqxzXGEdtInOkivGu0K_w9c5w",
    authDomain: "",
    databaseURL: "",
    projectId: "yoga-saint-pierre-dev",
    storageBucket: "yoga-saint-pierre-dev.appspot.com",
    messagingSenderId: "191353546130"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

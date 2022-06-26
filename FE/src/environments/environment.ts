// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH0:{
    domain: 'dev-tt6-hw09.us.auth0.com',
    clientId: 'WvEpucsSOwsMHpHAAS05qoUXi1JAUHS2',
    redirectUri: 'https://localhost:4200/pets',
    logoutURL: 'https://localhost:4200/login',
    audience: 'https://diploma-challenge-sem-1.com.au'
  },
  apiURL:'https://localhost:7235'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

const apiServer = "http://localhost:3001/";

export const apiUrls = {
  userManager: apiServer + 'userRegisterationManager',
  volunteerManager: apiServer + 'volunteerManager',
  recipientManager: apiServer + 'recipientManager',
  loginManager: apiServer + 'loginManager',
  donorManager: apiServer + 'donorManager',
  requestManager: apiServer + 'requestManager',
  getUserById: apiServer + 'userRegisterationManager/getUserById',
  getRequestsById: apiServer + 'requestManager/getRequestsById',
  getVolunteerById: apiServer + 'volunteerManager/getVolunteerById',
  getRequestsByHandledBy: apiServer + 'requestManager/getRequestsByHandledBy',
  getUserByReferedBy: apiServer + 'userRegisterationManager/getUserByReferedBy',
  getRecipientsByReferedBy: apiServer + 'recipientManager/getRecipientsByReferedBy',
  getRecipientsById: apiServer + 'recipientManager/getRecipientById',
  getDonorbyId: apiServer + 'donorManager/getDonorById'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

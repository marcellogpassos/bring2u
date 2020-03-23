// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { FirebaseOptions } from '@angular/fire';
import { auth } from 'firebase';

export const environment = {
  production: false,
};

export const firebaseOptions: FirebaseOptions = {
  apiKey: 'AIzaSyA3RbrUAaV3T3RpiP2s50OGrzyFHYXB5m8',
  authDomain: 'bring2u-dafaf.firebaseapp.com',
  databaseURL: 'https://bring2u-dafaf.firebaseio.com',
  projectId: 'bring2u-dafaf',
  storageBucket: 'bring2u-dafaf.appspot.com',
  messagingSenderId: '940587601196',
  appId: '1:940587601196:web:f43efa128dd5d139d1b089',
  measurementId: 'G-KLRW8T26T7'
};

export const actionCodeSettings: auth.ActionCodeSettings = {
  url: 'http://localhost:8100/auth/finish-login',
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'br.com.bring2u'  // com.example.ios
  // },
  // android: {
  //   packageName: 'br.com.bring2u',  // com.example.android
  //   installApp: true,  // replace
  //   minimumVersion: '12'  // replace
  // },
  // dynamicLinkDomain: 'br.com.bring2u'  // example.page.link
};

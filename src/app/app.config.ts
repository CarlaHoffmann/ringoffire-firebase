import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"ring-of-fire-572c5",
      "appId":"1:805808403801:web:a59d902dc6e8b6dd9cc848",
      "storageBucket":"ring-of-fire-572c5.firebasestorage.app",
      "apiKey":"AIzaSyB1nQwIRx50aywYrH2MhIvSlF_T94YSowQ",
      "authDomain":"ring-of-fire-572c5.firebaseapp.com",
      "messagingSenderId":"805808403801"
    })), 
    provideFirestore(() => getFirestore())
  ]
};

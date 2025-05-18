import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({ projectId: "setahajo-5a02a", appId: "1:222875598281:web:49489a4542a159000a7c18", storageBucket: "setahajo-5a02a.firebasestorage.app", apiKey: "AIzaSyCz3MM8ALoFzThPoFcY5jjKvni2-XU48Fw", authDomain: "setahajo-5a02a.firebaseapp.com", messagingSenderId: "222875598281" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));

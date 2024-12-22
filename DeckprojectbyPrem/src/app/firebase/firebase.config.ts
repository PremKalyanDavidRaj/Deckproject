import { ApplicationConfig } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

export const firebaseProviders: ApplicationConfig['providers'] = [
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideFirestore(() => getFirestore())
];
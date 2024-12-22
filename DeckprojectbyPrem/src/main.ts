import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { firebaseProviders } from './app/firebase/firebase.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    firebaseProviders
  ]
});
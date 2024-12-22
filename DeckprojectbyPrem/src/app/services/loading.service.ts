import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingState = new BehaviorSubject<boolean>(false);

  setLoading(isLoading: boolean): void {
    this.loadingState.next(isLoading);
  }

  getLoadingState(): Observable<boolean> {
    return this.loadingState.asObservable();
  }
}
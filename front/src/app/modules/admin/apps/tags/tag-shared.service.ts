// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagSharedService {
  private jsonSubject = new BehaviorSubject<any>(null);
  json$ = this.jsonSubject.asObservable();

  setJson(json: any) {
    this.jsonSubject.next(json);
  }
}

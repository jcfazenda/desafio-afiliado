import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  private endpoint = 'http://localhost:3333/templates';

  constructor(private http: HttpClient) {}


  getAll(): Observable<any> {
    return this.get('/get', {});
  }

  private makeRequest<T>(httpMethod: string, endpoint: string, params?: any): Observable<T> {
    const fullUrl = `${this.endpoint.trim()}${endpoint}`;

    return this.http[httpMethod](
      fullUrl,
      params instanceof HttpParams ? { params } : params
    ).pipe(
      catchError(this.handleError)
    );
  }

  remove(params: any): Observable<any> {
    return this.makeRequest('post', '/remove', params);
  }

  insert(params: any): Observable<any> {
    return this.makeRequest('post', '/insert', params);
  }

  update(params: any): Observable<any> {
    return this.makeRequest('put', '/update', params);
  }

  get(path: string, params: { [param: string]: string | number | boolean }): Observable<any> {
    return this.makeRequest('get', path, new HttpParams({ fromObject: params }));
  }




  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro na solicitação. Por favor, tente novamente mais tarde.');
  }
}

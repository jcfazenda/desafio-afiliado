import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class MacrosService {

  private endpoint = 'http://localhost:3333/macros';

  constructor(private http: HttpClient) {}
  
  remove(params: any): Observable<any> {
    return this.makeRequest('post', '/remove', params);
  }

  insert(params: any): Observable<any> {
    return this.makeRequest('post', '/insert', params);
  }

  update(params: any): Observable<any> {
    return this.makeRequest('put', '/update', params);
  }

  put(path: string, params: { [param: string]: string | number | boolean }): Observable<any> {
    return this.makeRequest('put', path, new HttpParams({ fromObject: params }));
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

  transaction(params: any): Observable<any> {
    return this.makeRequest('post', '/transaction', params);
  }

  execute(params: any): Observable<any> {
    return this.makeRequest('post', '/execute', params);
  }

  getByPath(id: any): Observable<any> {

    const param = {
      id_path: id
    }
    return this.makeRequest('post', '/getByPath', param);
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro na solicitação. Por favor, tente novamente mais tarde.');
  }

}

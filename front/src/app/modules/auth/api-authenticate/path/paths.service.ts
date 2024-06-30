import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PathService {
  private endpoint = 'http://localhost:3333/path';

  constructor(private http: HttpClient) {}

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

  updateConditionals(params: any): Observable<any> {
    return this.makeRequest('put', '/updateConditionals', params);
  }

  put(path: string, params: { [param: string]: string | number | boolean }): Observable<any> {
    return this.makeRequest('put', path, new HttpParams({ fromObject: params }));
  }

  getVariableData(): Observable<any> {
    return this.get('/getVariableData', {});
  }

  getPathsByConfiguration(id_configuration: any): Observable<any> {
    return this.makeRequest('post', '/getByConfiguration', { id_configuration });
  }

  getPathByConfiguration(id_configuration: any): Observable<any> {
    return this.makeRequest('post', '/getPathByConfiguration', { id_configuration });
  }


  getConditionalByPath(params: any): Observable<any> {
    return this.makeRequest('post', '/getConditionalByPath', params );
  }

  get(path: string, params: { [param: string]: string | number | boolean }): Observable<any> {
    return this.makeRequest('get', path, new HttpParams({ fromObject: params }));
  }




  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro na solicitação. Por favor, tente novamente mais tarde.');
  }
}

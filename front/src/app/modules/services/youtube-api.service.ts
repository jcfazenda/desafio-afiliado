import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  
  private apiKey = 'SUA_CHAVE_DE_API_AQUI'; // Substitua pela sua chave de API do YouTube Data

  constructor(private http: HttpClient) { }

  // Obtém estatísticas de um vídeo específico pelo seu ID
  getVideoStatistics(videoId: string): Observable<any> {

    const url = `https://www.googleapis.com/youtube/v3/videos`;
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('part', 'statistics')
      .set('id', videoId);

    return this.http.get(url, { params }).pipe(

      map((response: any) => {
        if (response.items.length > 0) {
          return response.items[0].statistics;
        } else {
          return null;
        }
      })

    );

  }

  // Obtém estatísticas de um canal específico pelo seu ID
  getChannelStatistics(channelId: string): Observable<any> {

    const url = `https://www.googleapis.com/youtube/v3/channels`;
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('part', 'statistics')
      .set('id', channelId);

    return this.http.get(url, { params }).pipe(

      map((response: any) => {
        if (response.items.length > 0) {
          return response.items[0].statistics;
        } else {
          return null;
        }
      })

    );

  }

  getChannelIdByVideoId(videoId: string): Observable<string> {
    const url = `https://www.googleapis.com/youtube/v3/videos`;
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('part', 'snippet')
      .set('id', videoId);

    return this.http.get(url, { params }).pipe(
      map((response: any) => {
        if (response.items.length > 0) {
          return response.items[0].snippet.channelId;
        } else {
          return null;
        }
      })
    );
  }
  
}

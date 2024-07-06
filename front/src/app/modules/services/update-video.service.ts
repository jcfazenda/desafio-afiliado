import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; 
import { YoutubeApiService } from './youtube-api.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateVideoService {

  apiKey = 'AIzaSyCSfh7Ek0dyVgnPBiqLZ4ZyowXDjp7kq-I'; // Substitua com sua chave de API do YouTube

  constructor(private sanitizer: DomSanitizer,
              //private youtubeApiService: YoutubeApiService,
              private http: HttpClient
  ) {} 
 
  /* Função para extrair o ID do vídeo do YouTube a partir da URL */ 
  getSafeVideoUrl(url: string): SafeResourceUrl { 

    let defaultYoutubeOptions = {
      rel: 0,             // Remove vídeos relacionados ao final da reprodução.
      controls: 0,        // Remove todos os controles do player, incluindo o controle de volume.
      modestbranding: 1,  // Reduz o logotipo do YouTube para um estilo mais modesto no canto
      showinfo: 0,        // Para remover o botão "Inscrever-se" e outros elementos como o título do vídeo na URL de incorporação
      autoplay: 0,        // Inicia o vídeo automaticamente quando a página é carregada
      loop: 1,            // Faz o vídeo reiniciar automaticamente após o término
      mute: 0,            // Inicia o vídeo sem áudio
      start: 0,           // Define o tempo de início do vídeo em segundos (exemplo: 30 segundos)
      end: 60,            // Define o tempo de término do vídeo em segundos (exemplo: 60 segundos)
      fs: 0               // Remove o botão de tela cheia do player
    };

    const videoId = this.extractVideoId(url); 

    let embedUrl = `https://www.youtube.com/embed/${videoId}?`;

    Object.keys(defaultYoutubeOptions).forEach(key => {
      embedUrl += `${key}=${defaultYoutubeOptions[key]}&`;
    });

    // Remove o '&' final se existir
    if (embedUrl.endsWith('&')) {
        embedUrl = embedUrl.slice(0, -1);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractVideoId(url: string): string {

    const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/))([^\s&]+)/;
    const match = url.match(regex); 
    return (match && match[1]) ? match[1] : '';

  } 

}

import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UpdateVideoService {

  constructor(private sanitizer: DomSanitizer) {}

  updateVideo(url: string): SafeResourceUrl | null {
    const embedUrl = this.convertToEmbedUrl(url);
    return embedUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl) : null;
  }

  convertToEmbedUrl(url: string): string | null {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  setUrl(url: string) { 

    const safeURL = this.updateVideo(url); 
    if (safeURL) {
       return safeURL;
    } else {  
        return this.updateVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); // Link válido padrão
    } 
 
}
}

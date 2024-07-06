import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.registerIcons();
  }

  private registerIcons() {
    const icons = [
      'new-paper',
      'thumb-edit',
      'project-add',
      'thumbnail-bold',
      'thumbnail-bold-remove',
      'remove-video',
      'youtube-icon',
      'remove-thubnail',
      'video-player',
      'youtube-01', 
      'credit-card', 
      'tangerine', 
      'tangerine-gome',
      'google-ads', 
      'facebook-ads', 
      'facebook-f-ads', 
      'twitter-ads', 
      'tiktok-ads', 
      'instagram-ads',


      'zeplin-svgrepo-com', 
      'acrobat-reader-svgrepo-com', 
      'adobe-dreamweaver-svgrepo-com', 
      'adobe-illustrator-svgrepo-com', 
      'adobe-photoshop-svgrepo-com', 
      'adobe-premiere-svgrepo-com', 
      'amazon-2-logo-svgrepo-com', 
      'amazon-pay-svgrepo-com', 
      'amazon-svgrepo-com', 
      'angular-svgrepo-com', 
      'apache-svgrepo-com', 
      'apple-app-store-svgrepo-com', 
      'apple-laptop-computer-svgrepo-com', 
      'apple-music-logo-svgrepo-com', 
      'apple-music-svgrepo-com', 
      'apple-svgrepo-com', 
      'aws-svgrepo-com', 
      'code-svgrepo-com', 
      'c-sharp-svgrepo-com', 
      'css-3-svgrepo-com', 
      'dotnet-svgrepo-com', 
      'facebook-ads', 
      'facebook-f-ads', 
      'feather', 
      'figma-svgrepo-com', 
      'firebase-svgrepo-com', 
      'firefox-svgrepo-com', 
      'github-svgrepo-com', 
      'gitlab-svgrepo-com', 
      'git-svgrepo-com', 
      'google', 
      'google-ads', 
      'google-play-svgrepo-com', 
      'google-svgrepo-com', 
      'heroicons-outline', 
      'heroicons-solid', 
      'html-5-svgrepo-com', 
      'imac-svgrepo-com', 
      'instagram-ads', 
      'java-svgrepo-com', 
      'jquery-svgrepo-com', 
      'js-svgrepo-com', 
      'linkedin-1-svgrepo-com', 
      'linkedin-icon-svgrepo-com', 
      'linux-svgrepo-com', 
      'lua-svgrepo-com', 
      'mastercard-svgrepo-com', 
      'material-outline', 
      'material-solid', 
      'material-twotone', 
      'microsoft-edge-svgrepo-com', 
      'microsoft-teams-svgrepo-com', 
      'ms-excel-svgrepo-com', 
      'ms-word-svgrepo-com', 
      'netflix-1-logo-svgrepo-com', 
      'netflix-svgrepo-com', 
      'nodejs-svgrepo-com', 
      'paypal-svgrepo-com', 
      'pinterest-1-svgrepo-com', 
      'postgresql-svgrepo-com', 
      'postman-icon-svgrepo-com', 
      'postman-svgrepo-com', 
      'python-svgrepo-com', 
      'react-logo-programming-2-svgrepo-com', 
      'settings', 
      'smartphone-svgrepo-com', 
      'snapchat-svgrepo-com', 
      'swagger-svgrepo-com', 
      'swift-svgrepo-com',  
      'tensorflow-svgrepo-com', 
      'tiktok-ads', 
      'tiktok-svgrepo-com', 
      'twitter-ads', 
      'typescript-icon-svgrepo-com', 
      'ubuntu-svgrepo-com', 
      'visa-svgrepo-com', 
      'visual-studio-svgrepo-com', 
      'vs-code-svgrepo-com', 
      'whatsapp-svgrepo-com', 
      'xamarin-svgrepo-com'  
    ];

    icons.forEach(icon => {
      this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`));
    });
  }
}

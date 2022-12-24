import { Component, OnInit} from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';
import { Directory } from '@capacitor/filesystem/dist/esm/definitions';
import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';
import { share } from 'rxjs';
import { fileURLToPath } from 'url';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectedImage:any;

  constructor() {}
  checkPlatformForWeb(){
    if(Capacitor.getPlatform() == 'web') return true;
    return false;
  }

  async getPicture(){
    // await Camera.requestPermissions();
  const image = await Camera.getPhoto({
    quality: 50,
    // allowEditing: true,
    source: CameraSource.Prompt,
    width: 600,
    resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
  });
 console.log('image',image);


  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  this.selectedImage = image;
  if(this.checkPlatformForWeb()) this.selectedImage.webPath = image.dataUrl;
  }
  // Can be set to the src of an image now
  //imageElement.src = imageUrl;
  async share(){
    await Share.share({
      title:'Share picture',
      text: 'Sharing an image',
      url: this.selectedImage.path,
      dialogTitle: 'Share with buddies',
    });
  
  
  
}

}

import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { Geolocation } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  loc: string | undefined;
  coordinates: any;
  latitude: any;
  longitude: any;
  selectedImage: any;

  

  constructor(public popoverController: PopoverController) {}
  ngOnInit() {

    this.getCurrentLocation();
    }

  async getCurrentLocation(){
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:',coordinates);
      this.latitude = coordinates.coords.latitude
      this.longitude = coordinates.coords.longitude

    } catch(e){
      console.log(e);
      this.openPopover();

    }
  }
  openPopover(){
    const ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            left: 5

          };
        }
        
      }
    };
  
  
  
  this.presentPopover(ev);
  }




  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'custom-popover',
      event: ev,
      translucent: true
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with data', data);
    if(data){
      if(!data?.data) this.loc  = 'Dublin city, dublin';
      
      else {
        this.requestGeolocationPermission();
        
      }
    }
  }
  async requestGeolocationPermission(){
    try{
      const status= await Geolocation.requestPermissions();
      console.log(status);

    }catch(e){
      console.log(e)

    }
  }

  async share(){
    await Share.share({
      title:'Share location',
      text: this.latitude+" "+this.longitude,
      dialogTitle: 'Share with buddies',
    });
    


}

}


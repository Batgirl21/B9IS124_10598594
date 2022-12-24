import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonicModule } from '@ionic/angular';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  messages = [
    {
      user: 'Reshma',
      createdAt: 155409085600,
      msg: 'Hey whats up?'
    },
    {
      user: 'Teju',
      createdAt: 155409095600,
      msg: 'Working, you?'
    },
    {
      user: 'Reshma',
      createdAt: 155409105600,
      msg: 'Doing some new tutorial stuff'

    }
  ];

  currentUser = 'Reshma';
  newMsg = '';
  

  constructor() {}

  sendMessage() {
    this.messages.push({
      user: 'Reshma',
      createdAt: new Date().getTime(),
      msg: this.newMsg

    });

    this.newMsg = '';


  }

  


}

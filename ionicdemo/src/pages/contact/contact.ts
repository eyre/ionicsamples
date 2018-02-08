import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var SharePlugin: any;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {
  		console.log("share")
  }

  	share(){
  		console.log("share1")
		SharePlugin.share("text",
		succ => {
			alert(succ);
		},
		err => {
			alert(err);
		})
	}

}

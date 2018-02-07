import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JPushPlugin } from '@ionic-native/jpush';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public jpush: JPushPlugin, public navCtrl: NavController) {
	this.init();
	//延迟执行，等极光完全初始化
	setTimeout(()=>{
		this.jpush.getRegistrationID()
        .then(rid => {
          console.log('111获取RegistrationID: ' + rid);
          alert('111获取RegistrationID: ' + rid);
        })
        .catch(err => {
          console.log('222获取RegistrationID');
          alert('222获取RegistrationID' + err);
        });
	},300)
  }

	init(){
	    //初始化极光
	    this.jpush.init();
	    
	    //收到通知时会触发该事件。
	    document.addEventListener("jpush.receiveNotification", function (event) {
	        alert( JSON.stringify( event ) );
	    }, false);
	    
	}
}

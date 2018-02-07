import { Injectable } from '@angular/core'
import { Platform } from 'ionic-angular';

@Injectable()
export class HelperService {

  constructor(platform: Platform) {
    if(platform.is('android')){
      console.log('platform android')
    }else if(platform.is('ios')){
      console.log('platform ios')
    }else if(platform.is('mobile')){
      console.log('platform mobile')
    }
  }

  initJPush() {
      // 初始化极光
      window['plugins'].jPushPlugin.init();
      window['plugins'].jPushPlugin.getRegistrationID(function(rId) {
        console.log("JPushPlugin:registrationID is " + rId)
        alert("JPushPlugin:registrationID is " + rId);
      })
      // window['plugins'].jPushPlugin.getRegistrationID().then(res => { alert(res) });
      // window.JPush.init();
      // window.JPush.getRegistrationID(function(rId) {
      //   console.log("JPushPlugin:registrationID is " + rId)
      // })
      // 收到通知时会触发该事件。
      document.addEventListener("jpush.receiveNotification", function (event) {
          alert( JSON.stringify( event ) );
      }, false);
      // 点击通知进入应用程序时会触发该事件
      document.addEventListener("jpush.openNotification", function (event) {
        alert( JSON.stringify( event ) );
        // var alertContent
        // if(device.platform == "Android") {
        //   alertContent = event.alert
        // } else {
        //   alertContent = event.aps.alert
        // }
      }, false);
  }

}

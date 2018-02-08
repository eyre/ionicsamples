import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

declare var JMessage: any;
// declare let JMessage:any;
const appkey = '789e60ca59f6120d4c4f93d6';
// const secretkey = '8c309f6916c00a3e09ac1ed7'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	protected jmessage:any;
    protected username:string;
  constructor(public platform:Platform, public navCtrl: NavController, public alertCtrl: AlertController) {
  }
    ngOnInit(){
    	console.log('init success');
    	this.init();
        // this.jmessage = new JMessage({
        //     debug : true
        // });
        // this.initJMessage();
    }

    init(){
    	JMessage.init({ isOpenMessageRoaming: true });
    	JMessage.setDebugMode({ enable: true });

	    var listener = function (msg) {
            console.log(JSON.stringify(msg));
            alert('接收到消息'+JSON.stringify(msg));
		};
		JMessage.addReceiveMessageListener(listener);
    }

    register(username: string, password: string){
    	// alert('登录成功');
    	JMessage.register({ username: username, password: password },
		  (data) => {
            console.log(JSON.stringify(data));
            alert('注册成功'+JSON.stringify(data));
		  }, 
		  (error) => {
		    var code = error.code;
		    var desc = error.description;
		    console.log(JSON.stringify(error));
            alert('注册失败'+JSON.stringify(error));
		  }
	  	)
    }

    login(username: string, password: string){
    	// alert('登录成功');
    	JMessage.login({ username: username, password: password },
		  (data) => {
            console.log(JSON.stringify(data));
            alert('登录成功');
		  }, 
		  (error) => {
		    var code = error.code;
		    var desc = error.description;
		    console.log(JSON.stringify(error));
            alert('登录失败'+JSON.stringify(error));
		  }
	  	)
    }

    sendSingleMsg(target_username: string, content: string) {
	    this.getConversation(target_username, content);
    }

	getConversation(target_username: string , content: string){
		JMessage.getConversation({ type: 'single', username: target_username, appKey: appkey },
		  (conversation) => {
            console.log('获取会话成功'+JSON.stringify(conversation));

            this.sendTextMessage(target_username, content);
		  }, (error) => {
		    var code = error.code
		    var desc = error.description
		    console.log('获取会话失败'+JSON.stringify(error));
		    this.createConversation(target_username, content);
		  })
	}

	createConversation(target_username: string , content: string){
		JMessage.createConversation({ type: 'single', username: target_username, appKey: appkey },
		  (conversation) => {
            console.log(JSON.stringify(conversation));
            console.log('创建会话成功');

            this.sendTextMessage(target_username, content);
		  }, (error) => {
		    var code = error.code
		    var desc = error.description
		    console.log('创建会话失败'+JSON.stringify(error));
		  })
	}

	sendTextMessage(target_username: string, content: string){
	    JMessage.sendTextMessage({ type: 'single', username: target_username, appKey: appkey,
		  text: content, extras: {key1: 'value1'}, messageSendingOptions: JMessage.messageSendingOptions },
		  (msg) => {
            console.log('发送成功'+JSON.stringify(msg));
            alert('发送成功');
		  }, (error) => {
		    var code = error.code
		    var desc = error.description
		    console.log('发送失败'+JSON.stringify(error));
            alert('发送失败'+JSON.stringify(error));
		  })
	}


}

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {HttpService} from '../../../services/http.services';
declare let JMessage:any;
const appkey = 'd999b5f6dedbdcb5ff0f4a04';
const secretkey = '8c309f6916c00a3e09ac1ed7'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	protected jmessage:any;
    protected username:string;
  constructor(public platform:Platform, public navCtrl: NavController, public alertCtrl: AlertController, private httpService: HttpService) {
  }
    ngOnInit(){
        this.jmessage = new JMessage({
            debug : true
        });
    }
    loadAuthPayloadAndInit() {
        this.httpService.jmessage_auth_payload().subscribe(
        data => {
            console.log(data);
            if(data.err_code!=200){
                alert(data.err_msg);
            }else{
                let payload = data.result;
                console.log(payload);
                this.initJMessage(payload);
            }
        },
        error => {
            console.log(error);
            alert(error);
        });
    }
    initJMessage(auth_payload:any){
        this.jmessage.init({
            "appkey": auth_payload.appkey,
            "random_str": auth_payload.random_str,
            "signature": auth_payload.signature,
             "timestamp": auth_payload.timestamp,
             "flag":1    //是否启用消息记录漫游，默认 0 否，1 是
        }).onAck(function(data){
          console.log('ack:' + JSON.stringify(data));
        }).onSuccess(function(data) {
            console.log('success:' + JSON.stringify(data));
        }).onFail(function(data) {
            alert('error:' + JSON.stringify(data))
        });
        this.jmessage.onMsgReceive(function(data) {
            var msg = data;
            var body = data.messages[0].content.msg_body;
            //console.log(data.messages[0].content);
            data = JSON.stringify(data);
            console.log('msg_receive:' + data);
            alert('msg_receive:' + data);
            // if(msg.messages[0].content.msg_type === 'image'){  //消息转发
            //   this.jmessage.sendGroupPic({
            //      'target_gid' : gid,
            //      'target_gname' : target_gname,
            //      'msg_body':body
            //   }).onSuccess(function(data) {
            //      console.log('消息转发成功');
            //   })
            // }
        });
        this.jmessage.onEventNotification(function(data) {
            console.log('event_receive: ' + JSON.stringify(data));
        });
        this.jmessage.onSyncConversation(function(data) { //离线消息同步监听
            console.log('event_receive: ' + data);
        });
        this.jmessage.onUserInfUpdate(function(data) {
            console.log('onUserInfUpdate : ' + JSON.stringify(data));
        });
        this.jmessage.onSyncEvent(function(data) {
            console.log('onSyncEvent : ' + JSON.stringify(data));
        });
        this.jmessage.onDisconnect(function(){
            alert('JMessage 断开!');
        });
    }
    register(username: string, password: string) {
        if(username.length==0 || password.length==0){
            alert('请输入用户名和密码');
            return;
        }
        this.username = username;
        this.jmessage.register({
            'username' : username,
            'password': password,
            'is_md5' : false
        }).onAck(function(data){
            // this.user.username= username;
            // this.user.password= password;
            // console.log('user:' + JSON.stringify(this.user));
          console.log('ack:' + JSON.stringify(data));
        }).onSuccess(function(data) {
            console.log('success:' + JSON.stringify(data));
        }).onFail(function(data) {
            alert('error:' + JSON.stringify(data))
        });
    }
    login() {
        this.jmessage.login({
            'username' : this.username,
            'password' : 'password'
        }).onSuccess(function(data) {
            console.log('success:' + JSON.stringify(data));
            alert('登录成功')
        }).onFail(function(data) {
            console.log('error:' + JSON.stringify(data));
            alert('登录失败')
        }).onTimeout(function(data) {
            console.log('timeout:' + JSON.stringify(data));
            alert('登录超时')
        });
    }
    sendSingleMsg(target_username: string, content: string) {
        this.jmessage.sendSingleMsg({
            'target_username' : target_username,
            'target_nickname' : target_username,
            'content' : content,
            'custom_notification' : {
               'enabled':true,
               'title':'放假咯',
               'alert':'今天放假一天，大家好好玩'
            }
        }).onSuccess(function(data) {
            console.log('success:' + JSON.stringify(data));
        }).onFail(function(data) {
            console.log('error:' + JSON.stringify(data));
        });
    }


}

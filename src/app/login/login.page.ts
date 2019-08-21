import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  scheduled = [];
  map:any;
  marker:any;
  latitude:any="";
  logitude:any="";
  timestamp:any="";

  constructor(private plt: Platform, 
    private localNotifications: LocalNotifications, 
    private alertCtrl: AlertController, private geolocation: Geolocation) { 
      this.plt.ready().then(() => {
        this.localNotifications.on('click').subscribe(res => {
          console.log('click: ', res);
          let msg = res.data ? res.data.myData : '';
          this.showAlert(res.title, res.text, msg);
        });

        this.localNotifications.on('trigger').subscribe(res => {
          console.log('trigger: ', res);
          let msg = res.data ? res.data.myData : '';
          this.showAlert(res.title, res.text, msg);
        });

        var mapOptions= {
          center:{lat:23.2366,lng:79.3822},
          zoom:7
        }
        this.map = new google.maps.Map(document)
      });
    }

  ngOnInit() {
  }

  scheduleNotification(){
    // this.localNotifications.schedule({
    //   id: 1,
    //   title: 'Hi. Its me! :D',
    //   text: 'How do you do?',
    //   data: { page: 'Wohoo u can see me now!' },
    //   trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    //   actions: [
    //     { id: 'yes', title: 'yes' },
    //     { id: 'no', title: 'no' }
    //   ]
    // });

    this.localNotifications.schedule({
      id: 1,
      title: 'Hi. Its me! :D',
      text: 'How do you do?',
      data: { myData: 'Wohoo u can see me now!' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true
    });
  }

  recurringNotification() {
    this.localNotifications.schedule({
      id: 22,
      title: 'Recurring',
      text: 'Recurring, How do you do?',
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE }, // trigger: { at: new Date(newDate().getTime() + 5 * 1000) }
      // foreground: true
    });
  }

  repeatDaily() {
    this.localNotifications.schedule({
      id: 42,
      title: 'Its another day',
      text: 'Good morning',
      trigger: { every: { hour:19, minute:23
       } }, // trigger: { at: new Date(newDate().getTime() + 5 * 1000) }
      // foreground: true
    });
  }

  getAll() {
    this.localNotifications.getAll().then(res => {
      this.scheduled = res;
    });
  }

  showAlert(header, sub, msg){
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  
}

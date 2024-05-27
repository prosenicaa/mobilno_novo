import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string | undefined
  password: string | undefined
  isAdmin: boolean = false
  role: string = 'none'
  isLoading: boolean = false

  constructor(private http: HttpClient, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  onAdminSelect(e: any){
    let response = e.detail.value
    if(response == 'no'){
      this.isAdmin = false
    }else{
      this.isAdmin = true
    }
    
  }

  register(){
    this.isLoading = true
    let user = {
      email: this.email,
      password: this.password,
      isAdmin: this.isAdmin,
      role: this.role,
    }
    
    this.http.post('http://localhost:3001/users/register', user).subscribe(res =>{
      this.isLoading = false
      localStorage.setItem('User', JSON.stringify(res))
      this.router.navigateByUrl('home', {replaceUrl: true})

      console.log(user)
    }, error => {
      this.isLoading = false
      this.presentAlert('Registration Failed', error.error.error)
    })


  }


  async presentAlert(header: string, message: string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
  }

}
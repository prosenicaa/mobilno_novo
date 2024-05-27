import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = ''; 
  password: string = ''; 
  isLoading: boolean = false; 

  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      const toast = await this.toastCtrl.create({
        message: 'Please enter both email and password!',
        duration: 2000,
        color: 'warning',
      });
      toast.present();
      return;
    }

    this.isLoading = true;

    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
    });
    await loading.present();

    this.authService.login({ email: this.email, password: this.password }).subscribe(
      async (response) => {
        await loading.dismiss();
        this.isLoading = false; 
        this.navCtrl.navigateRoot('/home');
      },
      async (error) => {
        await loading.dismiss();
        this.isLoading = false; 
        const toast = await this.toastCtrl.create({
          message: 'Incorrect email or password!',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    );
  }
}

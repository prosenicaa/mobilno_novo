import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  books: any[] = [];

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  ionViewWillEnter() {
    this.getBooks();
  }

  getBooks() {
    this.http.get<any[]>('http://localhost:3001/books').subscribe(data => {
      this.books = data;
    }, error => {
      console.error('Error fetching books:', error);
    });
  }

  async deleteBook(id: string) {
    const loader = await this.loadCtrl.create({
      message: 'Deleting book...',
    });
    await loader.present();

    this.http.delete(`http://localhost:3001/books/${id}`).subscribe(
      async () => {
        await loader.dismiss();
        this.showToast('Book deleted successfully');
        this.getBooks(); // Refresh the book list
      },
      async (error) => {
        await loader.dismiss();
        this.showToast('Error deleting book: ' + error.message);
      }
    );
  }

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}

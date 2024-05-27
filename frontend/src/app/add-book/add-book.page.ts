import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {
  book = {} as Book;

  constructor(
    private toast: ToastController, 
    private load: LoadingController,
    private nav: NavController,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  async addBook(book: Book) {
    if (this.formValidation()) {
      let loader = await this.load.create({
        message: "Please wait",
        spinner: "bubbles"
      });

      loader.present();

      this.http.post('http://localhost:3001/books', book).subscribe(
        async () => {
          await loader.dismiss();
          this.showToast("Book added successfully");
          this.nav.navigateRoot("home");
        },
        async (error) => {
          await loader.dismiss();
          this.showToast("Error adding book: " + error.message);
        }
      );
    }
  }

  formValidation() {
    if (!this.book.author) {
      this.showToast("Please insert the author");
      return false;
    }

    if (!this.book.title) {
      this.showToast("Please insert the title");
      return false;
    }

    if (!this.book.year) {
      this.showToast("Please insert the year");
      return false;
    }

    if (this.book.read === undefined) {
      this.showToast("Insert if the book is read");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toast.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }
}

import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.page.html',
  styleUrls: ['./edit-book.page.scss'],
})
export class EditBookPage implements OnInit {

  book = {} as Book;
  id: any;

  constructor(
    private toast: ToastController, 
    private load: LoadingController,
    private nav: NavController,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getBookById(this.id);
  }

  async getBookById(id: string) {
    let loader = await this.load.create({
      message: "Please wait",
      spinner: "bubbles"
    });

    loader.present();

    this.http.get<Book>(`http://localhost:3001/books/${id}`).subscribe(
      data => {
        this.book = data;
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        this.showToast('Error fetching book: ' + error.message);
      }
    );
  }

  async updateBook(book: Book) {
    if (this.formValidation()) {
      let loader = await this.load.create({
        message: "Please wait",
        spinner: "bubbles"
      });
      loader.present();

      this.http.put(`http://localhost:3001/books/${this.id}`, book).subscribe(
        async () => {
          await loader.dismiss();
          this.showToast('Book updated successfully');
          this.nav.navigateRoot("home");
        },
        async error => {
          await loader.dismiss();
          this.showToast('Error updating book: ' + error.message);
        }
      );
    }
  }

  formValidation() {
    if (!this.book.title) {
      this.showToast("Please enter the title");
      return false;
    }

    if (!this.book.year) {
      this.showToast("Please enter the year");
      return false;
    }

    if (this.book.read === undefined) {
      this.showToast("Have you read this book?");
      return false;
    }

    return true;
  }

  showToast(message: any) {
    this.toast.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }
}

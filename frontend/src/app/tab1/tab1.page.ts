import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  selectedAdmin: any;
  admins: any;
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const user = localStorage.getItem('User')
    if(user == null){
      this.router.navigateByUrl('/login', {replaceUrl: true})
    }else{
      this.http.get('http://localhost:3001/users').subscribe(res =>{
        console.log(res)
      }, error =>{
        console.log(error)
      })
    }
    console.log(user)
  }

  onAdminSelect(e: { detail: { value: any; }; }){
    this.selectedAdmin = e.detail.value;
    console.log(this.selectedAdmin)
  }


}

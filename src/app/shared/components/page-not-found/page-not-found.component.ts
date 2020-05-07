import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {}

  back() {
    this.router.navigateByUrl('/');
  }
}

import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../service/loader/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  constructor(private loaderService: LoaderService){}

  public isLoading(): Subject<boolean> {
    return this.loaderService.isLoading;
  }

  ngOnInit(): void {
  }

}

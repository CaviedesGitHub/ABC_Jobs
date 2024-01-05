import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-Page-construction',
  templateUrl: './Page-construction.component.html',
  styleUrls: ['./Page-construction.component.css']
})
export class PageConstructionComponent implements OnInit {

  constructor(private _location: Location,) { }

  ngOnInit() {
  }

  back(){
    this._location.back()
  }
}

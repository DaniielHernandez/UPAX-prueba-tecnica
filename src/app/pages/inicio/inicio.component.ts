import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  images = [
    {path: '/assets/carousel/photo-1.jpg'},
    {path: '/assets/carousel/photo-2.jpg'},
    {path: '/assets/carousel/photo-3.jpg'},
    {path: '/assets/carousel/photo-4.jpg'},
    {path: '/assets/carousel/photo-5.jpg'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

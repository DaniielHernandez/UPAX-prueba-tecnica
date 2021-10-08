import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  rutas = [
    {
      name: 'Inicio',
      path: '/Inicio'
    },
    {
      name: 'Empleados',
      path: '/Empleados'
    },
    {
      name: 'Grupos',
      path: '/Grupos'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

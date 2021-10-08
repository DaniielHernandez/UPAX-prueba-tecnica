import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../interfaces/empleado';

const empleadoUrl = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/';
const userAPI = 'daniel_hernandez';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor( private http: HttpClient ) { }

  getEmpleados() {
    return this.http.get<any>(empleadoUrl+userAPI);
  }

  postPersona(empleaadoNuevo: Empleado) {
    return this.http.post<Empleado>(empleadoUrl+userAPI, empleaadoNuevo);
  }
}

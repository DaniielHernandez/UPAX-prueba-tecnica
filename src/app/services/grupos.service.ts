import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const grupoUrl = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/groups/';
const userAPI = 'daniel_hernandez';
const empleadosPorGrupo = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/'+userAPI+'/getByGroup?id=';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor( private http: HttpClient ) { }

  getGrupos() {
    return this.http.get<any>(grupoUrl+userAPI);
  }

  getEmpleadosPorGrupo(id: number) {
    return this.http.get<any>(empleadosPorGrupo+id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Empleado } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private listarActividades: string = "http://localhost:8080/empleados/buscar";

  constructor(private _httpClient: HttpClient) { }

  getEmpleados(): Observable<Empleado[]> {
    return this._httpClient.get<Empleado[]>(this.listarActividades).pipe(
      map(response => response)
    );
  }

}

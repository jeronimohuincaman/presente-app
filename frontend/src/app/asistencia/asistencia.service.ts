// asistencia.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private registros: any[] = [];

  constructor() { }

  agregarRegistro(registro: any) {
    this.registros.unshift(registro); // agrega al principio
  }

  obtenerRegistros(): any[] {
    return this.registros;
  }

  eliminarRegistro(registro: any) {
    const index = this.registros.indexOf(registro);
    if (index > -1) {
      this.registros.splice(index, 1);
    }
  }
}

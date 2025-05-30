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
  editarRegistro(index: number, payload: any) {
    if (index < 0 || index >= this.registros.length) return;

    this.registros[index] = { ...this.registros[index], ...payload };
  }


  eliminarRegistro(registro: any) {
    const index = this.registros.indexOf(registro);
    if (index > -1) {
      this.registros.splice(index, 1);
    }
  }

  obtenerRegistro(index: any) {
    const registro = this.registros[index];
    return registro ? { ...registro } : null; // Devuelve una copia del registro
  }
}

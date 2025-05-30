import { Component } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  standalone: false
})
export class AsistenciaPage {
  registros = [
    { id: 1, tipo: 'Ingreso', nombre: 'Juan Pérez', fecha: '2025-05-22' },
    { id: 2, tipo: 'Egreso', nombre: 'Juan Pérez', fecha: '2025-05-22' },
    { id: 3, tipo: 'Ingreso', nombre: 'Ana Gómez', fecha: '2025-05-21' },
    { id: 4, tipo: 'Egreso', nombre: 'Ana Gómez', fecha: '2025-05-21' },
  ];

  constructor() { }

  editar(registro: any) {
    console.log('Editar:', registro);
    // Aquí podrías navegar a un formulario con el ID o abrir un modal
  }

  eliminar(registro: any) {
    console.log('Eliminar:', registro);
    // Aquí podrías mostrar una alerta de confirmación
  }

  agregar() {
    console.log('Agregar nuevo registro');
    // Navegar a formulario vacío o mostrar modal
  }
}

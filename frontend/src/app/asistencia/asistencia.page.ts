import { Component } from '@angular/core';
import { AsistenciaService } from './asistencia.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  standalone: false
})
export class AsistenciaPage {

  registros: any[] = [];

  constructor(private navCtrl: NavController, private asistenciaService: AsistenciaService) { }

  ionViewWillEnter() {
    this.registros = this.asistenciaService.obtenerRegistros();
    console.log(this.registros)
  }

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
    this.navCtrl.navigateBack('/tabs/asistencia/alta', {
      animationDirection: 'forward'
    });
  }
}

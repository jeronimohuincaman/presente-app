import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { AsistenciaService } from '../../asistencia.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
  standalone: false
})
export class AltaPage {
  fecha: string = new Date().toDateString();
  observacion: string = '';
  foto: string = '';
  tipo: string = '';
  ubicacion: any = null;

  constructor(private asistenciaService: AsistenciaService, private navCtrl: NavController) { }

  async tomarFotoYUbicacion() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.foto = image.dataUrl || '';

      const coords = await Geolocation.getCurrentPosition();
      this.ubicacion = coords.coords;

      console.log('Foto tomada y ubicación guardada');
    } catch (error) {
      console.error('Error al capturar', error);
    }
  }

  resetForm() {
    this.fecha = new Date().toISOString();
    this.observacion = '';
    this.foto = '';
    this.tipo = '';
    this.ubicacion = null;
    console.log('Formulario reiniciado');
  }

  guardar() {
    const payload = {
      fecha: this.fecha,
      observacion: this.observacion,
      foto: this.foto,
      tipo: this.tipo,
      ubicacion: this.ubicacion
    };

    this.asistenciaService.agregarRegistro(payload);

    // Usar animación para ir hacia atrás (derecha a izquierda)
    this.navCtrl.navigateBack('/tabs/asistencia', {
      animationDirection: 'back'
    });

    // Reinicia el formulario
    this.resetForm();
  }
}
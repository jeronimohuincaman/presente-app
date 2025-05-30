import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
  standalone: false
})
export class AltaPage {
  fecha: string = new Date().toISOString();
  observacion: string = '';
  foto: string = '';
  tipo: string = '';
  ubicacion: any = null;

  constructor() { }

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

  guardar() {

    const payload = {
      fecha: this.fecha,
      observacion: this.observacion,
      foto: this.foto,
      tipo: this.tipo,
      ubicacion: this.ubicacion
    }

    console.log(payload);
    // Aquí podrías guardar en un servicio o backend
  }
}

import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camera-location',
  templateUrl: './camera-location.page.html',
  styleUrls: ['./camera-location.page.scss'],
  standalone: false
})
export class CameraLocationPage {
  location: any = null;
  photo: string | null = null;

  constructor() { }

  async getLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.location = coordinates.coords;
      console.log('Ubicación:', coordinates);
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
    }
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.photo = image.dataUrl!;
      console.log('Foto tomada');
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { AsistenciaService } from '../../asistencia.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { booleanPointInPolygon, point } from '@turf/turf';
import { areaPermitida } from 'src/shared/area-permitida';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
  standalone: false,
})
export class AltaPage implements OnInit {
  fecha: string = new Date().toISOString(); // ISO para que lo entienda <ion-datetime>
  observacion: string = '';
  foto: string = '';
  tipo: string = '';
  ubicacion: any = null;

  registro: any = null;
  id: any = null;

  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private asistenciaService: AsistenciaService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
    this.title = this.route.snapshot.paramMap.get('id')
      ? 'Editar Registro'
      : 'Nuevo Registro';
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.registro = this.asistenciaService.obtenerRegistro(this.id); // Implementalo en el service

    if (this.id && this.registro) {
      this.fecha = this.registro.fecha;
      this.observacion = this.registro.observacion;
      this.foto = this.registro.foto;
      this.tipo = this.registro.tipo;
      this.ubicacion = this.registro.ubicacion;
    }
  }

  async tomarFotoYUbicacion() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.foto = image.dataUrl || '';

      let coords;

      if (Capacitor.isNativePlatform()) {
        // En móvil: pide permiso y obtiene ubicación con Capacitor
        const permission = await Geolocation.requestPermissions();
        if (permission.location === 'granted') {
          const position = await Geolocation.getCurrentPosition();
          coords = position.coords;
        } else {
          this.presentToast('top', 'danger', 'Permiso de ubicación denegado', 2000);
          return;
        }
      } else {
        // En web: usa la API nativa del navegador
        if ('geolocation' in navigator) {
          coords = await new Promise<GeolocationCoordinates>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              pos => resolve(pos.coords),
              err => reject(err)
            );
          });
        } else {
          this.presentToast('top', 'danger', 'Geolocalización no soportada en este navegador', 2000);
          return;
        }
      }

      this.ubicacion = await this.verificarUbicacion(coords);

      console.log('Foto tomada y ubicación guardada');
    } catch (error) {
      console.error('Error al capturar', error);
    }
  }

  async verificarUbicacion(coords: any) {
    const ubicacion = coords; // { lat, lng }

    const puntoUsuario = point([ubicacion.latitude, ubicacion.longitude]);

    const estaDentro = booleanPointInPolygon(puntoUsuario, areaPermitida);

    if (estaDentro) {
      console.log('✅ Estás dentro del área válida');
      this.presentToast('top', 'success', 'Ubicación verificada correctamente', 1500);
      return ubicacion;
    } else {
      console.log('❌ Estás fuera del área permitida');
      this.presentToast('top', 'danger', 'Ubicación fuera del área permitida', 2000);
      return null;
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
      ubicacion: this.ubicacion,
    };

    if (this.registro) {
      this.asistenciaService.editarRegistro(this.id, payload);
    } else {
      this.asistenciaService.agregarRegistro(payload);
    }

    // Usar animación para ir hacia atrás (derecha a izquierda)
    this.navCtrl.navigateBack('/asistencia', {
      animationDirection: 'back',
    });

    // Reinicia el formulario
    this.resetForm();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', type: 'success' | 'danger' | 'warning', message: string, duration: number = 1500) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: type
    });

    await toast.present();
  }
}

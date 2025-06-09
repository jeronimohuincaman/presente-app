import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { AsistenciaService } from '../../asistencia.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { booleanPointInPolygon, point } from '@turf/turf';
import { areaPermitida } from 'src/shared/area-permitida';

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
    private navCtrl: NavController
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

      const coords = await Geolocation.getCurrentPosition();
      this.ubicacion = await this.verificarUbicacion(coords.coords);

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
      return ubicacion;
    } else {
      console.log('❌ Estás fuera del área permitida');
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
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {ToolsService} from '../../../services/tools.service';
import {DBPublicService} from '../../../services/routes/d-b-public.service';
import {CurrentStorageService} from '../../../services/current-storage.service';

@Component({
  selector: 'app-tipos-tendencias-page',
  templateUrl: './temporadas-reloj.component.html',
  styleUrls: ['./temporadas-reloj.component.scss']
})
export class TemporadasRelojComponent implements OnInit {
  @ViewChild('mdNuevaTendencia') modalTendencia: NgxSmartModalComponent;
  @ViewChild('mdNuevaColeccion') modalColeccion: NgxSmartModalComponent;
  @ViewChild('mdNuevaConfiguracion') modalConfiguraciones: NgxSmartModalComponent;
  @ViewChild('mdEliminarTemp') modalAdvTemporada: NgxSmartModalComponent;

  public esEditable = true;
  temporadaSeleccionda = undefined;
  nuevaColeccion: any = {};
  langs = {datosPorIdioma: {es: {}, fr: {}, it: {}, de: {}, en: {}}};
  nuevaTemporada: any = {...this.langs};
  nuevaConfiguracion: any = {...this.langs};
  public tendencias: any[] = [];
  public idiomas: any[] = [
    {nombre: 'Español', local: 'es'},
    {nombre: 'Alemán', local: 'de'},
    {nombre: 'Inglés', local: 'en'},
    {nombre: 'Italiano', local: 'it'},
    {nombre: 'Francés', local: 'fr'}];
  public idiomaSeleccionado = this.idiomas[0];
  public colecciones: any[] = [];
  public tipoProducto = 'relojes';
  public coleccionSeleccionada: any;
  currentFileColection: any;
  configuraciones: any[] = [];
  modelos: any[] = [];
  relojData: CurrentStorageService;
  _tendenciaSeleccionada: any = {};
  _coleccionSeleccionada: any = {};

  constructor(private route: ActivatedRoute,
              private db: DBPublicService, private tools: ToolsService, public currentStorageService: CurrentStorageService) {
    route.params.subscribe(params => {
      this.tipoProducto = params.tipoProductoSeleccionado;
      this.relojData = currentStorageService;
      console.log(this.relojData.modelos);
    });
  }


  ngOnInit() {
    this.tools.tituloTopbar = 'Temporadas';
    this.getTendencias();
  }

  getTendencias() {
    this.db.getTemporadas(this.tipoProducto).subscribe(value => {
      this.tendencias = [];
      if (value !== undefined) {
        value.forEach(result => {
          this.tendencias.push(result);
        });
        console.log('y pos aja');
        console.log(this.tendencias);
        // selecciono la primera de forma predeterminada
        this.seleccionarTendencia(this.tendencias[0]);
      } else {
        console.log('no existen tendencias');
      }
    });
  }

  getConfiguraciones(tipoProducto: string, keyColeccion: string) {
    this.db.getConfiguracionesReloj(tipoProducto, keyColeccion)
      .subscribe(value => {
        this.configuraciones = [];
        console.log('las configuraciones de este', value);
        if (value !== undefined) {
          value.forEach(result => {
              this.configuraciones.push(result);
            }
          );
        }
      });
  }


  seleccionarColeccion(coleccionSeleccionada) {
    this.coleccionSeleccionada = coleccionSeleccionada;
    this._coleccionSeleccionada = Object.assign({}, coleccionSeleccionada);
    console.log('cooollections', coleccionSeleccionada);
    this.getConfiguraciones(this.tipoProducto, coleccionSeleccionada.metadata.key);
  }

  seleccionarTendencia(tendenciaSeleccionada: any) {
    this.temporadaSeleccionda = tendenciaSeleccionada;
    this._tendenciaSeleccionada = Object.assign({}, tendenciaSeleccionada);
    this.configuraciones = [];
    this.colecciones = [];
    this.db.getColecciones(this.tipoProducto, tendenciaSeleccionada).subscribe(value => {
      this.colecciones = [];
      // console.log(this.temporadaSeleccionda);
      if (value) {
        this.colecciones = value;
        this.seleccionarColeccion(value[0]);
      }
    });
  }

  pushConfiguracion() {
    this.nuevaConfiguracion['keyTemporada'] = this.temporadaSeleccionda.metadata.key;
    this.nuevaConfiguracion['keyColeccion'] = this.coleccionSeleccionada.metadata.key;
    this.nuevaConfiguracion.estado = 'Pública';
    console.log('nuevo config', this.nuevaConfiguracion);

    this.db.setConfiguracionReloj(this.tipoProducto, this.temporadaSeleccionda,
      this.coleccionSeleccionada, this.nuevaConfiguracion).then(value => {
      console.log('se sube configuración de reloj ;)');
      this.modalConfiguraciones.close();
    });
  }

  pushTemporada(tendencia: any) {

    this.db.setTemporada(this.tipoProducto, tendencia).then(value => {
      this.modalTendencia.close();
    });
    this.getTendencias();
  }

  actualizarTemporada(tendencia: any) {
    this.db.updateTemporada(this.tipoProducto, tendencia).then(value => {
      this.modalTendencia.close();
    });
    this.getTendencias();
  }

  pushColeccion() {
    this.db.pushImage(this.currentFileColection, 'datosProductos/relojes/colecciones', url => {
      this.nuevaColeccion['imgUrl'] = url;
      this.nuevaColeccion['keyTemporada'] = this.temporadaSeleccionda.metadata.key;
      this.db.setColeccion(this.tipoProducto, this.temporadaSeleccionda, this.nuevaColeccion).then(value => {
        console.log('se sube colección ;)');
        this.modalColeccion.close();
        this.currentFileColection = undefined;
      });
    });
  }

  actualizarColeccion(coleccionSeleccionada: any) {
    this.db.updateColeccion(this.tipoProducto, this.temporadaSeleccionda, coleccionSeleccionada).then(value => {
      console.log('colección actualizada');
    });
  }

  eliminarConfig(selectedConfig: any) {
    this.db.eliminarItem('configuracionesReloj', selectedConfig).then(value => {
      console.log(value);
    }).catch(reason => {
      console.log(reason);
    });
  }

  eliminarTemporada(tempo: any) {
    this.db.eliminarItem('temporadas', tempo).then(value => {
      console.log(value);
      this.modalAdvTemporada.close();
    }).catch(reason => {
      console.log(reason);
    });
  }
}
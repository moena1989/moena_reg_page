import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {ToolsServices} from '../../../services/tools-services.service';
import {DBPublicService} from '../../../services/routes/d-b-public.service';
import {CurrentStorageService} from '../../../services/current-storage.service';
import {DEFAULT_CODE_LANG} from '../../../../environments/environment';

@Component({
  selector: 'app-tipos-tendencias-page',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {
  @ViewChild('mdTrendEdit') modalSeason: NgxSmartModalComponent;
  @ViewChild('mdNuevaColeccion') modalCollection: NgxSmartModalComponent;
  @ViewChild('mdNuevaConfiguracion') modalWatchSets: NgxSmartModalComponent;
  @ViewChild('mdEliminarTemp') modalAdvTemporada: NgxSmartModalComponent;
  @ViewChild('mdEliminarCollection') modalDeleteCol: NgxSmartModalComponent;
  public isEditable = true;
  selectedSeason = undefined;
  nwCollection: any = {};
  currentSeason: any = {};
  nwWatchSetting: any = {};
  public tendencias: any[] = [];
  public selectedLang: any = {};
  public collections: any[] = [];
  public productType = 'watches';
  public selectedCollection: any;
  public localApp: string;
  currentFileCollection: any;
  watchSettings: any[] = [];
  selectedSeasonCopy: any = {};
  selectedCollectionCopy: any = {};
  isUploading = false;
  selectedCurr: any = undefined;
  private newSeason = {...this.current.multiLangStructure, state: 'Privada'};
  private isSeasonUpdating: boolean;

  constructor(private route: ActivatedRoute,
              private db: DBPublicService, private settings: ToolsServices, public current: CurrentStorageService) {
    this.localApp = settings.localApp;
  }

  ngOnInit() {
    this.settings.tituloTopbar = 'Temporadas';
    this.selectedLang = this.current.defaultSelectedLang;
    this.getSeasons();
    this.currentSeason = Object.assign({}, this.newSeason);
    this.nwCollection = {...this.current.multiLangStructure};
    this.nwWatchSetting = {...this.current.multiLangStructure};
    this.selectedLang = this.current.defaultSelectedLang;
  }

  getSeasons() {
    this.db.getSeasons(this.productType).subscribe(value => {
      this.tendencias = [];
      if (value !== undefined) {
        value.forEach(result => {
          this.tendencias.push(result);
        });
        // console.log('tendencias traidas', this.tendencias);
        if (this.tendencias.length !== 0) {
          this.selectedLang = this.current.defaultSelectedLang;
          this.selectSeason(this.tendencias[0]);
        }
      } else {
        console.log('no existen tendencias');
      }
    });
  }

  getWatchSettings(tipoProducto: string, idCollection: string) {
    this.db.getConfiguracionesReloj(tipoProducto, idCollection)
      .subscribe(value => {
        this.watchSettings = [];
        // console.log('las watchSettings de este', value);
        if (value !== undefined) {
          value.forEach(result => {
              this.watchSettings.push(result);
            }
          );
        }
      });
  }

  selectCollection(coleccionSeleccionada) {
    console.log(coleccionSeleccionada);
    this.selectedCollection = coleccionSeleccionada;
    this.selectedCollectionCopy = Object.assign({}, coleccionSeleccionada);
    // console.log('cooollections', selectedCollection);
    this.getWatchSettings(this.productType, coleccionSeleccionada.metadata.id);
  }

  selectSeason(selectedSeason: any) {
    this.selectedSeason = selectedSeason;
    this.selectedSeasonCopy = Object.assign({}, selectedSeason);
    this.watchSettings = [];
    this.collections = [];
    console.log(selectedSeason);
    this.db.getCollections(this.productType, selectedSeason).subscribe(value => {
      this.collections = [];
      if (value[0]) {
        this.collections = value;
        this.selectCollection(value[0]);
      }
    });
  }

  pushWatchSetting() {
    // console.log(this.nwWatchSetting);
    this.nwWatchSetting['idSeason'] = this.selectedSeason.metadata.id;
    this.nwWatchSetting['idCollection'] = this.selectedCollection.metadata.id;
    this.nwWatchSetting.estado = 'Pública';
    // console.log('nuevo config', this.nwWatchSetting);
    this.isUploading = true;

    this.db.setConfiguracionReloj(this.productType, this.selectedSeason,
      this.selectedCollection, this.nwWatchSetting).then(value => {
      // console.log('se sube configuración de reloj ;)');
      this.modalWatchSets.close();
      this.isUploading = false;
    });
  }

  pushSeason(currentSeason: any) {
    this.isUploading = true;
    this.db.setSeason(this.productType, currentSeason).then(value => {
      this.modalSeason.close();
      this.isUploading = false;
      this.currentSeason = Object.assign({}, this.newSeason);
    });
    this.getSeasons();
  }

  updateSeason(tendencia: any) {
    this.isUploading = true;
    this.db.updateTemporada(this.productType, tendencia).then(value => {
      this.modalSeason.close();
      this.isUploading = false;
    });
    this.getSeasons();
  }

  pushCollection() {
    this.isUploading = true;
    this.db.setNewImage(this.currentFileCollection, 'products/watches/collections').then(imgData => {
      {
        this.nwCollection.imgData = imgData;
        this.nwCollection.idSeason = this.selectedSeason.metadata.id;
        this.db.setCollection(this.productType, this.selectedSeason, this.nwCollection).then(value => {
          this.modalCollection.close();
          this.isUploading = false;
          this.nwCollection = {...this.current.multiLangStructure};
          this.currentFileCollection = undefined;
        });
      }
    });
  }

  actualizarColeccion(coleccionSeleccionada: any) {
    this.db.updateColeccion(this.productType, this.selectedSeason, coleccionSeleccionada).then(value => {
      // console.log('colección actualizada');
    });
  }

  eliminarConfig(selectedConfig: any) {
    this.db.deleteItem('configuracionesReloj', selectedConfig).then(value => {
      // console.log(value);
    }).catch(reason => {
      // console.log(reason);
    });
  }

  deleteSeason(tempo: any) {
    this.isUploading = true;
    this.db.deleteItem(this.productType, tempo).then(value => {
      console.log(value);
      this.modalAdvTemporada.close();
      this.currentSeason = Object.assign({}, this.newSeason);
      this.selectedSeason = Object.assign({}, this.newSeason);
      this.isUploading = false;
    }).catch(reason => {
      console.log(reason);
    });
  }

  seleccionarIdiomaTendencia(t: any) {
    this.selectedLang = t;
    // console.log(t);
  }

  newNameSeason($event: any) {
    this.currentSeason[this.selectedLang.code].name = $event;
    if (this.selectedLang.code === DEFAULT_CODE_LANG) {
      this.currentSeason.name = $event;
    }
  }


  nwNameCollection($event: any) {
    this.nwCollection[this.selectedLang.code].name = $event;
    if (this.selectedLang.code === DEFAULT_CODE_LANG) {
      this.nwCollection.name = $event;
    }
  }

  initSeasonUpdate() {
    this.currentSeason = Object.assign({}, this.selectedSeason);
    this.modalSeason.open();
    this.isSeasonUpdating = true;
  }

  nwNameConfig($event: any) {
    this.nwWatchSetting[this.selectedLang.code].name = $event;
    if (this.selectedLang.code === DEFAULT_CODE_LANG) {
      this.nwWatchSetting.name = $event;
    }
  }

  deleteCollection(selectedCollection: any) {
    this.db.deleteCollection(this.productType, selectedCollection);
    this.modalDeleteCol.close();
    this.selectedCollection = undefined;
  }

  initCollectionUpdate() {
    // this.cur = Object.assign({}, this.selectedSeason);
    this.modalSeason.open();
    this.isSeasonUpdating = true;
  }
}

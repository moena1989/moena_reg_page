import {Component, OnInit} from '@angular/core';
import {DbService} from '../_services/db.service';
import {ToolsService} from '../_services/tools.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  titulo_actual;

  constructor(public db: DbService, public tools: ToolsService) {
  }

  ngOnInit() {
  }

  cerrarSesion() {
    this.tools.cerrarSesion();
  }

  alPresionarMenu() {
    this.tools.show_menu = !this.tools.show_menu;
  }
}
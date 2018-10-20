import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MonsterService } from '../../services/monster.service';
import { Monster } from '../../models/monster';
import { global } from '../../services/global';

@Component({
  selector: 'app-all-monsters',
  templateUrl: './all-monsters.component.html',
  styleUrls: ['./all-monsters.component.scss']
})
export class AllMonstersComponent implements OnInit {
  public monsterToEdit;//
  public monsters = [];
  public urlImage = global.urlApi + global.urlsRelativas.getImage;

  public carga = "";
  public modalRef: BsModalRef;
  public alertOK: boolean;
  public mensajeAlert: any;
  alertKO: boolean;

  constructor(private modalService: BsModalService,
              private _http:MonsterService) {}

  public openModal(template: TemplateRef<any>, monster:Monster) {
    this.monsterToEdit = monster;
    this.modalRef = this.modalService.show(template); // {3}
  }

  ngOnInit() {
    //Cargamos la lista de todos los monstruos
    //Pantalla de carga
    this.carga = "Cargando...";

    this._http.allMonster().subscribe(
      (data:any)=>{
        console.log(data);
        this.monsters = data.monsters;
        this.carga = null;
      },
      err => this.carga = "Error..."
    )

  }

  respOK(e){
    this.modalRef.hide()
    window.scrollTo(0,0);
    this.alertOK = true;
    this.alertKO = false;
    this.mensajeAlert = e;
  }
  respKO(e){
    this.modalRef.hide()
    window.scrollTo(0,0);
    this.alertKO = true;
    this.alertOK = false;
    this.mensajeAlert = e;
  }
}

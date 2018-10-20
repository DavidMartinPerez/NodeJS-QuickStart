import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Monster } from '../../models/monster';
import { MonsterService } from '../../services/monster.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { global } from '../../services/global';
import { Router } from '../../../../node_modules/@angular/router';


@Component({
    selector: 'app-edit-monster',
    templateUrl: './edit-monster.component.html',
    styleUrls: ['./edit-monster.component.scss'],
    providers: [UploadService]
})
export class EditMonsterComponent implements OnInit {

    public title: string;
    public monster: any;
    public filesToUpload:Array<File>

    //FormGroup del formulario
    formMonster: FormGroup;


    //Comprobamos si viene para editar o crear
    @Input('monster') editMonster: Monster;
    @Output('ok') ok = new EventEmitter<string>();
    @Output('ko') ko = new EventEmitter<string>();

    constructor(
        private _http: MonsterService,
        private formBuilder: FormBuilder,
        private _upload: UploadService,
        private _router: Router
    ) { }

    ngOnInit() {
        //TODO: Hacer que los tipos se guarden apartir de un array
        //https://angular.io/guide/reactive-forms#step-1-importing-the-formarray-class
        this.formMonster = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            type: ['', Validators.required],
            strength: ['', Validators.required],
            life: ['', Validators.required],
            nicknames: ['', Validators.required],
            sprite: ['', Validators.required]
        });


        if (this.editMonster != null) {
            //contruimos el formulario
            let form = this.formMonster.controls;
            let m = this.editMonster;

            //Seteamos valores
            form['name'].setValue(m.name);
            form['description'].setValue(m.description);
            form['type'].setValue(m.type);
            form['strength'].setValue(m.strength);
            form['life'].setValue(m.life);
            form['nicknames'].setValue(m.nicknames);

            form['sprite'].setValidators([])
        } else {
            this.title = "Nuevo monstruo descubierto";
        }

    }

    onSubmit(e) {
        let form = this.formMonster.value;
        // Contruimos el Monstruo
        this.monster = new Monster(
            form.name,
            form.description,
            form.type,
            form.strength,
            form.life,
            form.nicknames
        );
        if (this.editMonster != null) { //Con esto comprobamos si no estamos editando
            this.monster._id = this.editMonster._id;
            console.log(this.monster)
            this._http.updateMonster(this.monster._id, this.monster).subscribe(
                (data:any)=>{
                    if(data.monster){
                        if(this.filesToUpload){
                            this._upload.makeFileRequest(`${global.urlApi+global.urlsRelativas.uploadSprite + data.monster._id}`,[],this.filesToUpload,"image").then(
                                (result:any)=>{
                                    this.ok.emit("Ya esta editado con su imagen " + data.monster.name)
                                }, (error) => {
                                    console.log(error)
                                    this.ko.emit("Error al añadir la imagen del monstruo " + this.editMonster.name)
                                }
                            );
                        }else{
                            this.ok.emit("Ya esta editado " + data.monster.name)
                        }
                    }
                }, err => {this.ko.emit("Error al editar el monstruo " + this.editMonster.name)}
            )
        } else {
            //Creamos el número monstruo
            this._http.addMonster(this.monster).subscribe(
                (data:any) => {
                    if(data.monster){
                        //Subir la imagen
                        this._upload.makeFileRequest(`${global.urlApi+global.urlsRelativas.uploadSprite + data.monster._id}`,[],this.filesToUpload,"image").then(
                            (result:any)=>{
                                console.log(result)
                                this._router.navigateByUrl("/");
                            }, (error) => {
                                alert("No se puedo subir la imagen")
                                console.log(error)
                                this._router.navigateByUrl("/");
                            }
                        );
                    }
                },
                (error) => {
                    this.ko.emit("Error al guardar")
                }
            )
        }
    }

    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    deleteMonster(id){
        this._http.deleteMonster(id).subscribe(
            (data)=>{
                this.ok.emit("Eliminado ok")
            }, err => this.ko.emit("Error al eliminar monstruo")
        )
    }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";
import { Monster } from "../models/monster";
import { global } from "./global";
import {map} from "rxjs/operators";


@Injectable()
export class MonsterService{
    public urlApi:string;
    public urlsRelativas:any;
    constructor(
        private _http: HttpClient
    ){
        this.urlApi = global.urlApi;
        this.urlsRelativas = global.urlsRelativas;
    }
    public header = new HttpHeaders().set('Content-Type','application/json');

    //GET
    getMonster(id){
        return this._http.get(`${this.urlApi + this.urlsRelativas.getMonster}?${id}`).pipe(
            map(res =>  res)
        );
    }

    allMonster(){
        return this._http.get(`${this.urlApi + this.urlsRelativas.allMonsters}`).pipe(
            map(res =>  res)
        );
    }
    testApi(){
        return this._http.get(`${this.urlApi + this.urlsRelativas.urlTest}`).pipe(
            map(res =>  res)
        );
    }

    //POST
    addMonster(monster:Monster){
        return this._http.post(`${this.urlApi + this.urlsRelativas.addMonster}`, JSON.stringify(monster), {headers: this.header}).pipe(
            map(res =>  res)
        );
    }

    //PUT
    updateMonster(id, monster){
        return this._http.put(`${this.urlApi + this.urlsRelativas.updateMonster}${id}`, JSON.stringify(monster), {headers: this.header}).pipe(
            map(res =>  res)
        );
    }

    //DELETE

    deleteMonster(id){
        return this._http.delete(`${this.urlApi + this.urlsRelativas.deleteMonster}${id}`, {headers: this.header}).pipe(
            map(res =>  res)
        );
    }
}

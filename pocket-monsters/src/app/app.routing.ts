import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Router} from "@angular/router";

import { AppComponent } from './app.component';
import { AllMonstersComponent } from './components/all-monsters/all-monsters.component';
import { EditMonsterComponent } from './components/edit-monster/edit-monster.component';
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
    {
        path: '',
        component: AllMonstersComponent
    },{
        path: 'nuevo-monstruo',
        component: EditMonsterComponent
    },{
        path: '**',
        component: AllMonstersComponent
    }
];

export const appRoutingProviders:any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { IonicModule } from '@ionic/angular';
import { ShoppingInfoComponent } from './components/shopping-info/shopping-info.component';

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingInfoComponent,
  ],
  entryComponents: [
    ShoppingComponent,
    ShoppingInfoComponent,
  ],
  exports: [
    ShoppingComponent,
    ShoppingInfoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }

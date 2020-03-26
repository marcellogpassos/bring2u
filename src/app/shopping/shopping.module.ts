import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreatePage } from './create/create.page';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ShoppingsService } from './shoppings.service';

@NgModule({
  imports: [
    AngularFirestoreModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingRoutingModule
  ],
  declarations: [CreatePage],
  providers: [ShoppingsService]
})
export class ShoppingModule {}

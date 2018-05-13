import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPostPage } from './viewpost';

@NgModule({
  declarations: [
    ViewPostPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewPostPage),
  ],
})
export class BlankPageModule {}

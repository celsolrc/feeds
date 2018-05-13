import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../models/posts.model';

/**
 * Generated class for the BlankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewpost',
  templateUrl: 'viewpost.html',
})
export class ViewPostPage {

  private post :Post

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.post = this.navParams.get('postSelected')
  }

  ionViewDidLoad() {
  }

  goBack(){
    this.navCtrl.pop();
  }
}

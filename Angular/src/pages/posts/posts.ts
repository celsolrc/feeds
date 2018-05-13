import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../models/posts.model'

/**
 * Generated class for the BlankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  private posts : Post[]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.posts = this.navParams.get('posts')
  }

  ionViewDidLoad() {

  }

  goBack(){
    this.navCtrl.pop();
  }

  postSelected(post : Post) {
    this.navCtrl.push('ViewPostPage', { postSelected: post})
  }
}

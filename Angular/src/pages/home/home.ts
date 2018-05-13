import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular'
import { FeedsService } from '../../services/feeds.service';
import { Feed } from '../../models/feeds.model'
import { Retorno } from '../../models/retorno.model'
import { FeedReaderService } from '../../services/feedreader.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FeedsService,
    FeedReaderService]
})
export class HomePage implements OnInit {

  public feeds: Feed[]

  constructor(private feedsService: FeedsService,
    private feedReaderService: FeedReaderService,
    private alertCtrl: AlertController, public navCtrl: NavController) {
  }

  ngOnInit() {
    this.atualizaLista()
  }

  // Mostrar post ao selecionar Feed TODO:
  feedSelected(feed: Feed) {
    this.navCtrl.push('PostsPage', { posts: feed.posts })
  }

  // Evento de exclusao do Feed
  removeItem(feed: Feed) {
    this.feedsService.deleteFeed(feed)
      .then((retorno: Retorno) => {
        if (retorno.status == '1') {
          this.atualizaLista()
        } else {
          //          this.mostraMsgErro(titulo: string, subtitulo: string, mensagem: string) {
            this.mostraMsgErro('Remover Feed', 'Erro', retorno.status)
        }
      })
      .catch((reason: any) => {
        this.feeds = []
      })
  }

  // Evento de editar do feed
  editItem(feed: Feed) {
    this.feedForm(feed, false)
  }

  // Evento de inserir do feed
  newItem() {
    var newFeed: Feed = new Feed()
    newFeed._id = null
    this.feedForm(newFeed, true)
  }

  // Solicita URL do Feed para alterar ou incluir
  feedForm(feed: Feed, inserir: boolean) {
    var inserir: boolean
    var titulo: string

    if (inserir) {
      titulo = 'Inserir Feed'
    } else {
      titulo = 'Alterar Feed'
    }
    let alert = this.alertCtrl.create({
      title: titulo,
      inputs: [
        {
          name: 'url',
          placeholder: 'endereço do feed',
          value: feed.url
        }
      ],
      buttons: [
        {
          text: 'Salvar',
          handler: data => {
            feed.url = data.url
            this.manipulaFeedInformado(feed, inserir)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    })
    alert.present()
  }


  // Manipula URL do Feed para alteracao ou inclusao
  manipulaFeedInformado(feed: Feed, inserir: boolean) {
    this.feedReaderService.readFeed(feed.url)
      .then((res) => {

        if (res == null) {
          //          this.mostraMsgErro(titulo: string, subtitulo: string, mensagem: string) {
          this.mostraMsgErro('Ler Feed', 'Erro', 'Nenhum feed rss encontrado');

        } else {
          var result: Feed = res

          if (inserir) {
            this.insereFeed(result)
          } else {
            this.alteraFeed(result)
          }
        }
      })
  }

  // Grava feed novo
  insereFeed(feed: Feed) {
    this.feedsService.addFeed(feed)
      .then((retorno: Retorno) => {
        if (retorno.status == '1') {
          this.atualizaLista()
        } else {
          //          this.mostraMsgErro(titulo: string, subtitulo: string, mensagem: string) {
            this.mostraMsgErro('Inclir feed', 'Erro', retorno.status)
        }
      })
      .catch((reason: any) => {
        this.feeds = []
      })
  }

  // Grava alteracao do feed 
  alteraFeed(feed: Feed) {
    this.feedsService.updateFeed(feed)
      .then((retorno: Retorno) => {
        if (retorno.status == '1') {
          this.atualizaLista()
        } else {
          //          this.mostraMsgErro(titulo: string, subtitulo: string, mensagem: string) {
            this.mostraMsgErro('Alterar Feed', 'Erro', retorno.status)
        }
      })
      .catch((reason: any) => {
        this.feeds = []
      })
  }

  // Msg de erro
  mostraMsgErro(titulo: string, subtitulo: string, mensagem: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      message: mensagem,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel'
        }
      ]
    })
    alert.present()
    console.log(status)
  }

  // Atualiza Listview
  atualizaLista() {
    this.feedsService.getFeeds()
      .then((retorno: Retorno) => {
        if (retorno.status == '1') {
          this.feeds = retorno.records
        } else {
          this.feeds = []
        }
      })
      .catch((reason: any) => {
        this.feeds = []
      })
  }
}

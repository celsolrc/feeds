webpackJsonp([2],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/posts/posts.module": [
		275,
		1
	],
	"../pages/viewpost/viewpost.module": [
		276,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 150;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_feeds_service__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_feeds_model__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_feedreader_service__ = __webpack_require__(273);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(feedsService, feedReaderService, alertCtrl, navCtrl) {
        this.feedsService = feedsService;
        this.feedReaderService = feedReaderService;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.ngOnInit = function () {
        this.atualizaLista();
    };
    // Mostrar post ao selecionar Feed TODO:
    HomePage.prototype.feedSelected = function (feed) {
        this.navCtrl.push('PostsPage', { posts: feed.posts });
    };
    // Evento de exclusao do Feed
    HomePage.prototype.removeItem = function (feed) {
        var _this = this;
        this.feedsService.deleteFeed(feed)
            .then(function (retorno) {
            if (retorno.status == '1') {
                _this.atualizaLista();
            }
            else {
                //          this.mostraMsgErro(titulo: string, subtitulo: string, mensagem: string) {
                _this.mostraMsgErro('Remover Feed', 'Erro', retorno.status);
            }
        })
            .catch(function (reason) {
            _this.feeds = [];
        });
    };
    // Evento de editar do feed
    HomePage.prototype.editItem = function (feed) {
        this.feedForm(feed, false);
    };
    // Evento de inserir do feed
    HomePage.prototype.newItem = function () {
        var newFeed = new __WEBPACK_IMPORTED_MODULE_3__models_feeds_model__["a" /* Feed */]();
        newFeed._id = null;
        this.feedForm(newFeed, true);
    };
    // Solicita URL do Feed para alterar ou incluir
    HomePage.prototype.feedForm = function (feed, inserir) {
        var _this = this;
        var inserir;
        var titulo;
        if (inserir) {
            titulo = 'Inserir Feed';
        }
        else {
            titulo = 'Alterar Feed';
        }
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        feed.url = data.url;
                        _this.manipulaFeedInformado(feed, inserir);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    // Manipula URL do Feed para alteracao ou inclusao
    HomePage.prototype.manipulaFeedInformado = function (feed, inserir) {
        var _this = this;
        this.feedReaderService.readFeed(feed.url)
            .then(function (res) {
            if (res == null) {
                //          this.mostraMsgErro(titulo: string, subtitulo: string, mensagem: string) {
                _this.mostraMsgErro('Ler Feed', 'Erro', 'Nenhum feed rss encontrado');
            }
            else {
                var result = res;
                if (inserir) {
                    _this.insereFeed(result);
                }
                else {
                    _this.alteraFeed(result);
                }
            }
        });
    };
    // Grava feed novo
    HomePage.prototype.insereFeed = function (feed) {
        var _this = this;
        this.feedsService.addFeed(feed)
            .then(function (retorno) {
            if (retorno.status == '1') {
                _this.atualizaLista();
            }
            else {
                //          this.mostraMsgErro(titulo: string, subtitulo: string, mensagem: string) {
                _this.mostraMsgErro('Inclir feed', 'Erro', retorno.status);
            }
        })
            .catch(function (reason) {
            _this.feeds = [];
        });
    };
    // Grava alteracao do feed 
    HomePage.prototype.alteraFeed = function (feed) {
        var _this = this;
        this.feedsService.updateFeed(feed)
            .then(function (retorno) {
            if (retorno.status == '1') {
                _this.atualizaLista();
            }
            else {
                //          this.mostraMsgErro(titulo: string, subtitulo: string, mensagem: string) {
                _this.mostraMsgErro('Alterar Feed', 'Erro', retorno.status);
            }
        })
            .catch(function (reason) {
            _this.feeds = [];
        });
    };
    // Msg de erro
    HomePage.prototype.mostraMsgErro = function (titulo, subtitulo, mensagem) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subtitulo,
            message: mensagem,
            buttons: [
                {
                    text: 'Fechar',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
        console.log(status);
    };
    // Atualiza Listview
    HomePage.prototype.atualizaLista = function () {
        var _this = this;
        this.feedsService.getFeeds()
            .then(function (retorno) {
            if (retorno.status == '1') {
                _this.feeds = retorno.records;
            }
            else {
                _this.feeds = [];
            }
        })
            .catch(function (reason) {
            _this.feeds = [];
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/celsocruz/Desktop/Trabalhos/TesteIonic/feeds/Angular/Feeds/src/pages/home/home.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>Feeds</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="royal" (click)="newItem()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-row *ngIf="feeds?.length == 0">\n        <ion-label>\n          Sem feeds\n        </ion-label>\n    </ion-row>\n\n        <ion-list inset *ngIf="feeds?.length>0" >\n          <ion-item-sliding *ngFor="let feed of feeds" >\n            <button ion-item (click)="feedSelected(feed)">\n              {{ feed.nome }}\n            </button>  \n            <ion-item-options>\n              <button ion-button icon-right (click)="editItem(feed)"><ion-icon name="create"></ion-icon> Editar</button>\n              <button ion-button color="danger" (click)="removeItem(feed)"><ion-icon name="trash"></ion-icon> Excluir</button>\n            </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/celsocruz/Desktop/Trabalhos/TesteIonic/feeds/Angular/Feeds/src/pages/home/home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__services_feeds_service__["a" /* FeedsService */],
                __WEBPACK_IMPORTED_MODULE_4__services_feedreader_service__["a" /* FeedReaderService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_feeds_service__["a" /* FeedsService */],
            __WEBPACK_IMPORTED_MODULE_4__services_feedreader_service__["a" /* FeedReaderService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Feed; });
var Feed = /** @class */ (function () {
    function Feed() {
    }
    return Feed;
}());

//# sourceMappingURL=feeds.model.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(220);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/posts/posts.module#PostsPageModule', name: 'PostsPage', segment: 'posts', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/viewpost/viewpost.module#BlankPageModule', name: 'ViewPostPage', segment: 'viewpost', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/celsocruz/Desktop/Trabalhos/TesteIonic/feeds/Angular/Feeds/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/celsocruz/Desktop/Trabalhos/TesteIonic/feeds/Angular/Feeds/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FeedsService = /** @class */ (function () {
    // Para uso com o heroku
    //    private apiServerName = 'https://myfeeds-exam.herokuapp.com/api/';
    function FeedsService(http) {
        this.http = http;
        //Para uso local 
        this.apiServerName = 'http://localhost:3000/api/';
    }
    FeedsService.prototype.getFeeds = function () {
        return this.http.get(this.apiServerName)
            .toPromise()
            .then(function (resposta) {
            return resposta.json();
        });
    };
    FeedsService.prototype.addFeed = function (feed) {
        return this.http.post(this.apiServerName, feed)
            .toPromise()
            .then(function (resposta) {
            return resposta.json();
        });
    };
    FeedsService.prototype.updateFeed = function (feed) {
        return this.http.put(this.apiServerName + feed._id, feed)
            .toPromise()
            .then(function (resposta) {
            return resposta.json();
        });
    };
    FeedsService.prototype.deleteFeed = function (feed) {
        return this.http.delete(this.apiServerName + feed._id, {})
            .toPromise()
            .then(function (resposta) {
            return resposta.json();
        });
    };
    FeedsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]) === "function" && _a || Object])
    ], FeedsService);
    return FeedsService;
    var _a;
}());

//# sourceMappingURL=feeds.service.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedReaderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_posts_model__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_feeds_model__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FeedReaderService = /** @class */ (function () {
    function FeedReaderService(http) {
        this.http = http;
    }
    FeedReaderService.prototype.readFeed = function (url) {
        return this.http.get('https://api.rss2json.com/v1/api.json?rss_url=' + url)
            .toPromise()
            .then(function (resposta) {
            var resp = resposta.json();
            var resultado = new __WEBPACK_IMPORTED_MODULE_4__models_feeds_model__["a" /* Feed */]();
            if (resp.status == 'ok') {
                resultado.nome = resp.feed.title;
                resultado.url = url;
                resultado.posts = new Array(resp.items.length);
                for (var i = 0; i < resp.items.length; i++) {
                    resultado.posts[i] = new __WEBPACK_IMPORTED_MODULE_3__models_posts_model__["a" /* Post */]();
                    resultado.posts[i].title = resp.items[i].title;
                    resultado.posts[i].text = resp.items[i].description;
                    resultado.posts[i].url = resp.items[i].link;
                    resultado.posts[i].read = false;
                }
            }
            return resultado;
        })
            .catch(function () {
            return null;
        });
    };
    FeedReaderService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
    ], FeedReaderService);
    return FeedReaderService;
}());

//# sourceMappingURL=feedreader.service.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Post; });
var Post = /** @class */ (function () {
    function Post() {
    }
    return Post;
}());

//# sourceMappingURL=posts.model.js.map

/***/ })

},[197]);
//# sourceMappingURL=main.js.map
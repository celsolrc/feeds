import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/toPromise'
import { Post } from '../models/posts.model'
import { Feed } from '../models/feeds.model'

@Injectable()
export class FeedReaderService {

    constructor(private http: Http) { }

    public readFeed(url: string): Promise<any> {
        return this.http.get('https://api.rss2json.com/v1/api.json?rss_url=' + url)
            .toPromise()
            .then((resposta) => {
                var resp = resposta.json()

                var resultado = new Feed()

                if (resp.status == 'ok') {
                    resultado.nome = resp.feed.title
                    resultado.url = url

                    resultado.posts = new Array<Post>(resp.items.length)

                    for (var i = 0; i < resp.items.length; i++) {
                        resultado.posts[i] = new Post();
                        resultado.posts[i].title = resp.items[i].title
                        resultado.posts[i].text = resp.items[i].description
                        resultado.posts[i].url = resp.items[i].link
                        resultado.posts[i].read = false
                    }
                }

                return resultado
            })
            .catch(() => {
                return null
            })
    }
}
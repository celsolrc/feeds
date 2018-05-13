import { Retorno } from '../models/retorno.model'
import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/toPromise'
import { Feed } from '../models/feeds.model';

@Injectable()
export class FeedsService {

    //Para uso local 
    private apiServerName = 'http://localhost:3000/api/';
    // Para uso com o heroku
//    private apiServerName = 'https://myfeeds-exam.herokuapp.com/api/';

    constructor(private http: Http) { }

    public getFeeds(): Promise<Retorno> {
        return this.http.get(this.apiServerName)
            .toPromise()
            .then((resposta) =>
                resposta.json())
    }

    public addFeed(feed:Feed): Promise<Retorno>{
        return this.http.post(this.apiServerName, feed)
            .toPromise()
            .then((resposta) =>
                resposta.json())
    }

    public updateFeed(feed:Feed): Promise<Retorno>{
        return this.http.put(this.apiServerName+feed._id, feed)
            .toPromise()
            .then((resposta) =>
                resposta.json())
    }

    public deleteFeed(feed:Feed): Promise<Retorno>{
        return this.http.delete(this.apiServerName+feed._id, {})
            .toPromise()
            .then((resposta) =>
                resposta.json())
    }

}
import {Injectable} from '@angular/core';
import {Hero} from '../models/hero';
import {Headers, Http, RequestOptions, RequestMethod, Request} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';
    private headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    private randomQuote;

    constructor(private http: Http, private sanitizer: DomSanitizer) {
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {

        // var formdata = new FormData();
        // formdata.append("name",name);
        // formdata.append("type_id",1);
        // formdata.append("type_name","生活");
        // var formdata2 = new FormData();
        // formdata2.append("test",[3,4,5,6]);
        // formdata.append("xx",formdata2);
        let options = new RequestOptions({
            // body: JSON.stringify({name: name, type_id: 1, type_name: '旅游'}),
            body: {name: name, type_id: 1, type_name: '旅游'},
            // body:formdata.seialize(),
            // body: "name="+name+"&type_id=1&type_name=" + encodeURI('旅游'),
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
            method: 'post'
        });
        return this.http
            .post('http://139.129.205.61/v1/tags',null,options)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get('http://139.129.205.61/v1/tags')
            .toPromise()
            .then(response => response.json() as Hero[])
            .catch(this.handleError);
    }


    logError(err) {
        console.error('There was an error: ' + err);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id))
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
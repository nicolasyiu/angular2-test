"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
require('rxjs/Rx');
var platform_browser_1 = require("@angular/platform-browser");
var HeroService = (function () {
    function HeroService(http, sanitizer) {
        this.http = http;
        this.sanitizer = sanitizer;
        this.heroesUrl = 'app/heroes';
        this.headers = new http_1.Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }
    HeroService.prototype.delete = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    HeroService.prototype.create = function (name) {
        // var formdata = new FormData();
        // formdata.append("name",name);
        // formdata.append("type_id",1);
        // formdata.append("type_name","生活");
        // var formdata2 = new FormData();
        // formdata2.append("test",[3,4,5,6]);
        // formdata.append("xx",formdata2);
        var options = new http_1.RequestOptions({
            // body: JSON.stringify({name: name, type_id: 1, type_name: '旅游'}),
            body: { name: name, type_id: 1, type_name: '旅游' },
            // body:formdata.seialize(),
            // body: "name="+name+"&type_id=1&type_name=" + encodeURI('旅游'),
            headers: new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
            method: 'post'
        });
        return this.http
            .post('http://139.129.205.61/v1/tags', null, options)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    HeroService.prototype.update = function (hero) {
        var url = this.heroesUrl + "/" + hero.id;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    HeroService.prototype.getHeroes = function () {
        return this.http.get('http://139.129.205.61/v1/tags')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HeroService.prototype.logError = function (err) {
        console.error('There was an error: ' + err);
    };
    HeroService.prototype.getHeroesSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 2000);
        }) // delay 2 seconds
            .then(function () { return _this.getHeroes(); });
    };
    HeroService.prototype.getHero = function (id) {
        return this.getHeroes().then(function (heroes) { return heroes.find(function (hero) { return hero.id === id; }); });
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, platform_browser_1.DomSanitizer])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map
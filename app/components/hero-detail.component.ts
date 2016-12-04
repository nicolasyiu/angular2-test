import{Component, Input, OnInit} from  '@angular/core';
import{ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

import{HeroService} from '../models/services/hero.service';
import {Hero} from '../models/hero';

@Component({
    selector: 'my-hero-detail',
    moduleId: module.id,
    templateUrl: '../views/hero-detail.component.html',
    styleUrls:['../assets/styles/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input()
    hero: Hero;

    constructor(private heroService: HeroService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => this.hero = hero);
    }


    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}
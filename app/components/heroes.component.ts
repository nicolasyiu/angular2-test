import {Component} from  '@angular/core';
import {Router} from '@angular/router';
import {OnInit} from '@angular/core';
import {Hero} from '../models/hero';
import {HeroService} from '../models/services/hero.service';

@Component({
    selector: 'my-heroes',
    moduleId: module.id,
    templateUrl: '../views/heroes.component.html',
    styleUrls: ['../assets/styles/heroes.component.css'],
    providers: [HeroService]

})

export class HeroesComponent implements OnInit {
    title = 'Tour of Heroes';
    selectedHero: Hero;
    heroes: Hero[];

    ngOnInit(): void {
        this.getHeroes();
    }

    constructor(private router: Router, private heroService: HeroService) {
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    getHeroes(): void {
        this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}

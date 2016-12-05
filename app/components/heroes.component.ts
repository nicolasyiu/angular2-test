import {Component} from  '@angular/core';
import {Router} from '@angular/router';
import {OnInit} from '@angular/core';
import {Hero} from '../models/hero';
import {HeroService} from '../services/hero.service';

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

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        if(confirm("确定要删除吗？")){
            console.log('start delete');
            this.heroService
                .delete(hero.id)
                .then(() => {
                    this.heroes = this.heroes.filter(h => h !== hero);
                    if (this.selectedHero === hero) { this.selectedHero = null; }
                    console.log('delete ok');
                });
        }
    }

    getHeroes(): void {
        this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}

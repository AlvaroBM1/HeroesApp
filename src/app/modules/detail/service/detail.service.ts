import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { heroes } from "src/mocks/heroes.mock";
import { Hero } from "../../interfaces/hero.interface";
import { FormGroup } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class DetailService {

  getHeroById(id: string): Observable<Hero> {
    const filteredHeroes: Hero[] = heroes.filter(hero =>
      hero.id.toLowerCase().trim() === id.toLowerCase().trim()
    );

    if (filteredHeroes.length > 0) {
      return of(filteredHeroes[0]);
    } else {
      throw new Error('Hero not found');
    }
  }

  updateHero(heroForm: FormGroup): Observable<Hero> {
    const heroData = heroForm.value;
    console.log(heroData);

    const index = heroes.findIndex(hero => hero.id === heroData.id);
    if (index !== -1) {
      heroes[index] = heroData;
      return of(heroData);
    } else {
      throw new Error('Hero not found');
    }
  }

  addHero(heroForm: FormGroup): Observable<Hero> {
    const hero: Hero = heroForm.value;
    hero.id = hero.alter_ego;
    heroes.push(hero);
    return of(hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    const index = heroes.findIndex(hero => hero.id === id);
    if (index !== -1) {
      heroes.splice(index, 1);
      return of(true); // Indicate successful deletion
    } else {
      return of(false); // Indicate that hero with given id was not found
    }
  }
}

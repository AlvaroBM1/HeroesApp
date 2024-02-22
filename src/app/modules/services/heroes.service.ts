import { Observable, of } from "rxjs";
import { Hero } from "../interfaces/hero.interface";
import { heroes } from "src/mocks/heroes.mock";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class HeroesService {

  getHeroes():Observable<Hero[]>{
    return of(heroes)
  }

  filterHeroesByName(name: string): Observable<Hero[]> {
    const filteredHeroes = heroes.filter(hero =>
      hero.superhero.toLowerCase().trim().includes(name.toLowerCase().trim())
    );
    return of(filteredHeroes);
  }
}



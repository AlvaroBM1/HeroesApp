import { Component } from '@angular/core';
import { debounceTime, delay, finalize, of, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {

  public heroes: Hero[] =  [];
  public showSpinner: boolean = false;

  constructor(private heroesService: HeroesService ){

  }
  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.showSpinner = true;
    this.heroesService.getHeroes()
      .pipe(
        switchMap(heroes => {
          return of(heroes).pipe(delay(1000));
        }),
        finalize(() => this.showSpinner = false)
      )
      .subscribe(heroes => this.heroes = heroes);
  }

  onFormChange(formName: string): void {
    this.heroesService
    .filterHeroesByName(formName)
    .subscribe(filteredHeroes => {
      this.heroes = filteredHeroes;
    });
  }
}

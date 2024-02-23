import { Component } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  public heroes: Hero[] = [];
  public showSpinner: boolean = false;

  constructor(private heroesService: HeroesService) {}
  ngOnInit(): void {
    this.getHeroes();
  }

  public onFormChange(formName: string): void {
    this.heroesService.filterHeroesByName(formName).subscribe({
      next: (filteredHeroes) => (this.heroes = filteredHeroes),
      error: (error) => {
        console.log(`El error es ${error}`);
      },
    });
  }

  private getHeroes(): void {
    this.showSpinner = true;
    this.heroesService
      .getHeroes()
      .pipe(
        delay(1000),
        finalize(() => (this.showSpinner = false))
      )
      .subscribe({
        next: (heroes) => (this.heroes = heroes),
        error: (error) => {
          console.log(`El error es ${error}`);
        },
      });
  }
}
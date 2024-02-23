import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { DetailService } from '../service/detail.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit {

  public hero?: Hero;
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl<string>('', { nonNullable: true }), //para decir que siempre es un string
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private detailService: DetailService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.loadHero(id);
      }
    });
  }


  loadHero(id: string): void {
    this.detailService.getHeroById(id).subscribe({
      next: (hero: Hero) => {
        this.hero = hero;
        this.heroForm.patchValue({
          id: hero.id,
          superhero: hero.superhero,
          publisher: hero.publisher,
          alter_ego: hero.alter_ego,
          first_appearance: hero.first_appearance,
          characters: hero.characters,
          alt_img: hero.alt_img,
        });
      },
      error: (error: any) => {
        console.error('Error al cargar el héroe:', error);
      }
    });
  }


  onSave(): void {
    this.heroForm.get('alt_img')?.clearValidators();
    this.heroForm.get('alt_img')?.updateValueAndValidity();
    if (this.heroForm.valid) {
      if (this.heroForm.value.id) {
        this.detailService.updateHero(this.heroForm)
          .subscribe(hero => {
            this.showSnackbar(`¡Hero actualizado!`);
            this.goHome();
          });
        return;
      }

      this.detailService.addHero(this.heroForm)
        .subscribe(hero => {
          this.router.navigate(['/detail', hero.id]);
          this.showSnackbar(`${hero.superhero} created!`);
          this.goHome();
        });
    } else {
      this.showSnackbar('Por favor, rellene todos los campos.');
    }
  }


  onDeleteHero() {

    if (!this.hero?.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.detailService.deleteHeroById(this.hero!.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(result => {
        this.router.navigate(['/heroes']);
      });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    })
  }

  goHome() {
    this.router.navigate(['/home'])
    }

}

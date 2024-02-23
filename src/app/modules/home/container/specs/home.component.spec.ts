import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { heroes } from 'src/mocks/heroes.mock';
import { HeroesService } from '../../../services/heroes.service';
import { HomeComponent } from '../home.component';

const heroesServiceMock = {
  getHeroes: jasmine.createSpy('getHeroes').and.returnValue(of(heroes)),
  filterHeroesByName: jasmine
    .createSpy('filterHeroesByName')
    .and.returnValue(of(heroes)),
};

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let heroesService: HeroesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [HomeComponent],
      providers: [
        {
          provide: HeroesService,
          useValue: heroesServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    heroesService = TestBed.inject(HeroesService);
    component = fixture.componentInstance;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should get heroes', () => {
    component.ngOnInit();
    expect(component.showSpinner).toBeTrue();
  });

  it('should get no heroes', () => {
    (heroesService.getHeroes as jasmine.Spy).and.returnValue(
      throwError(() => new Error('test'))
    );
    component.ngOnInit();
    expect(heroesService.getHeroes).toHaveBeenCalledWith();
  });

  it('should get one hero', () => {
    component.onFormChange('test');
    expect(component.heroes).toEqual([]);
  });

  it('should get no hero', () => {
    (heroesService.filterHeroesByName as jasmine.Spy).and.returnValue(
      throwError(() => new Error('test'))
    );
    component.onFormChange('test');
    expect(component.heroes).toEqual([]);
  });
});
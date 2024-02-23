import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";
import { MaterialModule } from "src/app/material/material.module";
import { heroes } from "src/mocks/heroes.mock";
import { HeroesService } from "../../services/heroes.service";
import { HomeComponent } from "./home.component";
import { Publisher } from "../../interfaces/hero.interface";


const heroesServiceMock = {
  getHeroes: jasmine.createSpy('getHeroes').and.returnValue(of(heroes)),
  filterHeroesByName: jasmine.createSpy('filterHeroesByName').and.callFake((name: string) => {
    return of(heroes.filter(hero => hero.superhero.toLowerCase().includes(name.toLowerCase())));
  })
};


describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [HomeComponent],
      providers: [
        {
          provide: HeroesService,
          useValue: heroesServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  })

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should get heroes', () => {
    component.ngOnInit();
    expect(component.heroes.length).toEqual(heroes.length)
  })

  it('should get one hero', () => {
    const batman = {
      "id": "dc-batman",
      "superhero": "Batman",
      "publisher": Publisher.DCComics,
      "alter_ego": "Bruce Wayne",
      "first_appearance": "Detective Comics #27",
      "characters": "Bruce Wayne"
    }
    heroesServiceMock.getHeroes.and.returnValue(of([batman]))
    component.onFormChange('batman');
    expect(component.heroes.length).toBe(1);
    expect(component.heroes[0]).toEqual(batman);
  })

})

import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HeroesService } from "../../services/heroes.service";
import { of } from "rxjs";
import { heroes } from "src/mocks/heroes.mock";
import { MaterialModule } from "src/app/material/material.module";
import { Hero } from "../../interfaces/hero.interface";


const heroesServiceMock = {
  getHeroes: jasmine.createSpy('getHeroes').and.returnValue(of(heroes)),
}

fdescribe( 'HomeComponent', ()=> {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(waitForAsync(()=> {
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

  beforeEach(()=> {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  })

  it('should be defined', ()=> {
    expect(component).toBeDefined();
  });

  it('should get heroes', ()=>{
    component.ngOnInit();
    expect(component.heroes).toEqual(heroes)
  })
})

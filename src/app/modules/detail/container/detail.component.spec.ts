import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HeroesService } from "../../services/heroes.service";
import { of } from "rxjs";
import { heroes } from "src/mocks/heroes.mock";
import { MaterialModule } from "src/app/material/material.module";
import { DetailComponent } from "./detail.component";

const heroesServiceMock = {
  getHeroes: jasmine.createSpy('getHeroes').and.returnValue(of(heroes)),
}

fdescribe( 'DetailComponent', ()=> {

  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>

  beforeEach(waitForAsync(()=> {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [DetailComponent],
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
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  })

  it('should be defined', ()=> {
    expect(component).toBeDefined();
  });

  it('should be defined', ()=> {
    component.ngOnInit()
    expect(component);
  });

})

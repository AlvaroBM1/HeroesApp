import { Component, Input, OnInit } from "@angular/core";
import { Hero } from "src/app/modules/interfaces/hero.interface";

@Component({
  selector:'heroes-card',
  templateUrl: 'shared-card.component.html'
})

export class SharedCardComponent implements OnInit {
  @Input() public hero!: Hero;

  ngOnInit(): void {
    if ( !this.hero ) throw Error ('Hero property is required');
  }
}

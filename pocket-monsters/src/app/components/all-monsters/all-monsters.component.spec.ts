import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMonstersComponent } from './all-monsters.component';

describe('AllMonstersComponent', () => {
  let component: AllMonstersComponent;
  let fixture: ComponentFixture<AllMonstersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMonstersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

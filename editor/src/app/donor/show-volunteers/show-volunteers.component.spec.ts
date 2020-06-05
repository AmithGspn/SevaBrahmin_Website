import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVolunteersComponent } from './show-volunteers.component';

describe('ShowVolunteersComponent', () => {
  let component: ShowVolunteersComponent;
  let fixture: ComponentFixture<ShowVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnApprovedUsersComponent } from './un-approved-users.component';

describe('UnApprovedUsersComponent', () => {
  let component: UnApprovedUsersComponent;
  let fixture: ComponentFixture<UnApprovedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnApprovedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnApprovedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

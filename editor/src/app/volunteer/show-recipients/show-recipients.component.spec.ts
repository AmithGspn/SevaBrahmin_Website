import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecipientsComponent } from './show-recipients.component';

describe('ShowRecipientsComponent', () => {
  let component: ShowRecipientsComponent;
  let fixture: ComponentFixture<ShowRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

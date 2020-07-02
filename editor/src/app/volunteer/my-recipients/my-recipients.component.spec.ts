import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipientsComponent } from './my-recipients.component';

describe('MyRecipientsComponent', () => {
  let component: MyRecipientsComponent;
  let fixture: ComponentFixture<MyRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

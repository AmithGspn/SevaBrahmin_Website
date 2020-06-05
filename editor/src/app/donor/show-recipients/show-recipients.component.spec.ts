import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorShowRecipientsComponent } from './show-recipients.component';

describe('ShowRecipientsComponent', () => {
  let component: DonorShowRecipientsComponent;
  let fixture: ComponentFixture<DonorShowRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorShowRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorShowRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

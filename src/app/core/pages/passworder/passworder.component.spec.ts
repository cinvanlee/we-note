import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassworderComponent } from './passworder.component';

describe('PassworderComponent', () => {
  let component: PassworderComponent;
  let fixture: ComponentFixture<PassworderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassworderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassworderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

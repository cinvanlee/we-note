import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeServiceDataComponent } from './subscribe-service-data.component';

describe('SubscribeServiceDataComponent', () => {
  let component: SubscribeServiceDataComponent;
  let fixture: ComponentFixture<SubscribeServiceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeServiceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeServiceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

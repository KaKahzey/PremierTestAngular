import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo11Component } from './demo11.component';

describe('Demo11Component', () => {
  let component: Demo11Component;
  let fixture: ComponentFixture<Demo11Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Demo11Component]
    });
    fixture = TestBed.createComponent(Demo11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

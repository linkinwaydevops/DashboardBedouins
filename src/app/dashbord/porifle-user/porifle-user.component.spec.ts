import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorifleUserComponent } from './porifle-user.component';

describe('PorifleUserComponent', () => {
  let component: PorifleUserComponent;
  let fixture: ComponentFixture<PorifleUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorifleUserComponent]
    });
    fixture = TestBed.createComponent(PorifleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

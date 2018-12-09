import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMainDialogComponent } from './edit-main-dialog.component';

describe('EditMainDialogComponent', () => {
  let component: EditMainDialogComponent;
  let fixture: ComponentFixture<EditMainDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

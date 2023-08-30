/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OccurenceMapComponent } from './occurence-map.component';

describe('OccurenceMapComponent', () => {
  let component: OccurenceMapComponent;
  let fixture: ComponentFixture<OccurenceMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccurenceMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurenceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

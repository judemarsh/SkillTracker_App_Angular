import { TestBed, inject } from '@angular/core/testing';

import { AssociateService } from './associate.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppSettings } from '../app-settings';

describe('AssociateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AssociateService,AppSettings],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([AssociateService], (service: AssociateService) => {
    expect(service).toBeTruthy();
  }));
});

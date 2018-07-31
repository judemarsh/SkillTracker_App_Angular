import { TestBed, inject } from '@angular/core/testing';

import { SkillService } from './skill.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('SkillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SkillService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([SkillService], (service: SkillService) => {
    expect(service).toBeTruthy();
  }));
});

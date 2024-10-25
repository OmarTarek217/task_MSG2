import { TestBed } from '@angular/core/testing';

import { TeacherFeaturesService } from './teacher-features.service';

describe('TeacherFeaturesService', () => {
  let service: TeacherFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AuthAuthGuardService } from './auth-auth-guard.service';

describe('AuthAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthAuthGuardService = TestBed.get(AuthAuthGuardService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RefreshTokenInterceptorInterceptor } from './refresh-token-interceptor.interceptor';

describe('RefreshTokenInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RefreshTokenInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RefreshTokenInterceptorInterceptor = TestBed.inject(RefreshTokenInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

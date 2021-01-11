import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable } from 'rxjs';
import { User } from '../model/user'

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    const mockOktaAuthService = {
      getAccessToken(): string {
        return '';
      }
    };
    const mockHttpClient = {};
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: OktaAuthService, useValue: mockOktaAuthService}
      ]
    }).compileComponents();
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    service = new ProfileService(TestBed.inject(HttpClient), TestBed.inject(OktaAuthService));
    expect(service).toBeTruthy();
    expect(service.baseUrl).toBe('http://localhost:4200/api/profiles/');
    expect(service.headers.headers.Accept).toBe('application/json');
    expect(service.headers.headers.Authorization).toBe('Bearer ');
  });
});

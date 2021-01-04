import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsService } from '../notifications.service';
import { Type } from '@angular/core';
import { Notification } from '../model/notification';

import { NotificationsViewComponent } from './notifications-view.component';

describe('NotificationsViewComponent', () => {
  let component: NotificationsViewComponent;
  let fixture: ComponentFixture<NotificationsViewComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ NotificationsViewComponent ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsViewComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a list of notifications', (done) => {
    const testNotifications: Notification[] = [
      { userId: 1, postId: 1, type: 'Like' },
      { userId: 2, postId: 1, type: 'Comment' },
      { userId: 3, postId: undefined, type: 'Follow' },
      { userId: 4, postId: 2, type: 'Post' }
    ];

    component.getNotifications();
    const req = httpMock.expectOne('https://localhost:4200/notifications');
    req.flush(testNotifications);

    expect(req.request.method).toBe('GET');
    expect(component.notifications).toBe(testNotifications);

  });

  it('should dismiss notifications when viewed', (done) => {

  });

  it('should contain a link to the post or user in the notification', (done) => {

  });

});

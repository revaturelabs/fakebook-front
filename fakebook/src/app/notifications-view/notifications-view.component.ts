import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Notification } from '../model/notification';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.css'],
})
export class NotificationsViewComponent implements OnInit {

  // initialize for testing purposes only
  notifications: Notification[] = [
    { userId: 1, type: 'Like', date: new Date() },
    { userId: 2, type: 'Comment', date: new Date() },
    { userId: 3, type: 'Follow', date: new Date() },
    { userId: 4, type: 'Post', date: new Date() },
  ];
  notificationsView = false;
  unreadNotifications = true;

  constructor(
    private notifService: NotificationsService,
    ) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    const newNotifs = this.notifService.notifications$;
    if (newNotifs.length > 0) {
      this.unreadNotifications = true;
      this.notifications.concat(newNotifs);
    }
  }

  toggleNotifications(): void {
    this.notificationsView = !this.notificationsView;
    if (this.notificationsView === true){
      this.unreadNotifications = false;
    }
  }
}

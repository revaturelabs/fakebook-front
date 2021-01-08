import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentViewComponent } from './comment-view.component';
import { PostService } from 'src/app/service/post.service';

describe('CommentViewComponent', () => {
  let component: CommentViewComponent;
  let fixture: ComponentFixture<CommentViewComponent>;

  const FakePostService = { };

  const fakeUser = {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'first.last@email.com',
    phoneNumber: '5551234567',
    profilePictureUrl: 'https://image.png',
    status: 'My Fake User status',
    birthDate: new Date()
  };

  const fakeComment = {
    id: 1,
    content: 'my fake comment',
    postId: 1,
    createdAt: new Date(),
    user: fakeUser
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentViewComponent ],
      providers: [
        { provide:  PostService, useValue: FakePostService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentViewComponent);
    fixture.detectChanges();

    component = new CommentViewComponent(TestBed.inject(PostService));
    component.comment = fakeComment;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if comment and user exist', () => {
    const tf = component.commentAndUserExist(component.comment);

    expect(tf).toBeTrue();
  });

  it('should check if comment and user DO NOT exist', () => {
    const tf = component.commentAndUserExist(null);

    expect(tf).toBeFalse();
  });

  it('should set the profile picture', () => {
    component.setProfilePicture(component.comment);

    expect(component.user.profilePictureUrl).toBe('https://image.png');
  });

  it('should set the full name', () => {
    component.setFullName(component.comment);

    expect(component.user.fullname).toBe('first last');
  });
});

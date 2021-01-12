import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OktaAuthService, OktaCallbackComponent } from '@okta/okta-angular';

import { Post } from '../model/post';
import { NewPost } from '../model/newpost';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient, private oktaAuth: OktaAuthService) { }
  baseUrl = 'someUrl';
  url = `${this.baseUrl}/api/Posts`; // update with our base url

  headers = {
    Authorization: 'Bearer ' + this.oktaAuth.getAccessToken(),
    Accept: 'application/json',
  };

  create(post: newPost): Promise<newPost> {
    return this.http.post<newPost>(`${this.url}`, post).toPromise();
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
    }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}`);
    }

  delete(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${postId}`);
  }
}

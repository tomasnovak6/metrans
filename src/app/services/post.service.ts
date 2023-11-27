import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {PostFormInterface, PostInterface} from "./post.interface";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Metoda pro zobrazeni seznamu.
   */
  getPosts(): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(`${this.postsUrl}`);
  }

  /**
   * Metoda pro zobrazeni 1 entity ze seznamu.
   * @param id
   */
  getPost(id: number): Observable<PostInterface> {
    return this.http.get<PostInterface>(`${this.postsUrl}/${id}`);
  }

  /**
   * Metoda pro pridani noveho zaznamu.
   * @param formObj
   */
  addPost(formObj: PostFormInterface): Observable<PostInterface> {
    return this.http.post<PostInterface>(`${this.postsUrl}`, formObj);
  }

  /**
   * Metoda pro editaci zaznamu.
   * @param id
   * @param formObj
   */
  updatePost(id: number, formObj: any): Observable<PostInterface> {
    return this.http.put<PostInterface>(`${this.postsUrl}/${id}`, formObj);
  }

  /**
   * Metoda pro smazani zaznamu.
   * @param id
   */
  removePost(id: number): Observable<PostInterface> {
    return this.http.delete<PostInterface>(`${this.postsUrl}/${id}`);
  }

}

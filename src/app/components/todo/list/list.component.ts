import {Component, OnDestroy, OnInit} from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { PostService } from 'src/app/services/post.service';
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subscription} from "rxjs";
import {PostInterface, ToastMessageInterface} from "../../../services/post.interface";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListComponent implements OnInit {

  public data: Observable<PostInterface[]>;
  public id: number = 0;

  public showDialog: boolean = false;
  public operation: 'insert' | 'update' = 'insert';

  constructor(
    private postService: PostService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.getData();
  }

  /**
   * Vypis seznamu.
   * @private
   */
  private getData(): void {
    this.data = this.postService.getPosts();
  }

  /**
   * Otevreni dialogu pro pridanu noveho zaznamu.
   */
  public addPost(): void {
    this.operation = 'insert';
    this.showDialog = true;
  }

  /**
   * Odstraneni zaznamu.
   * @param id
   */
  public removePost(id: number): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('deleteConfirmation.message'),
      header: this.translateService.instant('deleteConfirmation.headline'),
      icon: 'pi pi-info-circle',
      accept: (): void => {
        this.postService.removePost(id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: this.translateService.instant('deleteConfirmation.success')});
        }, error => {
          this.messageService.add({ severity: 'error', summary: this.translateService.instant('error')});
          console.log(error);
        });
      },
    });
  }

  /**
   * Zobrazit toast hlasku.
   * @param message
   */
  public onToastMessage(message: ToastMessageInterface): void {
    this.messageService.add(message);
  }

  /**
   * Zavre dialog s formularem.
   */
  public onCloseDialog(): void {
    this.id = 0;
    this.showDialog = false;
  }

  /**
   * Otevre dialog pro update.
   * @param id
   */
  public updatePost(id: number): void {
    this.operation = 'update';
    this.id = id;
    this.showDialog = true;
  }

}

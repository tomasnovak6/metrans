import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../services/post.service";
import {Subscription} from "rxjs";
import {PostFormInterface, ToastMessageInterface} from "../../../services/post.interface";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss'],
})
export class DetailFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() showDialog: boolean = false;
  @Input() operation: 'insert' | 'update' = 'insert';
  @Input() id: number = 0;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() toastMessage: EventEmitter<ToastMessageInterface> = new EventEmitter<ToastMessageInterface>();

  public headline: string = '';

  public userIds: any[] | undefined;
  private getPost: Subscription | undefined;

  // inicializace formulare
  postForm: FormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
  });

  constructor(
    private postService: PostService,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.userIds = [
      { name: 'admin', code: 1 },
      { name: 'tester', code: 2 },
      { name: 'neznámý uživatel', code: 3 }
    ];
  }

  ngOnDestroy(): void {
    this.getPost?.unsubscribe();
  }

  /**
   * Nastaveni vybranych dat ve formulare podle typu operace.
   */
  ngOnChanges(): void {
    this.setHeadline();

    if (this.operation === 'update' && this.id > 0) {
      this.getPost = this.postService.getPost(this.id).subscribe(result => {
        this.postForm.get('userId')?.setValue(result.userId);
        this.postForm.get('title')?.setValue(result.title);
      }, error => {
        console.log(error);
      });
    } else {
      this.postForm.get('userId')?.setValue(null);
      this.postForm.get('title')?.setValue('');
    }

  }

  /**
   * Nastaveni nadpisu podle typu operace.
   * @private
   */
  private setHeadline(): void {
    if (this.operation === 'insert') {
      this.headline = 'addPost';
    } else if (this.operation === 'update') {
      this.headline = 'updatePost';
    }
  }

  public onClose(): void {
    this.close.emit();
  }

  /**
   * Submit formulare. Rozlisuje mezi operaci Insert a Update.
   */
  public submitForm(): void {
    const formObj: PostFormInterface = {
      userId: this.postForm.value.userId,
      title: this.postForm.value.title
    };

    if (this.operation === 'insert') {
      this.postService.addPost(formObj).subscribe(() => {
        this.toastMessage.emit({ severity: 'success', summary: this.translateService.instant('insertConfirmation.success')});
        this.onClose();
      }, error => {
        this.toastMessage.emit({ severity: 'error', summary: this.translateService.instant('error')});
        console.log(error);
      });
    } else if (this.operation === 'update') {
      this.postService.updatePost(this.id, formObj).subscribe(() => {
        this.toastMessage.emit({ severity: 'success', summary: this.translateService.instant('updateConfirmation.success')});
        this.onClose();
      }, error => {
        this.toastMessage.emit({ severity: 'error', summary: this.translateService.instant('error')});
        console.log(error);
      })

    }

  }

}

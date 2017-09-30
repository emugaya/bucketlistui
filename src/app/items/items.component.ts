import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService} from '../services/auth.service';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BucketlistsService } from '../services/bucketlists.service';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  bucketlist_id: any;
  bucketlist_name: any;
  bucketlist_items: any;
  currentuser: any;
  show_welcome = true;
  delete_item_res: any;
  add_bucketlist_item = { name: 'Item Name', done: false };
  add_bucketlist_item_res: any;
  edit_item_detail: any = { name: 'new Item Name', done: false };
  edit_item_id: any;
  edit_item_res: any;
  message = '';
  constructor(
    private bucketlistsService: BucketlistsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentuser = this.authService.current_user;
    this.route.params
    .switchMap((params: Params) => this.bucketlistsService.getSingleBucket(+params['id']))
    .subscribe((res: Response) => {
      const returned_data = res.json();
      this.bucketlist_id = returned_data.id;
      this.bucketlist_name = returned_data.name;
      this.bucketlist_items = returned_data.items;
    }, (error) => {
      const error_message: any = JSON.parse(error._body);
      this.message = error_message.message;
      if (error.status === 401 ) {
        this.authService.checkTimeOut();
        }
    });
  }
  // Method to retrieve items in a bucketlist
  getBucketListItems(id) {
    // this.bucketlist_id = id;
    this.bucketlistsService
      .getSingleBucket(this.bucketlist_id)
      .subscribe((res: Response) => {
        const returned_data = res.json();
        this.bucketlist_items = returned_data.items;
      }, (error) => {
        const error_message: any = JSON.parse(error._body);
        this.message = error_message.message;
        if (error.status === 401 ) {
          this.authService.checkTimeOut();
          }
      });
  }

  // Method to create items in a particular bucketlist
  addBucketListItem(f: NgForm) {
    this.add_bucketlist_item.name = f.value.name;
    this.bucketlistsService
      .postBucketItem(this.bucketlist_id, this.add_bucketlist_item)
      .subscribe((res: Response) => {
        this.add_bucketlist_item_res = res.json();
        this.getBucketListItems(this.bucketlist_id);
      }, (error) => {
        if (error.status === 401 ) {
          this.authService.checkTimeOut();
          }
      });
  }

  // Method to Set Variables for editing an item in the bucket list
  setVariablesForEditBucketItem(id, name, done) {
    this.edit_item_id = id;
    this.edit_item_detail.name = name;
    this.edit_item_detail.done = done;
  }
  // Method to Edit buckelist item
  editBucketlistItem(editform: NgForm) {
    const verify: boolean = confirm(`Are you sure you want to edit this item?`);
    if (verify === true) {
      // this.bucketlist_id = localStorage.getItem('bucketlist_id');
      this.edit_item_detail.name = editform.value.name;
      this.edit_item_detail.done = editform.value.done;
      this.bucketlistsService
        .editItem(this.bucketlist_id, this.edit_item_id, this.edit_item_detail)
        .subscribe((res: Response) => {
          this.edit_item_res = res.json();
          this.getBucketListItems(this.bucketlist_id);
        }, (error) => {
          if (error.status === 401 ) {
            this.authService.checkTimeOut();
            }
        });
    }
  }

  deleteBucketItem(item_id) {
    const verify: boolean = confirm(`Are you sure you want to delete this item?`);
    if (verify === true) {
      // this.bucketlist_id = localStorage.getItem('bucketlist_id');
      this.bucketlistsService
        .deleteBucketItem(this.bucketlist_id, item_id)
        .subscribe((res: Response) => {
          this.delete_item_res = res.json();
          this.getBucketListItems(this.bucketlist_id);
        }, (error) => {
          if (error.status === 401 ) {
            this.authService.checkTimeOut();
            }
        });
    }
  }
  backToBuckets(): void{
    this.router.navigate(['/bucketlists']);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService} from '../services/auth.service';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { BucketlistsService } from '../services/bucketlists.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-bucketlists',
  templateUrl: './bucketlists.component.html',
  styleUrls: ['./bucketlists.component.css']
})
export class BucketlistsComponent implements OnInit {

    placeholder = 'E.g Travel';
    bucket_res: any;
    currentuser: string;
    buckets: any;
    total_buckets: 0;
    current_page = 1;
    page = 1;
    pages = [];
    per_page: number;
    total = 0;
    search = '';
    start_page = 1;
    end_page = 0;
    total_pages = 0;
    message  = '';
    number_of_items: number;

    add_bucket_res: any;
    bucket = {'name': 'Bucket Name'};
    edit_bucket_name: any;
    bucket_id_to_edit: any;
    constructor(private authService: AuthService,
                private router: Router,
                private bucketlistsService: BucketlistsService) {
    }

    ngOnInit() {
      this.currentuser = this.authService.current_user;
      this.getBucketlists(this.page, this.per_page, this.search);
    }

    getBucketlists(page?, per_page?, search?) {
      this.bucketlistsService.getBuckets(this.page, this.per_page, this.search).subscribe((res: Response) => {
        this.bucket_res = res.json();
        this.buckets = this.bucket_res.items;
        this.total_pages = this.bucket_res.pages;
        this.total_buckets = this.bucket_res.total;
        this.end_page = this.bucket_res.pages;
        this.total = this.bucket_res.total;
        this.pages = _.range(1, this.bucket_res.pages + 1);
        this.number_of_items = this.bucket_res.items.length;
      }, (error) => {
        if (error.status === 401 ) {
          this.authService.checkTimeOut();
          }
      });
    }

    searchBucketLists(sform: NgForm): void {
      const search = sform.value.name;
      this.search = sform.value.name;
      this.getBucketlists(this.page, this.per_page, this.search);
    }

    addBucket(f: NgForm): void {
      this.bucket.name = f.value.name;
      this.bucketlistsService.postBucket(this.bucket).subscribe((res: Response) => {
          this.add_bucket_res = res.json();
          this.getBucketlists();
      }, (error) => {
        if (error.status === 401 ) {
          this.authService.checkTimeOut();
          }
      });
    }

    deleteBucket(id) {
      const verify: boolean = confirm(`Are you sure you want to delete this bucket?`);
      if (verify === true) {
        this.bucketlistsService.deleteBucket(id).subscribe((res: Response) => {
          this.getBucketlists();
     }, (error) => {
      if (error.status === 401 ) {
        this.authService.checkTimeOut();
        }
    });
      }
    }
    setBucketNameEditVariables(id, name) {
      this.edit_bucket_name = name;
      this.bucket_id_to_edit = id;
      console.log( this.bucket_id_to_edit);
      console.log(this.edit_bucket_name);
    }

    editBucketName(editform: NgForm): void {
      const verify: boolean = confirm(`Are you sure you want to edit this bucket?`);
      if (verify === true) {
        this.edit_bucket_name = editform.value.name;
        const name = { 'name': this.edit_bucket_name};
        this.bucketlistsService.editBucket(this.bucket_id_to_edit, name).subscribe((res: Response) => {
          this.getBucketlists();
        }, (error) => {
          if (error.status === 401 ) {
            this.authService.checkTimeOut();
            }
        });
      }
    }
    // Pagination
    setPage(page: number) {
      this.page = page;
      this.current_page = page;
      this.getBucketlists(this.page, this.per_page, this.search);
    }
  }

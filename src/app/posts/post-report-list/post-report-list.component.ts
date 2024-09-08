import { Component, inject } from '@angular/core';
import { DeviceService } from '../../app-reusables/services/device.service';
import { PostService } from '../post.service';
import { map } from 'rxjs';
import { DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { Router } from '@angular/router';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AsyncPipe } from '@angular/common';
import { postReportListColumns, postStatsConst } from '../../post-stats/post-stats.const';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { PostReportListViewModel, PostStatsFilterModel } from '../../post-stats/post-stats';

@Component({
  selector: 'app-post-report-list',
  standalone: true,
  imports: [DataTableComponent, MatGridListModule, AsyncPipe],
  templateUrl: './post-report-list.component.html',
  styleUrl: './post-report-list.component.scss',
  providers: [LocaleDatePipe]
})
export class PostReportListComponent extends Unsubscriber {
  private postService = inject(PostService);
  private deviceService = inject(DeviceService);
  private router = inject(Router);
  isLoading$ = this.postService.loadingReportList$;
  filters = postStatsConst.filters;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return postReportListColumns.filter(x => !x.HideHandset)
        }
        return postReportListColumns
    })
  );
  data: any[] = [];
  dataSize!: number;
  lastFilter!: DataTableOutput;
  tableChange(filter: DataTableOutput) {
    this.lastFilter = filter;
    this._otherSubscription = this.postService.getReportsByFilter(filter as PostStatsFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.postService.exportReportsByFilter(filter as PostStatsFilterModel).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `Post-Reports-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
  goToPost(post: PostReportListViewModel) {
    this.router.navigateByUrl(`/posts/${post.postId}`);
  }
  goToPostNew(post: PostReportListViewModel) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/posts/${post.postId}`])
    );
  
    window.open(url, '_blank');
  }
}

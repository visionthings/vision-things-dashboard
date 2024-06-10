import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { DashboardService } from '../../../../services/dashboard.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { EmptyStateComponent } from '../../../../shared/empty-state/empty-state.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    HeadingComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    LoadingComponent,
    CommonModule,
    PaginationComponent,
    FontAwesomeModule,
    EmptyStateComponent,
    NgOptimizedImage,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}
  icons = {
    edit: faPenToSquare,
    delete: faTrashCan,
  };
  isLoading = true;
  items: any = [];
  res: any = [];
  currentPage: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  setPage(page: any) {
    if (page) {
      this.currentPage = page;
      this.dashboardService.getPage(page).subscribe({
        next: (res: any) => {
          this.res = res;
          this.items = res.data;
        },
        error: () => {},
      });
    }
  }

  edit(id: string) {
    this.router.navigateByUrl(`/dashboard/edit-content/${id}`);
  }

  delete(id: string) {
    this.dashboardService.deleteContent(id).subscribe({
      next: (res) => {
        this.successMessage = 'تم الحذف بنجاح.';
        this.setPage(this.currentPage);
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (error) => {
        this.errorMessage =
          'تعذر الحذف في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }

  ngOnInit(): void {
    this.dashboardService.getContent().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.res = res;
        this.items = res.data;
        this.currentPage = `${res.path}?page=1`;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}

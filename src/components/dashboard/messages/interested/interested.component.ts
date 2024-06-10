import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { DashboardService } from '../../../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { EmptyStateComponent } from '../../../../shared/empty-state/empty-state.component';

@Component({
  selector: 'app-interested',
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
  ],
  templateUrl: './interested.component.html',
  styleUrl: './interested.component.scss',
})
export class InterestedComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  icons = {
    read: faGlasses,
    delete: faTrashCan,
  };
  isLoading = true;
  messages: any = [];
  res: any = [];
  currentMessage: string | null = null;
  currentPage: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  setPage(page: any) {
    if (page) {
      this.currentPage = page;
      this.dashboardService.getPage(page).subscribe({
        next: (res: any) => {
          this.res = res;
          this.messages = res.data;
        },
        error: () => {},
      });
    }
  }

  read(message: string) {
    this.currentMessage = message;
  }

  delete(id: string) {
    this.dashboardService.deleteInterested(id).subscribe({
      next: (res) => {
        this.successMessage = 'تم حذف الرسالة بنجاح.';
        this.setPage(this.currentPage);
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (error) => {
        this.errorMessage =
          'تعذر حذف الرسالة في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }

  ngOnInit(): void {
    this.dashboardService.getInterested().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.res = res;
        this.messages = res.data;
        this.currentPage = `${res.path}?page=1`;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}

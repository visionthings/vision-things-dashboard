import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '../../../../services/dashboard.service';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { HeadingComponent } from '../../../../shared/heading/heading.component';

@Component({
  selector: 'app-create-new-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SuccessMessageComponent,
    ErrorMessageComponent,
    HeadingComponent,
  ],
  templateUrl: './create-new-page.component.html',
  styleUrl: './create-new-page.component.scss',
})
export class CreateNewPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  categoris: any[] = [];

  form = this.fb.group({
    category_id: ['', Validators.required],
    title_ar: ['', Validators.required],
    title_en: ['', Validators.required],
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  submit() {
    this.form.markAllAsTouched();
    this.dashboardService.addPage(this.form.value).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (err) => {
        this.errorMessage =
          'تعذر الاتصال بقاعدة البيانات في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }

  ngOnInit(): void {
    this.dashboardService.getCategories().subscribe({
      next: (res: any) => {
        this.categoris = res.data;
      },
    });
  }
}

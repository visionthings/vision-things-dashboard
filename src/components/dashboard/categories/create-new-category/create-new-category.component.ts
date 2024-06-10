import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '../../../../services/dashboard.service';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { HeadingComponent } from '../../../../shared/heading/heading.component';

@Component({
  selector: 'app-create-new-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SuccessMessageComponent,
    ErrorMessageComponent,
    HeadingComponent,
  ],
  templateUrl: './create-new-category.component.html',
  styleUrl: './create-new-category.component.scss',
})
export class CreateNewCategoryComponent {
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  form = this.fb.group({
    title_ar: ['', Validators.required],
    title_en: ['', Validators.required],
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  submit() {
    this.form.markAllAsTouched();
    this.dashboardService.addCategory(this.form.value).subscribe({
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
}

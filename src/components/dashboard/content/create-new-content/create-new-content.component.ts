import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '../../../../services/dashboard.service';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { HeadingComponent } from '../../../../shared/heading/heading.component';

@Component({
  selector: 'app-create-new-content',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SuccessMessageComponent,
    ErrorMessageComponent,
    HeadingComponent,
  ],
  templateUrl: './create-new-content.component.html',
  styleUrl: './create-new-content.component.scss',
})
export class CreateNewContentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  pages: any[] = [];

  form = this.fb.group({
    page_id: ['', Validators.required],
    content_ar: ['', Validators.required],
    content_en: ['', Validators.required],
    is_header: [''],
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  image: any = null;
  uploadImage(event: any) {
    this.image = event.target.files[0];
  }
  submit() {
    this.form.markAllAsTouched();
    let formData = new FormData();
    if (this.form.controls.is_header.value) {
      this.form.get('is_header')?.patchValue('1');
    } else {
      this.form.get('is_header')?.patchValue('0');
    }
    let x: any = this.form.value;
    Object.keys(x).forEach((key) => {
      formData.append(key, x[key]);
    });
    formData.append('image', this.image);

    this.dashboardService.addContent(formData).subscribe({
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
    this.dashboardService.getPages().subscribe({
      next: (res: any) => {
        this.pages = res.data;
      },
    });
  }
}

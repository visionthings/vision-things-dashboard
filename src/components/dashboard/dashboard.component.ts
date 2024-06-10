import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faEnvelopeOpenText,
  faFileSignature,
  faHouseChimney,
  faFileVideo,
  faTags,
  faUsers,
  faList,
  faNewspaper,
  faPenNib,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent,
    FooterComponent,
    FontAwesomeModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  // Icons
  icons = {
    arrow: faChevronLeft,
    messages: faEnvelopeOpenText,
    categories: faList,
    pages: faNewspaper,
    content: faPenNib,
  };

  // Sidebar
  sidebarItems = [
    {
      id: 1,
      icon: this.icons.messages,
      title: 'الرسائل',
      categories: [
        { id: 1.1, title: 'إرسال رسالة جديدة', path: 'create-new-mail' },
        { id: 1.2, title: 'البريد الوارد', path: 'inbox' },
        { id: 1.3, title: 'البريد الصادر', path: 'outbox' },
        { id: 1.4, title: 'رسائل المهتمين', path: 'interested' },
      ],
    },
    {
      id: 2,
      icon: this.icons.categories,
      title: 'الأقسام',
      categories: [
        { id: 2.1, title: 'إضافة قسم جديد', path: 'create-new-category' },
        { id: 2.2, title: 'أقسام الموقع', path: 'categories' },
      ],
    },
    {
      id: 3,
      icon: this.icons.pages,
      title: 'الصفحات',
      categories: [
        { id: 3.1, title: 'إضافة صفحة جديدة', path: 'create-new-page' },
        { id: 3.2, title: 'صفحات الموقع', path: 'pages' },
      ],
    },
    {
      id: 4,
      icon: this.icons.content,
      title: 'المحتوى',
      categories: [
        { id: 4.1, title: 'إضافة محتوى جديد', path: 'create-new-content' },
        { id: 4.2, title: 'المحتوى', path: 'content' },
      ],
    },
  ];

  activeItem = 0;
  updateActiveItem(id: number): void {
    this.activeItem === id ? (this.activeItem = 0) : (this.activeItem = id);
  }

  // On Init
  ngOnInit(): void {
    const url = this.router.url;
    for (let item of this.sidebarItems) {
      for (const cat of item.categories) {
        if (url == `/dashboard/${cat.path}`) {
          this.updateActiveItem(item.id);
        }
      }
    }
  }
}

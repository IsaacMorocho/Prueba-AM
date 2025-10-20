import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  expenses: Array<any & { photoDataUrl?: string | null }> = [];

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.expensesService.expenses$.subscribe(async list => {
      const mapped: any[] = [];
      for (const it of list) {
        const copy: any = { ...it };
        if (it.photoFile) {
          copy.photoDataUrl = await this.expensesService.getPhotoDataUrl(it.photoFile);
        } else {
          copy.photoDataUrl = null;
        }
        mapped.push(copy);
      }
      this.expenses = mapped;
    });
  }

}

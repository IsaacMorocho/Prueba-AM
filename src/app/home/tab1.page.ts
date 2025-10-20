import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ExpensesService } from '../services/expenses.service';
import { Platform } from '@ionic/angular';

interface Expense {
  title: string;
  date: string;
  amount: number;
  paidBy?: string;
  photoFile?: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  recentExpenses: Expense[] = [
    { title: 'Café', date: '2025-10-20', amount: 3.50},
  ];

  addModalOpen = false;
  newExpense: Partial<Expense> & { amount?: number } = { title: '', amount: undefined, paidBy: '' };

  private lastPhotoBase64: string | null = null;

  constructor(private platform: Platform, private expensesService: ExpensesService) {}

  ngOnInit(): void {
  }

  openDetail(expense: Expense) {
    console.log('Abrir detalle de gasto:', expense);
  }

  openAddModal() {
    this.addModalOpen = true;
  }

  closeAddModal() {
    this.addModalOpen = false;
    this.clearNewExpense();
  }

  clearNewExpense() {
    this.newExpense = { title: '', amount: undefined, paidBy: '' };
    this.lastPhotoBase64 = null;
  }

  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      if (photo && photo.base64String) {
        this.lastPhotoBase64 = photo.base64String;
        console.log('Foto tomada');
      }
    } catch (err) {
      console.error('Error al tomar la foto', err);
    }
  }


  async saveExpense() {
    if (!this.newExpense.title || !this.newExpense.amount) {
      alert('Complete la descripción y el monto');
      return;
    }

    const expense: Expense = {
      title: this.newExpense.title!,
      date: new Date().toISOString().split('T')[0],
      amount: Number(this.newExpense.amount),
      paidBy: this.newExpense.paidBy,
  photoFile: undefined
    };
    await this.expensesService.addExpense(expense, this.lastPhotoBase64 || undefined);
    this.recentExpenses.unshift(expense);
    this.closeAddModal();
  }

}

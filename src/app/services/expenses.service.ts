import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filesystem, Directory } from '@capacitor/filesystem';

export interface ExpenseItem {
  title: string;
  date: string;
  amount: number;
  paidBy?: string;
  note?: string;
  photoFile?: string;
}

@Injectable({ providedIn: 'root' })
export class ExpensesService {

  private expenses: ExpenseItem[] = [];
  private expensesSubject = new BehaviorSubject<ExpenseItem[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  constructor() {
  }

  async ensureFolder() {
    try {
      await Filesystem.mkdir({ path: 'recibos', directory: Directory.Data, recursive: true });
    } catch (e) {
    }
  }

  async addExpense(expense: ExpenseItem, photoBase64?: string) {
    await this.ensureFolder();
    if (photoBase64) {
      const filename = `recibo_${new Date().getTime()}.jpeg`;
      try {
        await Filesystem.writeFile({
          path: `recibos/${filename}`,
          data: photoBase64,
          directory: Directory.Data,
        });
        expense.photoFile = filename;
      } catch (e) {
        console.error('Error guardando foto', e);
      }
    }

    this.expenses.unshift(expense);
    this.expensesSubject.next(this.expenses.slice());
  }

  async getPhotoDataUrl(photoFile?: string) {
    if (!photoFile) return null;
    try {
      const img = await Filesystem.readFile({ path: `recibos/${photoFile}`, directory: Directory.Data });
      return `data:image/jpeg;base64,${img.data}`;
    } catch (e) {
      console.warn('No se pudo leer foto', photoFile, e);
      return null;
    }
  }

}

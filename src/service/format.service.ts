import { Injectable } from '@angular/core';
import { English } from 'src/utils/english.language';
import { Vietnamese } from 'src/utils/vietnamese.language';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }

  // ========================  FOR LANGUAGE  =========================
  setLanguage(targetLanguage: string = 'default'): void {
    if (targetLanguage == 'default') {
      // if language is not set, set it to browser language
      if (!localStorage.getItem('language')) {
        if (navigator.language.includes('en')) {
          localStorage.setItem('language', 'en');
        } else {
          localStorage.setItem('language', 'vi');
        }
      }
      else {
        // if language is set, return
        return;
      }
    }
    else {
      localStorage.setItem('language', targetLanguage);
    }
  }

  useLanguage(): any {
    if (!localStorage.getItem('language')) {
      this.setLanguage();
    }
    if (localStorage.getItem('language') == 'vi') {
      return Vietnamese;
    } else {
      return English;
    }
  }

  // ========================  FOR ALL OBJECTS  =========================
  // style button for active status
  styleButtonActiveStatus(status: boolean) {
    return status ? 'btn btn-success disabled rounded-5' : 'btn btn-danger disabled rounded-5';
  }

  // shorten the object id
  shortenObjectId(id: string) {
    return id.substring(0, 5) + '...' + id.substring(id.length - 5, id.length);
  }

  // ========================  FOR COUPON  =========================
  // coupon active status
  couponActiveStatus(status: boolean) {
    return status ? 'Hiệu lực' : 'Không hiệu lực';
  }

  // coupon type format
  couponTypeFormat(is_percentage: boolean, value: number) {
    if (is_percentage) {
      return `${value}%`;
    } else {
      return this.formatCurrency(value);
    }
  }

  // format currency
  formatCurrency(value: number) {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  //date format dd/mm/yyyy from ISOstring
  formatDate(date: string) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

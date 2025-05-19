// src/app/services/hajo.service.ts
import { Injectable } from '@angular/core';
import type { Hajo } from '../models/hajo.model';
import { HAJOK } from '../data/hajok.data';

@Injectable({ providedIn: 'root' })
export class HajoService {
  getAll(): Hajo[] {
    return HAJOK;
  }
  getById(id: string): Hajo | undefined {
    return HAJOK.find(h => h.id === id);
  }
}

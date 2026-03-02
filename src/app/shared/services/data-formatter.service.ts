import { Injectable } from '@angular/core';

type LabelSource = {
  id?: string | number;
  name?: string;
  title?: string;
  email?: string;
  publicUrl?: string;
  [key: string]: unknown;
};

@Injectable({
  providedIn: 'root',
})
export class DataFormatterService {
  public generateLabel(
    val: unknown,
    item: LabelSource,
    className: string,
  ): unknown {
    const elm = this.getFirstElementOfArray(val);
    if (elm) {
      return elm;
    }
    return `${className}-${item.id ?? ''}`;
  }

  public getFirstElementOfArray(val: unknown): unknown {
    if (Array.isArray(val)) {
      return this.getElementOfObject(val[0]);
    }
    return this.getElementOfObject(val);
  }

  public getElementOfObject(val: unknown): unknown {
    if (val !== null && typeof val === 'object') {
      const source = val as LabelSource;
      if (source.name) {
        return source.name;
      }
      if (source.title) {
        return source.title;
      }
      return source.email;
    }
    return val;
  }

  public filesFormatter(
    arr: LabelSource[] | null | undefined,
  ): Array<{ name: string; publicUrl: string }> {
    if (!arr || !arr.length) {
      return [];
    }
    return arr.map((item) => ({
      name: item.name || '',
      publicUrl: item.publicUrl || '',
    }));
  }

  public imageFormatter(
    arr: LabelSource[] | null | undefined,
  ): Array<{ publicUrl: string }> {
    if (!arr || !arr.length) {
      return [];
    }
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  }

  public oneImageFormatter(arr: LabelSource[] | null | undefined): string {
    if (!arr || !arr.length) {
      return '';
    }
    return arr[0].publicUrl || '';
  }

  public booleanFormatter(val: unknown): string {
    return Boolean(val) ? 'Yes' : 'No';
  }
}

import { ParsedUrlQuery } from 'querystring';

export class UnitBase {
  from?: string;

  to?: string;

  value?: number;

  constructor(
    private unitDefinitions: Record<string, number>,
    query?: ParsedUrlQuery
  ) {
    if (query) {
      this.loadFromQuery(query);
    }
  }

  public loadFromQuery(query: ParsedUrlQuery): void {
    const value = parseFloat(query.value as string);
    if (
      typeof query.from === 'string' &&
      typeof query.to === 'string' &&
      typeof value === 'number'
    ) {
      if (!this.validate(query.from)) {
        throw new Error(`Invalid unit name: ${query.from}`);
      }
      if (!this.validate(query.to)) {
        throw new Error(`Invalid unit name: ${query.to}`);
      }
      this.from = query.from;
      this.to = query.to;
      this.value = value;
    } else {
      throw new Error('Invalid units names or value');
    }
  }

  public convert(from: string, to: string, value: number): number {
    const v1 = this.unitDefinitions[to];
    const v2 = this.unitDefinitions[from];
    if (v1 && v2) {
      return (value * v1) / v2;
    }
    throw new Error(`Invalid unit: ${from} or ${to}`);
  }

  public showResult():
    | { fromValue: number; fromUnit: string; toValue: number; toUnit: string }
    | undefined {
    if (this.from && this.to && this.value) {
      return {
        fromValue: this.value,
        fromUnit: this.from,
        toValue: this.convert(this.from, this.to, this.value),
        toUnit: this.to,
      };
    }
    return undefined;
  }

  public validate(unit?: string): boolean {
    if (!unit) {
      return false;
    }

    if (!this.unitDefinitions[unit]) {
      return false;
    }

    return true;
  }
}

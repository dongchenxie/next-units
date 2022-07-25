import { ParsedUrlQuery } from 'querystring';

import { UnitBase } from './unitBase';

const unitDefinitions = {
  cm: 1,
  mm: 10,
  inch: 0.393701,
  in: 0.393701,
  foot: 0.0328084,
  m: 0.01,
  km: 0.00001,
  mile: 0.00000621371,
  yard: 0.0109361,
};
export class Length extends UnitBase {
  constructor(query?: ParsedUrlQuery) {
    super(unitDefinitions, query);
  }
}

import { and, rankWith, schemaMatches, uiTypeIs } from '@jsonforms/core';

export const removeableControlTester = rankWith(
  100,
  and(
    uiTypeIs('Control'),
    schemaMatches((schema) => {
      return schema.hasOwnProperty('renderer');
    })
  ));

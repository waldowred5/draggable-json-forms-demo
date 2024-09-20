import { rankWith, uiTypeIs } from '@jsonforms/core';

export const formLayoutTester = rankWith(1000, uiTypeIs('VerticalLayout'));

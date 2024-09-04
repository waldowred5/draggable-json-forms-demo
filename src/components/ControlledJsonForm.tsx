import { JsonForms } from '@jsonforms/react';
import { materialCells } from '@jsonforms/material-renderers';
import { useCallback } from 'react';
import { INIT, UPDATE_DATA } from '@jsonforms/core';

export const ControlledJsonForm = (
  {
    data,
    schema,
    uischema,
    errors,
    renderers,
    setData,
 }: any) => {
  const middleware = useCallback(
    (state, action, defaultReducer) => {
      const newState = defaultReducer(state, action);
      switch (action.type) {
        case INIT:
        case UPDATE_DATA: {
          setData(newState.data);
          // validateActivity(newState.data);
          return state;
        }
        default:
          return newState;
      }
    },[]
  );

  return (
    <JsonForms
      data={data}
      schema={schema}
      uischema={uischema}
      renderers={renderers}
      // middleware={middleware}
      additionalErrors={errors}
      validationMode='NoValidation'
      cells={materialCells}
      onChange={({ data }) => setData(data)}
    />
  );
};

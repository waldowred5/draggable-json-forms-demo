import { JsonForms } from '@jsonforms/react';
import { materialCells } from '@jsonforms/material-renderers';

export const ControlledJsonForm = (
  {
    data,
    schema,
    uischema,
    errors,
    renderers,
    setData,
 }: any) => {

  return (
    <JsonForms
      data={data}
      schema={schema}
      uischema={uischema}
      renderers={renderers}
      additionalErrors={errors}
      validationMode='NoValidation'
      cells={materialCells}
      onChange={({ data }) => setData(data)}
    />
  );
};

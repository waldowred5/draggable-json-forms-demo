import { withJsonFormsControlProps } from '@jsonforms/react';
import { Unwrapped } from '@jsonforms/material-renderers';
import { ControlProps } from '@jsonforms/core';
import { JSX, useContext } from 'react';
import { SchemaContext, SchemaUIContext } from '../context/Contexts';
import { findAndAddOrRemoveNestedObjectInSchema } from '../utils/findAndAddOrRemoveNestedObjectInSchema';

// interface RatingControlProps {
//   data: number;
//   handleChange(path: string, value: number): void;
//   path: string;
// }

const RENDERER = {
  'MaterialSliderControl': Unwrapped.MaterialSliderControl,
  'MaterialNumberControl': Unwrapped.MaterialNumberControl,
  'MaterialTextControl': Unwrapped.MaterialTextControl,
  'MaterialDateControl': Unwrapped.MaterialDateControl,
  'MaterialBooleanControl': Unwrapped.MaterialBooleanControl
};

const RemoveableControl = (props: ControlProps & { schema: { renderer?: string } }) => {
  const [formSchema, setFormSchema] = useContext(SchemaContext);
  const [formUiSchema, setFormUiSchema] = useContext(SchemaUIContext);

  console.log('props', props, 'Unwrapped', Unwrapped);

  const renderer = `${props?.schema?.renderer}`;
  const Component: JSX.Element = RENDERER[renderer] ?? Unwrapped.MaterialTextControl;

  const onClick = () => {
    const filteredSchemaProperties = Object.entries(formSchema.properties).reduce((acc, property) => {
      if (property[0] === props.path) {
        return acc;
      }

      return {
        ...acc,
        [property[0]]: property[1]
      };
    }, {});

    const filteredSchemaPropertiesRequiredList = formSchema.required.filter((requiredProperty) => {
      return requiredProperty !== props.path;
    });

    setFormSchema({
      ...formSchema,
      properties: filteredSchemaProperties,
      required: filteredSchemaPropertiesRequiredList
    });

    setFormUiSchema(findAndAddOrRemoveNestedObjectInSchema(formUiSchema, 'id', props.path, 'remove'));
  };

  return (
    <div className={'flex items-start gap-x-4'}>
      <Component {...props} />
      <button
        className={'bg-red-400 hover:bg-red-500 text-white font-bold text-2xl rounded mt-3 h-14 w-16'}
        onClick={onClick}
      >
        X
      </button>
    </div>
  );
};

// Fast refresh can't handle anonymous components.
const RemoveableControlWithJsonForms = withJsonFormsControlProps(RemoveableControl);
export default RemoveableControlWithJsonForms;

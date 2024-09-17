import { withJsonFormsControlProps } from '@jsonforms/react';
import { Unwrapped } from '@jsonforms/material-renderers';
import { ControlProps } from '@jsonforms/core';
import { JSX, useContext } from 'react';
import { SchemaContext, SchemaUIContext } from '../context/Contexts';
import { findAndAddOrRemoveNestedObjectInSchema } from '../utils/findAndAddOrRemoveNestedObjectInSchema';
import { removeQuestions } from '../utils/removeQuestions';

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

  const renderer = `${props?.schema?.renderer}`;
  const Component: JSX.Element = RENDERER[renderer] ?? Unwrapped.MaterialTextControl;

  const onClick = () => {
    removeQuestions(
      {
        questionsToRemove: [props.path],
        uiSchemaElementToRemove: props.path,
        formSchema,
        setFormSchema,
        formUiSchema,
        setFormUiSchema,
      }
    );
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

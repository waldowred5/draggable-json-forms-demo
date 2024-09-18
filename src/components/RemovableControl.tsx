import { withJsonFormsControlProps } from '@jsonforms/react';
import { Unwrapped } from '@jsonforms/material-renderers';
import { ControlProps } from '@jsonforms/core';
import { JSX, useContext, useRef, useState } from 'react';
import { SchemaContext, SchemaUIContext } from '../context/Contexts';
import { findAndAddOrRemoveNestedObjectInSchema } from '../utils/findAndAddOrRemoveNestedObjectInSchema';
import { removeQuestions } from '../utils/removeQuestions';
import { Reorder } from 'framer-motion';
import { useFormRef } from '../utils/useFormRef';

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

  const ref = useRef<HTMLDivElement>(null);

  console.log('props', props);

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
        setFormUiSchema
      }
    );
  };

  return (
    <Reorder.Item
      key={props.uischema}
      // ref={ref}
      // draggable={true}
      // drag={true}
      // dragListener={false}
      // dragControls={dragControls}
      // transition={{ duration: 0, ease: 'linear' }}
      // dragElastic={0.9}
      // dragMomentum={false}
      // dragConstraints={formRef}
      value={props.uischema}
    >
      <div className={'flex items-start gap-x-4'}>
        <div>
          <button
            className={'bg-slate-200 hover:bg-slate-300 hover:cursor-grab active:cursor-grabbing flex flex-col text-white justify-center items-center font-bold text-md rounded mt-3 h-14 w-9'}
            onPointerDown={(e) => dragControls.start(e)}
          >
            <span>💃🏽</span>
          </button>
        </div>
        <Component {...props} />
        <button
          className={'bg-red-200 hover:bg-red-500 text-white text-bo font-bold text-2xl rounded mt-3 h-14 w-14 font-outline-2'}
          onClick={onClick}
        >
          ☠️
        </button>
      </div>
    </Reorder.Item>
  );
};

// Fast refresh can't handle anonymous components.
const RemoveableControlWithJsonForms = withJsonFormsControlProps(RemoveableControl);
export default RemoveableControlWithJsonForms;

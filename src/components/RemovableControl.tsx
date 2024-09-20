import { withJsonFormsControlProps } from '@jsonforms/react';
import { Unwrapped } from '@jsonforms/material-renderers';
import { ControlProps } from '@jsonforms/core';
import React, { JSX, useContext, useRef, useState } from 'react';
import { SchemaContext, SchemaUIContext } from '../context/Contexts';
import { removeQuestions } from '../utils/removeQuestions';
import { Reorder, useDragControls, motion } from 'framer-motion';

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
  const dragControls = useDragControls();

  const [draggable, setDraggable] = useState(true);
  const [dragging, setDragging] = useState(false);

  // console.log('props', props);

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
    <motion.div
      ref={ref}
      drag={draggable}
      dragListener={false}
      className={`flex flex-grow border border-slate-400 rounded-lg mb-4 w-full ${
        dragging ? 'bg-cyan-100' : ''
      } transition-colors rounded-md`}
    >
      <Reorder.Item
        key={`${props.uischema}`}
        value={props.uischema}
        drag={draggable}
        dragListener={false}
        dragControls={dragControls}
        transition={{ duration: 0 }}
        className={`w-full relative bg-white rounded-md flex flex-grow flex-col items-start transition-shadow ${
          dragging && draggable
            ? 'z-50 border-2 border-teal cursor-grabbing !shadow-xl'
            : 'z-0'
        } ${
          draggable
            ? `shadow-sm border border-solid border-grey200 p-5`
            : ''
        }`}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      >
        <div className={'flex items-start gap-x-4'}>
          <button
            onPointerDown={(e) => dragControls.start(e)}
            className={'bg-slate-200 hover:bg-cyan-200 hover:cursor-grab active:cursor-grabbing justify-center items-center rounded h-full w-10'}
          >
            <span>🚀</span>
          </button>
          <Component {...props} />
          <button
            className={'bg-red-200 hover:bg-red-500 text-white text-bo font-bold text-2xl rounded mt-3 h-14 w-14 font-outline-2'}
            onClick={onClick}
          >
            ☠️
          </button>
        </div>
      </Reorder.Item>
    </motion.div>
  );
};

// Fast refresh can't handle anonymous components.
const RemoveableControlWithJsonForms = withJsonFormsControlProps(RemoveableControl);
export default RemoveableControlWithJsonForms;

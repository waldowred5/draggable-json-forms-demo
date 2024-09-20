import { JsonFormsDispatch } from '@jsonforms/react';
import React, { useContext, useState } from 'react';
import { Reorder, motion, useDragControls } from 'framer-motion';
import { SchemaUIContext } from '../../context/Contexts';

interface Props {
  uischema: any;
  schema: any;
  path: string;
  direction: 'row' | 'column';
  visible: boolean;
  renderers: any;
  label: string;
}

export const InteractiveFormLayout = ({ uischema, schema, path, visible, renderers, label }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [draggable, setDraggable] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [formUiSchema, setFormUiSchema] = useContext(SchemaUIContext);
  const [elements, setElements] = useState(uischema?.elements || []);
  const dragControls = useDragControls();

  const handleDragEnd = () => {
    setFormUiSchema({
      ...formUiSchema,
      elements
    });

    console.log('formUiSchema', formUiSchema);
  }

  return (
    <>
      <motion.div
        ref={ref}
        drag={draggable}
        dragListener={false}
        className={`flex rounded-lg mb-4 ${
          dragging ? 'bg-cyan-100' : ''
        } transition-colors rounded-md`}
      >
        <Reorder.Group
          key={uischema || path}
          axis="y"
          className={'flex flex-col w-full'}
          values={elements}
          dragControls={dragControls}
          onReorder={setElements}
          onDragEnd={handleDragEnd}
        >
          {elements.map((element: any) => {
            return (
              <JsonFormsDispatch
                key={element.id}
                uischema={element}
                schema={schema}
                path={path}
                visible={visible}
                renderers={renderers}
              />
            );
          })}
        </Reorder.Group>
      </motion.div>
    </>
  );
};
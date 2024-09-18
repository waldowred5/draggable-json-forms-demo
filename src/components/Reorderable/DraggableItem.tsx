import { Reorder, useDragControls } from 'framer-motion';
import { motion } from 'framer-motion';
import React, { PropsWithChildren, useState } from 'react';

type Props = {
  value: unknown;
  key: string;
  draggable: boolean;
  onDrop?: () => void;
};

export const DraggableItem = (
  {
    value,
    // key,
    draggable,
    onDrop,
    children
  }: PropsWithChildren<Props>
) => {
  const [dragging, setDragging] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  return (
    <>
      <motion.div
        ref={ref}
        drag={draggable}
        dragListener={false}
        className={`w-full flex mb-3 gap-x-3 ${
          dragging ? 'bg-cyan-100' : ''
        } transition-colors rounded-md`}
      >
        <Reorder.Item
          drag={draggable}
          dragListener={false}
          dragControls={dragControls}
          transition={{ duration: 0 }}
          className={`relative w-full h-24 bg-white rounded-md flex items-center justify-center gap-x-6 transition-shadow ${
            dragging && draggable
              ? 'z-50 border-2 border-teal cursor-grabbing !shadow-xl'
              : 'z-0'
          } ${
            draggable
              ? `shadow-sm border border-solid border-grey200 p-5`
              : ''
          }`}
          value={value}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => {
            setDragging(false);
            onDrop?.();
          }}
        >
          <button
            onPointerDown={(e) => dragControls.start(e)}
            className={'bg-slate-200 hover:bg-cyan-200 hover:cursor-grab active:cursor-grabbing justify-center items-center rounded h-full w-10'}
          >
            <span>🚀</span>
          </button>
          <div className={'h-full w-0.5 bg-gray-200'}></div>
          <div className={`flex-1`}>{value?.label ?? 'Not Found'}</div>
        </Reorder.Item>
      </motion.div>
    </>
  );
};

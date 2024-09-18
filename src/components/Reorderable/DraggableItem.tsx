import { Reorder } from 'framer-motion';
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
    children,
  }: PropsWithChildren<Props>
) => {
  const [dragging, setDragging] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={`${
        dragging ? 'bg-cyan-100' : ''
      } transition-colors rounded-md`}
    >
      <Reorder.Item
        drag={draggable}
        transition={{ duration: 0 }}
        className={`relative bg-white rounded-md flex items-center transition-shadow ${
          dragging && draggable
            ? 'z-50 border-2 border-teal cursor-grabbing !shadow-xl'
            : 'z-0'
        } ${
          draggable
            ? `shadow-sm mb-3 border border-solid border-grey200 p-5 active:cursor-grabbing hover:cursor-grab`
            : ''
        }`}
        // key={key}
        value={value}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          setDragging(false);
          onDrop?.();
        }}
      >
        <div className={`flex-1`}>{value?.label ?? 'Not Found'}</div>
      </Reorder.Item>
    </motion.div>
  );
};

import { Reorder } from 'framer-motion';
import { motion } from 'framer-motion';
import React, { PropsWithChildren, useState } from 'react';
import { DraggableItem } from './DraggableItem';

type Props = {
  value: unknown;
  draggable: boolean;
  onDrop?: () => void;
  children: any[];
};

export const DraggableGroup = (
  {
    value,
    draggable,
    onDrop,
    children,
  }: PropsWithChildren<Props>
) => {
  const [groups, setGroups] = useState(value.elements);
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
        value={value}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          setDragging(false);
          onDrop?.();
        }}
      >
        <Reorder.Group
          axis="y"
          values={groups}
          onReorder={setGroups}
          className={'flex flex-col w-full'}
        >
          {groups.map((item) => (
            <DraggableItem value={item} key={item} draggable={true}>
              {item}
            </DraggableItem>
          ))}
        </Reorder.Group>
      </Reorder.Item>
    </motion.div>
  );
};

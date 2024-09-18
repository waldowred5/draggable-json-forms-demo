import { Reorder, useDragControls } from 'framer-motion';
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
    onDrop
    // children,
  }: PropsWithChildren<Props>
) => {
  const [groups, setGroups] = useState(value.elements);
  const [dragging, setDragging] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  return (
    <motion.div
      ref={ref}
      drag={draggable}
      dragListener={false}
      className={`${
        dragging ? 'bg-cyan-100' : ''
      } transition-colors rounded-md`}
    >
      <Reorder.Item
        drag={draggable}
        dragListener={false}
        dragControls={dragControls}
        transition={{ duration: 0 }}
        className={`relative bg-white rounded-md flex flex-col items-start transition-shadow ${
          dragging && draggable
            ? 'z-50 border-2 border-teal cursor-grabbing !shadow-xl'
            : 'z-0'
        } ${
          draggable
            ? `shadow-sm mb-3 border border-solid border-grey200 p-5`
            : ''
        }`}
        value={value}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          setDragging(false);
          onDrop?.();
        }}
      >
        <div className={'flex items-center mb-4 h-12 gap-x-4'}>
          <button
            onPointerDown={(e) => dragControls.start(e)}
            className={'bg-slate-200 hover:bg-cyan-200 hover:cursor-grab active:cursor-grabbing justify-center items-center rounded h-full w-10'}
          >
            <span>🚀</span>
          </button>
          <h1 className={`flex-1 font-bold text-2xl`}>{value.label}</h1>
        </div>
        <Reorder.Group
          axis="y"
          values={groups}
          onReorder={setGroups}
          className={'flex flex-col w-full'}
        >
          {groups.map((item) => {
            return (
              item?.elements?.length > 0 ? (
                <DraggableGroup value={item} key={item.key} draggable={true} />
              ) : (
                <DraggableItem value={item} key={item.key} draggable={true} />
              )
            );
          })}
        </Reorder.Group>
      </Reorder.Item>
    </motion.div>
  );
};

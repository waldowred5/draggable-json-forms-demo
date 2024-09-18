import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { DraggableItem } from './DraggableItem';

export const ReorderableDemo = () => {
  const [groups, setGroups] = useState([0, 1, 2, 3]);

  return (
    <Reorder.Group axis="y" values={groups} onReorder={setGroups}>
      {groups.map((item) => (
          <DraggableItem value={item} key={item} draggable={true}>
            {item}
          </DraggableItem>
      ))}
    </Reorder.Group>
  );
};
import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { DraggableGroup } from './DraggableGroup';

const initialGroups = [
  {
    key: 'key0',
    elements: [
      'Item 1',
      'Item 2'
    ]
    // elements: [
    //   { key: 'Item 1', elements: ['Item 1'] },
    //   { key: 'Item 2', elements: ['Item 2'] }
    // ]
  },
  {
    key: 'key1',
    elements: [
      'Item 3',
      'Item 4',
      'Item 5'
    ]
    // elements: [
    //   { key: 'Item 3', elements: ['Item 3'] },
    //   { key: 'Item 4', elements: ['Item 4'] },
    //   { key: 'Item 5', elements: ['Item 5'] }
    // ]
  }
];

export const ReorderableDemo = () => {
  const [groups, setGroups] = useState(initialGroups);

  return (
    <Reorder.Group axis="y" values={groups} onReorder={setGroups}>
      {groups.map((item, index) => {
        return (
          <DraggableGroup value={item} key={item.key} draggable={true}>
            {item.elements}
          </DraggableGroup>
        );
      })}
    </Reorder.Group>
  );
};
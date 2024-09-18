import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { DraggableGroup } from './DraggableGroup';

const initialGroupsNested = [
  {
    key: 'key0',
    label: 'Group 1',
    elements: [
      { key: 'key0.0', label: 'Item 1.1', elements: [] },
      { key: 'key0.1', label: 'Item 1.2', elements: [] }
    ]
  },
  {
    key: 'key1',
    label: 'Group 2',
    elements: [
      { key: 'key1.0', label: 'Item 2.0', elements: [] },
      { key: 'key1.1', label: 'Item 2.1', elements: [] },
      { key: 'key1.2', label: 'Item 2.2', elements: [] }
    ]
  },
  {
    key: 'key2',
    label: 'Group 3',
    elements: [
      {
        key: 'key2.0',
        label: 'Sub Group 3.1',
        elements: [
          { key: 'key2.0.0', label: 'Item 3.1.1', elements: [] },
          { key: 'key2.0.1', label: 'Item 3.1.2', elements: [] },
          { key: 'key2.0.2', label: 'Item 3.1.3', elements: [] },
        ]
      },
      {
        key: 'key2.1',
        label: 'Sub Group 3.2',
        elements: [
          { key: 'key2.1.0', label: 'Item 3.2.1', elements: [] },
          { key: 'key2.1.1', label: 'Item 3.2.2', elements: [] },
        ]
      }
    ]
  }
];

export const ReorderableDemo = () => {
  const [groups, setGroups] = useState(initialGroupsNested);

  return (
    <Reorder.Group
      axis="y"
      values={groups}
      onReorder={setGroups}
    >
      {groups.map((item, index) => {
        console.log('outer item', item);

        return (
          <DraggableGroup value={item} key={item.key} draggable={true}/>
        );
      })}
    </Reorder.Group>
  );
};
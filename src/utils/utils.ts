interface SchemaElement {
  type: string;
  elements?: SchemaElement[];
  [key: string]: any; // For additional properties like 'label', 'id', etc.
}

type Action = 'add' | 'remove';

export const findAndAddOrRemoveNestedObjectInSchema = (
  schema: SchemaElement,
  keyToFind: string,
  valueToFind: any,
  action: Action,
  childToAdd?: SchemaElement
): SchemaElement => {
  // Create a deep copy of the schema to avoid mutating the original
  const newSchema = JSON.parse(JSON.stringify(schema));

  // TODO: Bump this out of local scope
  // Helper function to recursively modify schema
  const recursiveModify = (element: SchemaElement): SchemaElement | null => {
    // Check if the current element contains the key-value pair you're looking for
    if (element[keyToFind] === valueToFind) {
      if (action === 'remove') {
        return null; // Returning null means the element will be removed
      } else if (action === 'add' && childToAdd) {
        // If action is 'add', add the child object to the 'elements' array
        element.elements = element.elements || [];
        element.elements.push(childToAdd);
      }

      return element;
    }

    // Check if the element has children in the 'elements' array, and recursively search and modify them
    if (element.elements && element.elements.length > 0) {
      const modifiedElements = [];
      for (const child of element.elements) {
        const modifiedChild = recursiveModify(child);
        if (modifiedChild) {
          modifiedElements.push(modifiedChild); // Keep the child if it wasn’t removed
        }
      }

      element.elements = modifiedElements;
    }

    return element;
  }

  // Perform recursive search and modification on the top-level schema
  recursiveModify(newSchema);

  return newSchema;
};

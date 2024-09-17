import { useContext } from 'react';
import { SchemaContext, SchemaUIContext } from '../context/Contexts';
import { findAndAddOrRemoveNestedObjectInSchema } from './findAndAddOrRemoveNestedObjectInSchema';

export const useRemoveQuestion = ({ questionsToRemove, uiSchemaElementToRemove }) => {
  const [formSchema, setFormSchema] = useContext(SchemaContext);
  const [formUiSchema, setFormUiSchema] = useContext(SchemaUIContext);

  const filteredSchemaProperties = Object.entries(formSchema.properties).reduce((acc, property) => {
    if (questionsToRemove.includes(property[0])) { // array of questions to check, EX: property[0] === props.path
      return acc;
    }

    return {
      ...acc,
      [property[0]]: property[1]
    };
  }, {});

  const filteredSchemaPropertiesRequiredList = formSchema.required.filter((requiredProperty) => {
    return !questionsToRemove.includes(requiredProperty); // array of ids to check against, EX: requiredProperty !== props.path
  });

  setFormSchema({
    ...formSchema,
    properties: filteredSchemaProperties,
    required: filteredSchemaPropertiesRequiredList
  });

  setFormUiSchema(findAndAddOrRemoveNestedObjectInSchema(formUiSchema, 'id', uiSchemaElementToRemove, 'remove')); // id to remove, EX: props.path
}
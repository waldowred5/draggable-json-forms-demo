import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { MaterialLayoutRenderer } from '@jsonforms/material-renderers';
import { useContext, useState } from 'react';
import { SchemaContext, SchemaUIContext } from '../../context/Contexts';
import { AddSection } from '../AddSection';
import { AddQuestion } from '../AddQuestion';
import { findAndAddOrRemoveNestedObjectInSchema } from '../../utils/findAndAddOrRemoveNestedObjectInSchema';
import { removeQuestions } from '../../utils/removeQuestions';

interface Props {
  uischema: any;
  schema: any;
  path: string;
  direction: 'row' | 'column';
  visible: boolean;
  renderers: any;
  label: string;
}

const SectionLayout = ({ uischema, schema, path, visible, renderers, label }: Props) => {
    const [formSchema, setFormSchema] = useContext(SchemaContext);
    const [formUiSchema, setFormUiSchema] = useContext(SchemaUIContext);
    const [isEditingSection, setIsEditingSection] = useState(false);
    const [isEditingQuestion, setIsEditingQuestion] = useState(false);

    const onAddSectionClick = () => {
      setIsEditingSection(true);
    };

    const onAddQuestionClick = () => {
      setIsEditingQuestion(true);
    };

    const onRemoveSectionClick = () => {
      console.log('id', uischema.id);
      const questionsToRemove = Object.entries(formSchema.properties).reduce((acc, property) => {
        if (property[1].parentId === uischema.id) {
          return [
            ...acc,
            property[0]
          ];
        }

        return acc;
      }, []);

      removeQuestions(
        {
          questionsToRemove,
          uiSchemaElementToRemove: uischema.id,
          formSchema,
          setFormSchema,
          formUiSchema,
          setFormUiSchema,
        }
      );

      const filteredSchemaProperties = Object.entries(formSchema.properties).reduce((acc, property) => {
        if (questionsToRemove.includes(property[0])) {
          return acc;
        }

        return {
          ...acc,
          [property[0]]: property[1]
        };
      }, {});

      const filteredSchemaPropertiesRequiredList = formSchema.required.filter((requiredProperty) => {
        return !questionsToRemove.includes(requiredProperty);
      });

      setFormSchema({
        ...formSchema,
        properties: filteredSchemaProperties,
        required: filteredSchemaPropertiesRequiredList
      });
      setFormUiSchema(findAndAddOrRemoveNestedObjectInSchema(formUiSchema, 'id', uischema.id, 'remove'));
    };

    const onEditClick = () => {
      console.log('onEditClick');
    };

    return (
      <>
        {visible ?
          <div className={'border border-slate-400 rounded-lg p-4 mb-4 w-full'}>
            <div className={'flex items-center gap-x-4 mb-4'}>
              <h1 className={'text-2xl font-bold'}>{label}</h1>
              <button
                className={'bg-slate-500 hover:bg-slate-600 text-white font-semibold py-1 px-4 rounded-max disabled:bg-slate-200 disabled:cursor-not-allowed'}
                disabled={true}
                onClick={onEditClick}
              >
                EDIT
              </button>
            </div>
            <div>
              <MaterialLayoutRenderer
                uischema={uischema}
                schema={schema}
                path={path}
                direction={'column'}
                visible={visible}
                renderers={renderers}
                elements={uischema.elements}
              />
              <div className={'flex flex-col gap-y-2 w-full'}>
                <div className={'flex justify-start gap-x-2 w-full flex-grow'}>
                  {!isEditingQuestion
                    ? <button
                      className={'bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-2 px-4 rounded-max'}
                      onClick={onAddQuestionClick}
                    >
                      + Add Question
                    </button>
                    : <AddQuestion
                      parentSectionId={uischema.id}
                      isEditingQuestion={isEditingQuestion}
                      setIsEditingQuestion={setIsEditingQuestion}
                    />
                  }
                </div>
                <div className={'flex justify-start gap-x-2 w-full flex-grow'}>
                  {!isEditingSection
                    ? <button
                      className={'bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-2 px-4 rounded-max'}
                      onClick={onAddSectionClick}
                    >
                      + Add Sub Section
                    </button>
                    : <AddSection
                      isEditingSection={isEditingSection}
                      setIsEditingSection={setIsEditingSection}
                      parentSectionId={uischema.id}
                    />
                  }
                </div>
                <div className={'flex justify-end gap-x-2'}>
                  <button
                    className={'bg-red-400 hover:bg-red-500 text-red-50 font-semibold py-2 px-4 rounded-max'}
                    onClick={onRemoveSectionClick}
                  >
                    REMOVE SECTION
                  </button>
                </div>
              </div>
            </div>
          </div>
          : null}
      </>
    )
      ;
  }
;

// Fast refresh can't handle anonymous components.
const SectionLayoutWithJsonForms = withJsonFormsLayoutProps(SectionLayout);
export default SectionLayoutWithJsonForms;
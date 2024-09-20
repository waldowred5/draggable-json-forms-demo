import { JsonFormsDispatch, ResolvedJsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';
import { MaterialLayoutRenderer } from '@jsonforms/material-renderers';
import React, { useContext, useState } from 'react';
import { SchemaContext, SchemaUIContext } from '../../context/Contexts';
import { AddSection } from '../AddSection';
import { AddQuestion } from '../AddQuestion';
import { findAndAddOrRemoveNestedObjectInSchema } from '../../utils/findAndAddOrRemoveNestedObjectInSchema';
import { removeQuestions } from '../../utils/removeQuestions';
import { Reorder, motion, useDragControls } from 'framer-motion';

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

  const [elements, setElements] = useState(uischema.elements || []);
  const [draggable, setDraggable] = useState(true);
  const [dragging, setDragging] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  console.log('uischema', uischema);

  const onAddSectionClick = () => {
    setIsEditingSection(true);
  };

  const onAddQuestionClick = () => {
    setIsEditingQuestion(true);
  };

  const onRemoveSectionClick = () => {
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
        setFormUiSchema
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
        <motion.div
          ref={ref}
          drag={draggable}
          dragListener={false}
          className={`flex flex-grow border border-slate-400 rounded-lg mb-4 w-full ${
            dragging ? 'bg-cyan-100' : ''
          } transition-colors rounded-md`}
        >
          <Reorder.Item
            value={uischema}
            drag={draggable}
            dragListener={false}
            dragControls={dragControls}
            transition={{ duration: 0 }}
            className={`w-full relative bg-white rounded-md flex flex-grow flex-col items-start transition-shadow ${
              dragging && draggable
                ? 'z-50 border-2 border-teal cursor-grabbing !shadow-xl'
                : 'z-0'
            } ${
              draggable
                ? `shadow-sm border border-solid border-grey200 p-5`
                : ''
            }`}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
          >
            <div className={'flex items-center mb-4 h-12 gap-x-4'}>
              <button
                onPointerDown={(e) => dragControls.start(e)}
                className={'bg-slate-200 hover:bg-cyan-200 hover:cursor-grab active:cursor-grabbing justify-center items-center rounded h-full w-10'}
              >
                <span>🚀</span>
              </button>
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
            </div>
            <Reorder.Group
              axis="y"
              values={elements}
              onReorder={setElements}
              className={'flex flex-col w-full'}
            >
              {elements.map((element: any) => {
                return (
                  <JsonFormsDispatch
                    key={element.id}
                    uischema={element}
                    schema={schema}
                    path={path}
                    visible={visible}
                    renderers={renderers}
                  />
                );
              })}
              <div className={'flex flex-col gap-y-2 w-full mt-6'}>
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
            </Reorder.Group>
          </Reorder.Item>
        </motion.div>
        : null}
    </>
  );
};

// Fast refresh can't handle anonymous components.
const SectionLayoutWithJsonForms = withJsonFormsLayoutProps(SectionLayout);
export default SectionLayoutWithJsonForms;
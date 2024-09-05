import initialQuestionSchema from '../schemata/addQuestionSchema.json';
import initialQuestionUiSchema from '../schemata/addQuestionUiSchema.json';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { v7 as uuidv7 } from 'uuid';
import addQuestionSchema from '../schemata/addQuestionSchema.json';

const initialData = {};

const renderers = [
  ...materialRenderers
  // register custom renderers
];

export const AddQuestion = (
  {
    sectionId,
    formSchema,
    setFormSchema,
    formUiSchema,
    setFormUiSchema,
    isEditingQuestion,
    setIsEditingQuestion,
    questionData,
    setQuestionData,
    currentQuestion,
    setCurrentQuestion
  }: any) => {
  const uuid = `question_${uuidv7()}`;

  const onCancel = () => {
    setCurrentQuestion({});
    setIsEditingQuestion(!isEditingQuestion);
  };

  const onSave = () => {
    // setFormSchema(
    //   {
    //     ...formSchema,
    //     properties: {
    //       ...formSchema.properties,
    //       [sectionId]: {
    //         ...formSchema.properties[sectionId],
    //         properties: {
    //           ...formSchema.properties[sectionId].properties,
    //           [uuid]: {
    //             ...addQuestionSchema
    //           }
    //         }
    //       }
    //     }
    //   }
    // );
    //
    // const targetSection = formUiSchema.elements.find((element: any) => element.id === sectionId);
    //
    // if (!targetSection) {
    //   setFormUiSchema({
    //     ...formUiSchema,
    //     elements: [
    //       ...formUiSchema.elements,
    //       {
    //         type: 'Group',
    //         label: sectionData.sectionTitle,
    //         id: uuid,
    //         elements: []
    //       }
    //     ]
    //   });
    // }
    //
    // setFormUiSchema(
    //   {
    //     ...formUiSchema,
    //     elements: [
    //       ...formUiSchema.elements,
    //       {
    //         type: 'Group',
    //         label: 'BLERG',
    //         elements: []
    //       }
    //     ]
    //   }
    // );

    console.log('currentQuestion', currentQuestion);

    setQuestionData([...questionData, currentQuestion]);
    setCurrentQuestion({});
    setIsEditingQuestion(!isEditingQuestion);
  };

  return (
    <div className={'flex border-2 p-2 rounded-md shadow-lg'}>
      {
        !isEditingQuestion
          ? <div className={'flex flex-col items-start justify-center h-12 w-full'}>
            <button className={'flex justify-center items-center hover:bg-slate-100 w-36 h-full text-slate-700 font-semibold rounded-md'}
              onClick={() => setIsEditingQuestion(!isEditingQuestion)}
            >
              <h1>+ Add Question</h1>
            </button>
          </div>
          : <div className={'flex flex-col gap-y-4 w-full'}>
            <JsonForms
              data={currentQuestion}
              schema={initialQuestionSchema}
              uischema={initialQuestionUiSchema}
              renderers={renderers}
              cells={materialCells}
              onChange={({ data }) => setCurrentQuestion(data)}
            />
            <div className={'flex justify-start gap-x-4'}>
              <button
                className={'bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-2 rounded-md w-32'}
                onClick={onSave}
              >
                <h3>SAVE</h3>
              </button>
              <button
                className={'bg-slate-400 hover:bg-slate-500 text-white font-semibold p-2 rounded-md w-32'}
                onClick={onCancel}
              >
                <h3>CANCEL</h3>
              </button>
            </div>
          </div>
      }
    </div>
  );
};
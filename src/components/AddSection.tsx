import initialSectionSchema from '../schemata/addSectionSchema.json';
import initialSectionUiSchema from '../schemata/addSectionUiSchema.json';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { AddQuestion } from './AddQuestion';
import { v7 as uuidv7 } from 'uuid';

const renderers = [
  ...materialRenderers
  // register custom renderers
];

export const AddSection = (
  {
    formSchema,
    setFormSchema,
    formUiSchema,
    setFormUiSchema,
    sectionData,
    setSectionData,
    isEditingSection,
    setIsEditingSection,
    isEditingQuestion,
    setIsEditingQuestion,
    questionData,
    setQuestionData,
    currentQuestion,
    setCurrentQuestion
  }: any) => {
  const uuid = `section_${uuidv7()}`;

  const onCancel = () => {
    setIsEditingSection(!isEditingSection);
    setSectionData({});
  };

  const onSave = () => {
    const questionProperties = questionData.map((question: any) => {
      return {
        type: 'Group',
        elements: {},
        label: question.question,
        id: question.questionId,
        properties: {
          [question.questionId]: {
            type: question.questionResponseType
          }
        },
        questionId: question.questionId,
        type: question.questionResponseType

      };
    });

    setFormSchema(
      {
        ...formSchema,
        properties: {
          ...formSchema.properties
          // [uuid]: {
          //   type: 'object',
          //   properties: {
          //     sectionTitle: {
          //       type: 'string',
          //     },
          //
          //   }
          // }

        }
      }
    );

    const questionElements = questionData.map((question: any) => {
      return {
        type: 'Control',
        scope: `#/properties/${uuid}/properties/${question.questionId}`
      };
    });

    setFormUiSchema(
      {
        ...formUiSchema,
        elements: [
          ...formUiSchema.elements,
          {
            type: 'Group',
            label: sectionData.sectionTitle,
            id: uuid,
            elements: questionElements
          }
        ]
      }
    );

    setSectionData({});
    setIsEditingSection(!isEditingSection);
  };

  // TODO: Add 'Modal' requiring save confirmation of a section

  return (
    <>
      {
        !isEditingSection
          ? <div className={'border-2 border-dashed border-slate-500 rounded-md'}>
            <div className={'flex flex-col items-center justify-center w-full'}>
              <button className={'hover:bg-slate-100 w-full h-32 text-slate-700 font-semibold'}
                      onClick={() => setIsEditingSection(!isEditingSection)}
              >
                <h1>+</h1>
                <h1>Add Section</h1>
              </button>
            </div>
          </div>
          : <div className={'flex flex-col gap-y-4 border-2 p-2 rounded-md shadow-lg'}>
            <JsonForms
              data={sectionData}
              schema={initialSectionSchema}
              uischema={initialSectionUiSchema}
              renderers={renderers}
              cells={materialCells}
              onChange={({ data }) => setSectionData(data)}
            />
            <AddQuestion
              sectionId={uuid}
              formSchema={formSchema}
              setFormSchema={setFormSchema}
              formUiSchema={formUiSchema}
              setFormUiSchema={setFormUiSchema}
              isEditingQuestion={isEditingQuestion}
              setIsEditingQuestion={setIsEditingQuestion}
              questionData={questionData}
              setQuestionData={setQuestionData}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
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
    </>
  );
};
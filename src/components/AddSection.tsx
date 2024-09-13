import initialSectionSchema from '../schemata/addSectionSchema.json';
import initialSectionUiSchema from '../schemata/addSectionUiSchema.json';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { AddQuestion } from './AddQuestion';
import { v7 as uuidv7 } from 'uuid';
import { useContext } from 'react';
import {
  CurrentQuestionContext,
  QuestionsContext,
  SchemaContext,
  SchemaUIContext,
  SectionContext
} from '../context/Contexts';
import { findAndActionNestedObjectInSchema } from '../utils/utils';

const renderers = [
  ...materialRenderers
];

export const AddSection = (
  {
    isEditingSection,
    setIsEditingSection,
    parentSectionId
  }: any) => {
  const uuid = `section_${uuidv7()}`;

  const [formSchema, setFormSchema] = useContext(SchemaContext);
  const [formUiSchema, setFormUiSchema] = useContext(SchemaUIContext);
  const [sectionData, setSectionData] = useContext(SectionContext);
  const [questionData, setQuestionData] = useContext(QuestionsContext);
  const [currentQuestion, setCurrentQuestion] = useContext(CurrentQuestionContext);

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

    // setFormUiSchema(
    //   {
    //     ...formUiSchema,
    //     elements: [
    //       ...formUiSchema.elements,
    //       {
    //         type: 'Group',
    //         label: sectionData.sectionTitle,
    //         id: uuid,
    //         elements: questionElements
    //       }
    //     ]
    //   }
    // )

    setFormUiSchema(findAndActionNestedObjectInSchema(
      formUiSchema,
      'id',
      parentSectionId,
      'add',
      {
        type: 'Group',
        label: sectionData.sectionTitle,
        id: uuid,
        elements: questionElements
      }
    ));

    setSectionData({});
    setIsEditingSection(!isEditingSection);
  };

  // TODO: Add 'Modal' requiring save confirmation of a section

  return (
    <>
      <div className={'flex flex-col gap-y-4 border-2 p-2 rounded-md shadow-lg w-full'}>
        <JsonForms
          data={sectionData}
          schema={initialSectionSchema}
          uischema={initialSectionUiSchema}
          renderers={renderers}
          cells={materialCells}
          onChange={({ data }) => setSectionData(data)}
        />
        {/*<AddQuestion*/}
        {/*  sectionId={uuid}*/}
        {/*  formSchema={formSchema}*/}
        {/*  setFormSchema={setFormSchema}*/}
        {/*  formUiSchema={formUiSchema}*/}
        {/*  setFormUiSchema={setFormUiSchema}*/}
        {/*  isEditingQuestion={isEditingQuestion}*/}
        {/*  setIsEditingQuestion={setIsEditingQuestion}*/}
        {/*  questionData={questionData}*/}
        {/*  setQuestionData={setQuestionData}*/}
        {/*  currentQuestion={currentQuestion}*/}
        {/*  setCurrentQuestion={setCurrentQuestion}*/}
        {/*/>*/}
        <div className={'flex justify-start gap-x-4'}>
          <button
            className={'bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-2 rounded-max w-32'}
            onClick={onSave}
          >
            <h3>SAVE</h3>
          </button>
          <button
            className={'bg-slate-400 hover:bg-slate-500 text-white font-semibold p-2 rounded-max w-32'}
            onClick={onCancel}
          >
            <h3>CANCEL</h3>
          </button>
        </div>
      </div>
    </>
  );
};
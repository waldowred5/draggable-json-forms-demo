import { materialRenderers } from '@jsonforms/material-renderers';
import ratingControlTester from '../ratingControlTester';
import RatingControl from './RatingControl';
import { sectionLayoutTester } from '../sectionLayoutTester';
import SectionLayout from './SectionLayout';
import { useMemo, useState } from 'react';
import { GigaForm } from './GigaForm';
import initialFormSchema from '../schemata/gigaFormSchema.json';
import initialFormUiSchema from '../schemata/gigaFormUiSchema.json';

const renderers = [
  ...materialRenderers,
  // register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
  { tester: sectionLayoutTester, renderer: SectionLayout }
];

export const GigaFormDemo = () => {
  const [formSchema, setFormSchema] = useState<object>(initialFormSchema);
  const [formUiSchema, setFormUiSchema] = useState<object>(initialFormUiSchema);
  const stringifiedFormSchema = useMemo(() => JSON.stringify(formSchema, null, 2), [formSchema]);
  const stringifiedFormUiSchema = useMemo(() => JSON.stringify(formUiSchema, null, 2), [formUiSchema]);

  const initialFormData = {
    formTitle: 'New Questionnaire'
  };
  const [formData, setFormData] = useState<object>(initialFormData);
  const [formErrors] = useState([]);
  const stringifiedFormData = useMemo(() => JSON.stringify(formData, null, 2), [formData]);

  const initialSectionData = {
    sectionTitle: 'Section 1',
  };
  const [sectionData, setSectionData] = useState<object>(initialSectionData);
  const [sectionErrors] = useState([]);
  const stringifiedSectionData = useMemo(() => JSON.stringify(sectionData, null, 2), [sectionData]);

  const initialQuestionData = {

  };
  const [questionsData, setQuestionsData] = useState<[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<object>(initialQuestionData);
  // const [sectionErrors] = useState([]);
  const stringifiedQuestionData = useMemo(() => JSON.stringify(questionsData, null, 2), [questionsData]);
  const stringifiedCurrentQuestionData = useMemo(() => JSON.stringify(currentQuestion, null, 2), [currentQuestion]);

  const clearAllData = () => {
    setFormSchema(initialFormSchema);
    setFormUiSchema(initialFormUiSchema);
    setFormData({});
    setQuestionsData([]);
    setCurrentQuestion({});
  };

  return (
    <div className={'flex w-full gap-x-6'}>
      <GigaForm
        renderers={renderers}
        formSchema={formSchema}
        setFormSchema={setFormSchema}
        formUiSchema={formUiSchema}
        setFormUiSchema={setFormUiSchema}
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        sectionData={sectionData}
        setSectionData={setSectionData}
        questionData={questionsData}
        setQuestionData={setQuestionsData}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        sectionErrors={sectionErrors}
      />
      <div className={'flex w-0.5 my-4 bg-slate-200'}></div>
      <div className={'flex flex-col gap-y-4'}>
        <div className={'flex gap-y-4 justify-between'}>
          <h3 className={'font-bold text-3xl'}>Bound data</h3>
          <button
            onClick={clearAllData}
            className={'bg-red-400 hover:bg-red-500 text-white font-semibold p-2 rounded-md w-48'}
          >
            CLEAR DATA
          </button>
        </div>
        <div className={'flex rounded bg-slate-600'}>
          <pre className={'p-4 text-white'}>Form Schema: {stringifiedFormSchema}</pre>
        </div>
        <div className={'flex rounded bg-slate-600'}>
          <pre className={'p-4 text-white'}>Form UI Schema: {stringifiedFormUiSchema}</pre>
        </div>
        <div className={'flex rounded bg-slate-600'}>
          <pre className={'p-4 text-white'}>Form Data: {stringifiedFormData}</pre>
        </div>
        <div className={'flex rounded bg-slate-600'}>
          <pre className={'p-4 text-white'}>Section Data: {stringifiedSectionData}</pre>
        </div>
        <div className={'flex rounded bg-slate-600'}>
          <pre className={'p-4 text-white'}>Question Data: {stringifiedQuestionData}</pre>
        </div>
        <div className={'flex rounded bg-slate-600'}>
          <pre className={'p-4 text-white'}>Current Question Data: {stringifiedCurrentQuestionData}</pre>
        </div>
      </div>
    </div>
  );
};
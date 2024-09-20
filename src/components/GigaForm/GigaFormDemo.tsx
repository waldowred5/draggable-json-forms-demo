import { materialRenderers } from '@jsonforms/material-renderers';
import ratingControlTester from '../../testers/ratingControlTester';
import RatingControl from '../RatingControl';
import { sectionLayoutTester } from '../../testers/sectionLayoutTester';
import { useMemo, useState } from 'react';
import { GigaForm } from './GigaForm';
import initialFormSchema from '../../schemata/gigaFormSchema.json';
// import initialFormUiSchema from '../../schemata/gigaFormUiSchemaNested.json';
import initialFormUiSchema from '../../schemata/gigaFormUiSchema.json';
import InteractiveFormSectionLayout from '../renderers/InteractiveFormSectionLayout';
import {
  SchemaContext,
  SchemaUIContext,
  FormDataContext,
  SectionContext,
  QuestionsContext,
  CurrentQuestionContext
} from '../../context/Contexts';
import { removeableControlTester } from '../../testers/removeableControlTester';
import RemovableControl from '../RemovableControl';

const renderers = [
  ...materialRenderers,
  // register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
  // { tester: sectionLayoutTester, renderer: sectionLayout }
  { tester: sectionLayoutTester, renderer: InteractiveFormSectionLayout },
  { tester: removeableControlTester, renderer: RemovableControl }
];

export const GigaFormDemo = () => {
  const [formSchema, setFormSchema] = useState<object>(initialFormSchema);
  const [formUiSchema, setFormUiSchema] = useState<object>(initialFormUiSchema);
  const stringifiedFormSchema = useMemo(() => JSON.stringify(formSchema, null, 2), [formSchema]);
  const stringifiedFormUiSchema = useMemo(() => JSON.stringify(formUiSchema, null, 2), [formUiSchema]);

  const [formData, setFormData] = useState<object>({ formTitle: 'New Questionnaire' });
  const [formErrors] = useState([]);
  const stringifiedFormData = useMemo(() => JSON.stringify(formData, null, 2), [formData]);

  const [sectionData, setSectionData] = useState<object>({ sectionTitle: 'Section' });
  const stringifiedSectionData = useMemo(() => JSON.stringify(sectionData, null, 2), [sectionData]);

  const initialQuestionData = {
    question: '',
    questionResponseType: '',
    responseRequired: false,
    allowAttachments: false,
    allowAdditionalComments: false
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
    <SchemaContext.Provider value={[formSchema, setFormSchema]}>
      <SchemaUIContext.Provider value={[formUiSchema, setFormUiSchema]}>
        <FormDataContext.Provider value={[formData, setFormData]}>
          <SectionContext.Provider value={[sectionData, setSectionData]}>
            <QuestionsContext.Provider value={[questionsData, setQuestionsData]}>
              <CurrentQuestionContext.Provider value={[currentQuestion, setCurrentQuestion]}>
                <div className={'flex w-full gap-x-6'}>
                  <GigaForm
                    renderers={renderers}
                    formErrors={formErrors}
                  />
                  <div className={'w-full'}>
                    <div className={'flex w-0.5 my-4 bg-slate-200'}></div>
                    <div className={'flex flex-col gap-y-4'}>
                      <div className={'flex gap-y-4 justify-between'}>
                        <h3 className={'font-bold text-3xl'}>Bound data</h3>
                        <button
                          onClick={clearAllData}
                          className={'bg-red-400 hover:bg-red-500 text-white font-semibold p-2 rounded-max w-48'}
                        >
                          CLEAR DATA
                        </button>
                      </div>
                      <div className={'flex rounded-max bg-slate-600'}>
                        <pre className={'p-4 text-white'}>Form Schema: {stringifiedFormSchema}</pre>
                      </div>
                      <div className={'flex rounded-max bg-slate-600'}>
                        <pre className={'p-4 text-white text-wrap'}>Form UI Schema: {stringifiedFormUiSchema}</pre>
                      </div>
                      {/*<div className={'flex rounded-max bg-slate-600'}>*/}
                      {/*  <pre className={'p-4 text-white'}>Form Data: {stringifiedFormData}</pre>*/}
                      {/*</div>*/}
                      {/*<div className={'flex rounded-max bg-slate-600'}>*/}
                      {/*  <pre className={'p-4 text-white'}>Section Data: {stringifiedSectionData}</pre>*/}
                      {/*</div>*/}
                      {/*<div className={'flex rounded-max bg-slate-600'}>*/}
                      {/*  <pre className={'p-4 text-white'}>Question Data: {stringifiedQuestionData}</pre>*/}
                      {/*</div>*/}
                      {/*<div className={'flex rounded-max bg-slate-600'}>*/}
                      {/*  <pre className={'p-4 text-white'}>Current Question Data: {stringifiedCurrentQuestionData}</pre>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
              </CurrentQuestionContext.Provider>
            </QuestionsContext.Provider>
          </SectionContext.Provider>
        </FormDataContext.Provider>
      </SchemaUIContext.Provider>
    </SchemaContext.Provider>
  );
};
import { materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { AddSection } from '../AddSection';
import { useContext, useMemo, useState } from 'react';
import {
  SchemaContext,
  SchemaUIContext,
  FormDataContext,
  SectionContext,
  QuestionsContext,
  CurrentQuestionContext,
} from '../../context/Contexts';

export const GigaForm = (
  {
    renderers,
    formErrors,
  }: any) => {
  const [formSchema, setFormSchema] = useContext(SchemaContext);
  const [formUiSchema, setFormUiSchema] = useContext(SchemaUIContext);
  const [formData, setFormData] = useContext(FormDataContext);
  const [sectionData, setSectionData] = useContext(SectionContext);
  const [questionData, setQuestionData] = useContext(QuestionsContext);
  const [currentQuestion, setCurrentQuestion] = useContext(CurrentQuestionContext);

  const [isEditingForm, setIsEditingForm] = useState(true);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [isEditingSection, setIsEditingSection] = useState(false);

  const isFormEmpty = useMemo(() => {
    return Object.keys(formData).length === 0;
  }, [formData]);

  const onCancel = () => {
    setIsEditingForm(!isEditingForm);
    setFormData({});
  };

  const onSave = () => {
    setIsEditingForm(!isEditingForm);
    setFormData(formData);
  };

  return (
    <div className={'flex w-full'}>
      {!isEditingForm && isFormEmpty
        ? <div>
          <button
            className={'bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-2 rounded-max w-32'}
            onClick={() => setIsEditingForm(!isEditingForm)}
          >
            <h3>NEW FORM</h3>
          </button>
        </div>

        : <div className={'flex flex-col flex-grow w-full'}>
          {isEditingForm ? <div className={'flex justify-end gap-x-4'}>
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
            </div> :
            <div className={'flex justify-end gap-x-4'}>
              <button
                className={'bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-2 rounded-max w-32'}
                onClick={() => setIsEditingForm(!isEditingForm)}
              >
                <h3>EDIT</h3>
              </button>
            </div>
          }
          <JsonForms
            data={formData}
            schema={formSchema}
            uischema={formUiSchema}
            renderers={renderers}
            additionalErrors={formErrors}
            cells={materialCells}
            onChange={({ data }) => setFormData(data)}
            readonly={!isEditingForm}
            // readonly={true}
          />
          {isEditingForm && !isEditingSection
            ? <div className={'border-2 border-dashed border-slate-500 rounded-md'}>
              <div className={'flex flex-col items-center justify-center w-full'}>
                <button className={'hover:bg-slate-100 w-full h-32 text-slate-700 font-semibold rounded-md'}
                  onClick={() => setIsEditingSection(!isEditingSection)}
                >
                  <h1>+</h1>
                  <h1>Add Section</h1>
                </button>
              </div>
            </div>
            : isEditingSection && <AddSection
            isEditingSection={isEditingSection}
            setIsEditingSection={setIsEditingSection}
          />
          }
        </div>
      }
    </div>
  )
    ;
};
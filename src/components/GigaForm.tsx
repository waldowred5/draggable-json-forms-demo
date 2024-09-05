import { materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { AddSection } from './AddSection';
import { useMemo, useState } from 'react';

export const GigaForm = (
  {
    renderers,
    formSchema,
    setFormSchema,
    formUiSchema,
    setFormUiSchema,
    formData,
    setFormData,
    formErrors,
    sectionData,
    setSectionData,
    questionData,
    setQuestionData,
    currentQuestion,
    setCurrentQuestion,
  }: any) => {
  const [isEditingForm, setIsEditingForm] = useState(false);
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
            className={'bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-2 rounded-md w-32'}
            onClick={() => setIsEditingForm(!isEditingForm)}
          >
            <h3>NEW FORM</h3>
          </button>
        </div>

        : <div className={'flex flex-col flex-grow w-full'}>
          {isEditingForm ? <div className={'flex justify-end gap-x-4'}>
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
            </div> :
            <div className={'flex justify-end gap-x-4'}>
              <button
                className={'bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-2 rounded-md w-32'}
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
          />
          {
            isEditingForm && <AddSection
              formSchema={formSchema}
              setFormSchema={setFormSchema}
              formUiSchema={formUiSchema}
              setFormUiSchema={setFormUiSchema}
              sectionData={sectionData}
              setSectionData={setSectionData}
              isEditingSection={isEditingSection}
              setIsEditingSection={setIsEditingSection}
              questionData={questionData}
              setQuestionData={setQuestionData}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              isEditingQuestion={isEditingQuestion}
              setIsEditingQuestion={setIsEditingQuestion}
            />
          }
        </div>
      }
    </div>
  );
};
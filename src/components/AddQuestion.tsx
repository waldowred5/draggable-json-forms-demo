import initialQuestionSchema from '../schemata/addQuestionSchema.json';
import initialQuestionUiSchema from '../schemata/addQuestionUiSchema.json';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { v7 as uuidv7 } from 'uuid';
import { useContext } from 'react';
import { CurrentQuestionContext, QuestionsContext, SchemaContext, SchemaUIContext } from '../context/Contexts';
import { findAndAddOrRemoveNestedObjectInSchema } from '../utils/findAndAddOrRemoveNestedObjectInSchema';

const initialData = {};

const renderers = [
  ...materialRenderers
  // register custom renderers
];

export const AddQuestion = (
    {
      parentSectionId,
      // formSchema,
      // setFormSchema,
      // formUiSchema,
      // setFormUiSchema,
      isEditingQuestion,
      setIsEditingQuestion
      // questionData,
      // setQuestionData,
      // currentQuestion,
      // setCurrentQuestion
    }: any) => {
    const uuid = `question_${uuidv7()}`;

    const [formSchema, setFormSchema] = useContext(SchemaContext);
    const [formUiSchema, setFormUiSchema] = useContext(SchemaUIContext);
    const [questionsData, setQuestionsData] = useContext(QuestionsContext);
    const [currentQuestion, setCurrentQuestion] = useContext(CurrentQuestionContext);

    const onCancel = () => {
      setCurrentQuestion({});
      setIsEditingQuestion(!isEditingQuestion);
    };

    const onSave = () => {
      const {
        question,
        questionResponseType,
        responseRequired,
        allowAttachments,
        allowAdditionalComments,
        numberOptions,
        numberMinimum,
        numberMaximum,
        numberStep,
        numberDefaultValue
      } = currentQuestion;

      const numberSchemaOptions = {
        type: 'number',
        minimum: numberMinimum,
        maximum: numberMaximum,
        default: numberDefaultValue,
        step: numberStep,
        renderer: numberOptions === 'Slider' ? 'MaterialSliderControl' : 'MaterialNumberControl',
      };

      const questionSchemaOptions = {
        ['Text']: { type: 'string', renderer: 'MaterialTextControl' },
        ['TextArea']: { type: 'string', renderer: 'MaterialTextControl' },
        ['Number']: numberSchemaOptions,
        ['Date']: { type: 'string', renderer: 'MaterialDateControl', format: 'date' },
        ['Boolean']: { type: 'boolean', renderer: 'MaterialBooleanControl' },
        // ['Options']: { type: 'string', renderer: 'MaterialArrayLayout' } // TODO: Add dynamic enum options
      };

      const questionSchema = {
        parentId: parentSectionId,
        ...questionSchemaOptions[questionResponseType],
        allowAttachments,
        allowAdditionalComments
      };

      const requiredProperties = [];

      if (responseRequired) {
        requiredProperties.push(uuid);
      }

      const questionUiSchema = {
        type: 'Control',
        scope: `#/properties/${uuid}`,
        id: uuid,
        label: question,
        options: {
          slider: numberOptions === 'Slider'
        }
      };

      setFormSchema(
        {
          ...formSchema,
          properties: {
            ...formSchema.properties,
            [`${uuid}`]: questionSchema
          },
          required: [...formSchema.required, ...requiredProperties]
        }
      );

      setFormUiSchema(findAndAddOrRemoveNestedObjectInSchema(
        formUiSchema,
        'id',
        parentSectionId,
        'add',
        questionUiSchema
      ));

      setQuestionsData([...questionsData, currentQuestion]);
      setCurrentQuestion({
        question: '',
        questionResponseType: '',
        responseRequired: false,
        allowAttachments: false,
        allowAdditionalComments: false,
        sliderMinimum: 0,
        sliderMaximum: 0,
        sliderStep: 0,
        sliderDefaultValue: 0
      });
      setIsEditingQuestion(!isEditingQuestion);
    };

    return (
      <div className={'flex flex-grow border-2 p-2 rounded-max shadow-lg'}>
        {
          !isEditingQuestion
            ? <div className={'flex flex-col items-start justify-center h-12 w-full'}>
              <button
                className={'flex justify-center items-center hover:bg-slate-100 w-36 h-full text-slate-700 font-semibold rounded-max'}
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
        }
      </div>
    );
  }
;
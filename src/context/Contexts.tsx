import {
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface Schema {
  type: string;
  properties: object;
  required: string[];
}

export const SchemaContext = createContext<
  [Schema, Dispatch<SetStateAction<Schema>>]
>([{ type: 'object', properties: {}, required: [] }, () => {}]);

export const SchemaUIContext = createContext<
  [object, Dispatch<SetStateAction<object>>]
>([{}, () => {}]);

export const FormDataContext = createContext<
  [object, Dispatch<SetStateAction<object>>]
>([{}, () => {}]);

export const SectionContext = createContext<
  [object, Dispatch<SetStateAction<object>>]
>([{}, () => {}]);

export const QuestionsContext = createContext<
  [any[], Dispatch<SetStateAction<any[]>>]
>([[], () => []]);

interface Question {
  question: string;
  questionResponseType: string;
  responseRequired: boolean;
  allowAttachments: boolean;
  allowAdditionalComments: boolean;
  numberOptions: string;
  sliderMinimum: number;
  sliderMaximum: number;
  sliderStep: number;
  sliderDefaultValue: number;
}

export const CurrentQuestionContext = createContext<
  [Question, Dispatch<SetStateAction<Question>>]
>([{}, () => {}]);

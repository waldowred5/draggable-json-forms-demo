import {
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

export const SchemaContext = createContext<
  [object, Dispatch<SetStateAction<object>>]
>([{}, () => {}]);

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
}

export const CurrentQuestionContext = createContext<
  [Question, Dispatch<SetStateAction<Question>>]
>([{}, () => {}]);
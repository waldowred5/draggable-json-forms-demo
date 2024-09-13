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
  [[], Dispatch<SetStateAction<[]>>]
>([[], () => []]);

export const CurrentQuestionContext = createContext<
  [object, Dispatch<SetStateAction<object>>]
>([{}, () => {}]);
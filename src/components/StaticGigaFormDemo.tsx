import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import initialSchema from '../schemata/staticGigaFormSchema.json';
// import initialSchema from '../schemata/basicFormSchema.json';
import initialUiSchema from '../schemata/staticGigaFormUiSchema.json';
// import initialUiSchema from '../schemata/basicFormUiSchema.json';
import ratingControlTester from '../testers/ratingControlTester';
import RatingControl from './RatingControl';
import { sectionLayoutTester } from '../testers/sectionLayoutTester';
import SectionLayout from './renderers/SectionLayout';
import { useMemo, useState } from 'react';

const initialData = {
  likesMovies: false
};

const renderers = [
  ...materialRenderers,
  // register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
  { tester: sectionLayoutTester, renderer: SectionLayout }
];

export const StaticGigaFormDemo = () => {
  const [data, setData] = useState<object>(initialData);
  const [errors] = useState([]);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  return (
    <div className={'flex w-full gap-x-6'}>
      <JsonForms
        data={data}
        schema={initialSchema}
        uischema={initialUiSchema}
        renderers={renderers}
        additionalErrors={errors}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <div className={'flex h-full w-0.5 my-4 bg-slate-200'}></div>
      <div className={'flex flex-col gap-y-4 w-1/2'}>
        <div className={'flex gap-y-4 justify-between'}>
          <h3 className={'font-bold text-3xl'}>Bound data</h3>
          <button
            onClick={() => setData({})}
            className={'bg-red-400 hover:bg-red-500 text-white font-semibold p-2 rounded-max w-[180px]'}
          >
            CLEAR DATA
          </button>
        </div>
        <div className={'flex rounded-max bg-slate-600'}>
          <pre className={'p-4 text-white'}>{stringifiedData}</pre>
        </div>
      </div>
    </div>
  );
};
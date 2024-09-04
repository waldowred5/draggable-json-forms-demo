import { FC, useMemo, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from '../ratingControlTester';
import { sectionLayoutTester } from '../sectionLayoutTester';
import initialSchema from '../schema.json';
import initialUiSchema from '../uischema.json';
import SectionLayout from './SectionLayout';
import { init } from '@jsonforms/core';
import { ControlledJsonForm } from './ControlledJsonForm';
import { AddSection } from './AddSection';

const classes = {
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
};

const initialData = {
  likesMovies: false,
};

const renderers = [
  ...materialRenderers,
  // register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
  { tester: sectionLayoutTester, renderer: SectionLayout },
];

export const JsonFormsDemo: FC = () => {
  const [data, setData] = useState<object>(initialData);
  const [schema, setSchema] = useState(initialSchema);
  const [uiSchema, setUiSchema] = useState(initialUiSchema);
  const [errors, setErrors] = useState([]);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };

  const addSection = ({ label }) => {
    setUiSchema({
      ...uiSchema,
      elements: [
        ...uiSchema.elements,
        {
          "type": "Group",
          "label": label,
          "elements": [],
        },
      ],
    });

    console.log('schema', schema);
  }

  return (
    <Grid
      container
      justifyContent={'center'}
      spacing={1}
      style={classes.container}>
      <Grid item sm={6}>
        <Typography variant={'h4'}>Bound data</Typography>
        <div style={classes.dataContent}>
          <pre id="boundData">{stringifiedData}</pre>
        </div>
        <Button
          style={classes.resetButton}
          onClick={clearData}
          color="primary"
          variant="contained"
          data-testid="clear-data">
          Clear data
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Typography variant={'h4'}>Rendered form</Typography>
        <div style={classes.demoform}>
          <ControlledJsonForm
            data={data}
            schema={schema}
            uischema={uiSchema}
            errors={errors}
            renderers={renderers}
            setData={setData}
          />
          <AddSection onClick={addSection} />
        </div>
      </Grid>
    </Grid>
  );
};

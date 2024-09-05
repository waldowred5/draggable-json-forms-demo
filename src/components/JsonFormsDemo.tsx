import { FC } from 'react';
import { BasicFormDemo } from './BasicFormDemo';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GigaFormDemo } from './GigaFormDemo';

export const JsonFormsDemo: FC = () => {
  return (
    <div className={'m-6 shadow-lg gap-y-4'}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h1 className={'font-bold text-4xl'}>GigaForm™ Demo</h1>
        </AccordionSummary>
        <AccordionDetails>
          <GigaFormDemo />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h1 className={'font-bold text-4xl'}>Basic Form Demo</h1>
        </AccordionSummary>
        <AccordionDetails>
          <BasicFormDemo />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

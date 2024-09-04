import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { MaterialLayoutRenderer } from '@jsonforms/material-renderers';
import Typography from '@mui/material/Typography';

const SectionLayout = (props) => {
  const { uischema, schema, path, visible, renderers } = props;

  const layoutProps = {
    elements: uischema.elements,
    schema,
    path,
    direction: 'column',
    visible,
    uischema,
    renderers
  };

  const onAddClick = () => {
    console.log('onAddClick');
  };

  const onRemoveClick = () => {
    console.log('onRemoveClick');
  };

  return (
    <>
      {props.visible ?
        <div style={{
          height: '100%',
          width: '100%'
        }}>
          <div
            style={{
              border: '2px dashed #cccccc',
              padding: '1em',
              margin: '1em 0',
              width: '100%',
              borderRadius: '0.25em',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Typography>{uischema.label}</Typography>
            <MaterialLayoutRenderer {...layoutProps} />
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}><button onClick={onRemoveClick}>Remove Section</button></div>
          </div>
        </div>
        : null}
    </>
  );
};

// Fast refresh can't handle anonymous components.
const SectionLayoutWithJsonForms = withJsonFormsLayoutProps(SectionLayout);
export default SectionLayoutWithJsonForms;
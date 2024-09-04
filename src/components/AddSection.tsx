export const AddSection = ({ onClick }) => {
  return (
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <button
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            padding: '2em',
          }}
          onClick={() => onClick({ label: 'New Section' })}
        >
          <h1 style={{ margin: '2px' }}>+</h1>
          <h1 style={{ margin: '2px' }}>Add Section</h1>
        </button>
      </div>
    </div>
  );
};
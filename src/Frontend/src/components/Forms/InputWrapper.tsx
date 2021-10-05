interface Props {
  label: string;
  touched?: boolean;
  error?: string;
}

const InputWrapper: React.FC<Props> = ({ label, touched, error, children }) => {
  return (
    <div style={{ marginBottom: 15 }}>
      <label style={{ fontWeight: 500 }}>{label}</label>
      <div style={{ marginTop: 8 }}>{children}</div>
      {touched && error && <div>{error}</div>}
    </div>
  );
};

export default InputWrapper;

import './InputWrapper.css';

interface Props {
  label: string;
  touched?: boolean;
  error?: string;
  required?: boolean;
}

const InputWrapper: React.FC<Props> = ({ label, touched, error, required, children }) => {
  return (
    <div className={`InputWrapper ${error ? 'error' : null}`}>
      <label className="InputWrapper_label">
        {label}
        {required && <span className="InputWrapper_asterisk">*</span>}
      </label>
      <div className="InputWrapper_inputContainer">{children}</div>
      {touched && error && <div className="InputWrapper_error-text">{error}</div>}
    </div>
  );
};

export default InputWrapper;

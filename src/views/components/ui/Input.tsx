import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  required,
  ...rest
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div className={`ui-field ${className}`.trim()}>
      <label htmlFor={inputId} className="ui-field__label">
        {label}
        {required && <span className="ui-field__required" aria-hidden="true"> *</span>}
      </label>
      <input
        id={inputId}
        className={`ui-field__input ${error ? 'ui-field__input--error' : ''}`.trim()}
        aria-invalid={Boolean(error)}
        required={required}
        {...rest}
      />
      {error && <span className="ui-field__error" role="alert">{error}</span>}
      {!error && helperText && <span className="ui-field__helper">{helperText}</span>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  required,
  rows = 4,
  ...rest
}) => {
  const textareaId = id || `textarea-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div className={`ui-field ${className}`.trim()}>
      <label htmlFor={textareaId} className="ui-field__label">
        {label}
        {required && <span className="ui-field__required" aria-hidden="true"> *</span>}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        className={`ui-field__textarea ${error ? 'ui-field__input--error' : ''}`.trim()}
        aria-invalid={Boolean(error)}
        required={required}
        {...rest}
      />
      {error && <span className="ui-field__error" role="alert">{error}</span>}
      {!error && helperText && <span className="ui-field__helper">{helperText}</span>}
    </div>
  );
};


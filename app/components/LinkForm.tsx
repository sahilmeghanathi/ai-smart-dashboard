import React, { useState, useCallback } from 'react';
import { isValidUrl, validateTitle, validateURL } from '@/app/lib/validation';

interface LinkFormData {
  title: string;
  url: string;
}

interface LinkFormErrors {
  title?: string;
  url?: string;
}

interface LinkFormProps {
  onSubmit: (data: LinkFormData) => void;
  isLoading?: boolean;
}

const useFormValidation = () => {
  const [errors, setErrors] = useState<LinkFormErrors>({});

  const clearFieldError = useCallback((fieldName: keyof LinkFormErrors) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: undefined,
    }));
  }, []);

  const validate = (formData: LinkFormData): boolean => {
    const newErrors: LinkFormErrors = {};

    const titleError = validateTitle(formData.title);
    if (titleError) {
      newErrors.title = titleError;
    }

    const urlError = validateURL(formData.url);
    if (urlError) {
      newErrors.url = urlError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, clearFieldError, validate, setErrors };
};

export const LinkForm: React.FC<LinkFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<LinkFormData>({ title: '', url: '' });
  const { errors, clearFieldError, validate, setErrors } = useFormValidation();
  const [apiError, setApiError] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearFieldError(name as keyof LinkFormErrors);
    setApiError(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formData)) return;

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.error || 'Failed to add link');
        return;
      }

      onSubmit(formData);
      setFormData({ title: '', url: '' });
      setErrors({});
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : 'Failed to add link. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Link</h2>

      {apiError && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
          {apiError}
        </div>
      )}

      <FormField
        id="title"
        label="Title"
        name="title"
        placeholder="E.g., Next.js Documentation"
        value={formData.title}
        error={errors.title}
        onChange={handleChange}
        disabled={isLoading}
      />

      <FormField
        id="url"
        label="URL"
        name="url"
        placeholder="E.g., https://nextjs.org"
        value={formData.url}
        error={errors.url}
        onChange={handleChange}
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Adding...' : 'Add Link'}
      </button>
    </form>
  );
};

interface FormFieldProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  name,
  placeholder,
  value,
  error,
  onChange,
  disabled = false,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 ${
        error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
  </div>
);

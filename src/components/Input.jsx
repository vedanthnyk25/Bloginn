import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-gray-700 dark:text-gray-300"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300 ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;

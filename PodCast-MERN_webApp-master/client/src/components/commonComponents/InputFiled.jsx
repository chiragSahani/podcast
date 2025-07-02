const InputField = ({ label, id, value, onChange, error, helperText }) => (
   
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 font-roboto font-semibold">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );

  export default InputField
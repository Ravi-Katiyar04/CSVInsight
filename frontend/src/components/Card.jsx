
import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Card = ({ employee: initialEmployee, headers }) => {
  const [employee, setEmployee] = useState({});
  const [formData, setFormData] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    setEmployee(initialEmployee);
  }, [initialEmployee]);

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to edit this data?')) {
      setFormData(employee); // Set current employee data into form
      setShowEdit(true);
    }
  };

  const handleClickOutside = useCallback((event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowEdit(false);
    }
  }, []);

  useEffect(() => {
    if (showEdit) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEdit, handleClickOutside]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/edit`,
        formData
      );
      if (response.status === 200) {
        setEmployee(formData); // Update local view
        setShowEdit(false);
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
    setLoading(false);
  };

  return (
    <div
      ref={formRef}
      className={`relative bg-white border border-gray-200 rounded-lg shadow-lg p-4 ${
        showEdit ? '' : 'hover:shadow-3xl hover:scale-105 transition-transform duration-300 '
      }`}
    >
      <div className="p-4">
        {headers.map((field, index) => (
          <p key={index} className="text-gray-600 mt-2">
            {field} : {employee[field]}
          </p>
        ))}
      </div>
      <div className="p-4 flex justify-end">
        <button
          className="px-2 py-1 border-2 border-black rounded-lg hover:bg-gray-200"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>

      {showEdit && (
        <div className="absolute inset-0 bg-white bg-opacity-70 z-50 flex justify-center items-center p-4">
          <form
            ref={formRef}
            onSubmit={handleSave}
            className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Edit</h2>
            {headers.map((field, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  employee: PropTypes.object.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;



import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from './firebase';

const Policy = ({ }) => {
  const [terms, setTerms] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'policy'), { terms });
      console.log('Document written with ID: ', docRef.id);
      // Reset the terms input after successful submission
      setTerms('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">PRIVACY POLICY</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border rounded p-2 mb-4 max-h-100"
            placeholder="Enter Privacy and policy..."
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Policy;

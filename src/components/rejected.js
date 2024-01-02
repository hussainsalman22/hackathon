import React from "react";
import { useState, useEffect } from "react";
import {db} from './firebase'
import {deleteDoc, collection, getDocs,getDoc, doc , setDoc } from 'firebase/firestore';





export default function Rejected(){
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestdata = await getDocs (collection(db, 'rejected'));
        
        
        const items = requestdata.docs.map((doc) => ({...doc.data(),id: doc.id}));
        
        setData(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    return(
        <>
        <div className="overflow-x-auto">
        <table className="min-w-max mx-auto bg-white border border-gray-200 shadow-md rounded-xl">
          {/* Table header */}
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">CNIC</th>
              <th className="px-4 py-2">Request</th>
              <th className="px-4 py-2">Status</th>
              
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2">{row.cnic}</td>
                <td className="border px-4 py-2">{row.request}</td>
                <td className="border px-4 py-2">{row.status}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    )
}
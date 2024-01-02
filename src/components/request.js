import React, { useState, useEffect } from 'react';
import {db} from './firebase'; // Import your configured Firestore instance
import { CollectionReference, updateDoc } from 'firebase/firestore';
import {deleteDoc, collection, getDocs,getDoc, doc , setDoc } from 'firebase/firestore';

const request = () => {
  const [data, setData] = useState([]);
  const [length , setlength] = useState()
  const [acceptdata,setacceptdata]=useState([])
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestdata = await getDocs (collection(db, 'request'));
        // console.log(requestdata.length())
        // const snapshot = await db.collection('request').get();
        
        const items = requestdata.docs.map((doc) => ({...doc.data(),id: doc.id}));
        setlength(items.length)
        setData(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (id) => {
    try {
     const requestdata= doc(db,'request',id);
    
      await updateDoc(requestdata,{
        status:"accepted"
      })

      
    

      const docRef = doc(db, "request",id);
      console.log(docRef)
      const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
       const  accepteddata=docSnap.data()
       const arrayaccept = [accepteddata]
       console.log(arrayaccept)
       const mappedArray = arrayaccept.map(item => ({
        cnic: item.cnic,
        name: item.name,
        status: item.status,
        request: item.request
        
      }));
      const Cnic = mappedArray[0].cnic
      const name = mappedArray[0].name
      const status = mappedArray[0].status
      const request= mappedArray[0].request

      
    
      await setDoc(doc(db, "accepted", id), {
        cnic:Cnic,
        name:name,
        status:status,
        request:request
        

      });
       

      await deleteDoc(doc(db, "request", id));

      window.location.reload(false);

    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const requestdata= doc(db,'request',id);
     
       await updateDoc(requestdata,{
         status:"rejected"
       })
 
       
     
 
       const docRef = doc(db, "request",id);
       console.log(docRef)
       const docSnap = await getDoc(docRef);
         console.log(docSnap.data());
        const  accepteddata=docSnap.data()
        const arrayaccept = [accepteddata]
        console.log(arrayaccept)
        const mappedArray = arrayaccept.map(item => ({
         cnic: item.cnic,
         name: item.name,
         status: item.status,
         request: item.request
         
       }));
       const Cnic = mappedArray[0].cnic
       const name = mappedArray[0].name
       const status = mappedArray[0].status
       const request= mappedArray[0].request
 
       
     
       await setDoc(doc(db, "rejected", id), {
         cnic:Cnic,
         name:name,
         status:status,
         request:request
         
 
       });
        
 
       await deleteDoc(doc(db, "request", id));
 
       window.location.reload(false);
 
     } catch (error) {
       console.error('Error updating status:', error);
     }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-max mx-auto bg-white border border-gray-200 shadow-md rounded-xl">
        {/* Table header */}
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">CNIC</th>
            <th className="px-4 py-2">Request</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
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
              <td className="border px-4 py-2">
                {row.status === 'pending' && (
                  <div>
                    <button
                      onClick={() => handleAccept(row.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(row.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default request;

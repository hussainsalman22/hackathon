import React, { useState, useEffect } from 'react';
import { storage } from './firebase';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { getStorage, ref, listAll } from "firebase/storage";

export function Getpost() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const storage = getStorage();
  useEffect(() => {
    // const storage = firebase.storage();
    // const storageRef = storage.ref(); 
    const imagesRef = ref(storage, 'imagesfiles/');

    // Fetching images
    // const imagesRef = storageRef.child('imagesfiles/'); // Replace with your images folder path
    listAll(imagesRef)
      .then((res) => {
        const imageUrls = res.items.map((item) => ({
          name: item.name,
          url: getDownloadURL(item),
        }));
        console.log(res.items)
        // console.log(url)

        Promise.all(imageUrls.map((item) => item.url))
          .then((urls) => {
            setImages(urls);
          })
          .catch((error) => {
            console.error('Error fetching image URLs:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });

    // Fetching videos
    const videosRef = ref(storage, 'videofiles/');
    // Replace with your videos folder path
    listAll(videosRef)
      .then((res) => {
        const videoUrls = res.items.map((item) => ({
          name: item.name,
          url:getDownloadURL(item),
        }));
        Promise.all(videoUrls.map((item) => item.url))
          .then((urls) => {
            setVideos(urls);
          })
          .catch((error) => {
            console.error('Error fetching video URLs:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  return (
    <div>
     <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} className=" max-w-full h-auto rounded-lg shadow-md " />
        ))}
      </div>
      </div>

   
     <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((videoUrl, index) => (
          <video key={index} controls style={{ maxWidth: '200px', margin: '5px' }}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
      </div>
    </div>
  );
};
function PostForm() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageStorageRef = sRef(storage, `imagesfiles/${image.name}`);
    await uploadBytes(imageStorageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url);
          })
          .catch((e) => { });
      })
      .catch((e) => { });
      console.log(video)
    if (video == null) { } else {
      const videoStorageRef = sRef(storage, `videofiles/${video.name}`);
      await uploadBytes(videoStorageRef, video)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              console.log(url);
            })
            .catch((e) => { });
        })
        .catch((e) => { });
      alert("uploaded")
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-screen-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          className="w-full border rounded-md py-2 px-3 mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
          className="w-full border rounded-md py-2 px-3 mb-4"
        />
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="w-full border rounded-md py-2 px-3 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
      <Getpost />
    </>
  );


}





export default PostForm;

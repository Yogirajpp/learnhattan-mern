import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';

const Dashboard = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [desData, setDesData] = useState({
    description: '',
    interests: '',
    selectedFile: ''
  });
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/dashboard/user/65edca9c4b469368bfd79317`);
        const data = await response.json();
        setIsFilled(data.isFilled);
        if (data.isFilled) {
          setDesData({
            description: data.description,
            interests: data.interests ? data.interests.join(', ') : '',
            selectedFile: data.selectedFile
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/api/dashboard/user/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: "65edca9c4b469368bfd79317", ...desData })
      });
      setIsFilled(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/dashboard/user/display/65edca9c4b469368bfd79317`);
        const data = await response.json();
        setDisplayData(
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center h-full">
            <p className="text-lg font-semibold mb-4 text-black">Your information:</p>
            <img src={data.selectedFile} alt="profileImg" className='w-20 h-20 rounded-full' />
            <p className="mb-2 text-black"><strong>Description:</strong> {data.description}</p>
            <p className="mb-2 text-black"><strong>Interests:</strong> {data.interests}</p>
          </div>
        );
      } catch (err) {
        console.error(err);
      }
    }
    if (isFilled) {
      fetchDescription();
    }
  }, [isFilled]);

  const handleChange = (e, field) => {
    if (field === 'interests') {
      const interestsArray = e.target.value.split(',').map((interest) => interest.trim());
      setDesData((prevData) => ({
        ...prevData,
        [field]: interestsArray
      }));
    } else {
      setDesData((prevData) => ({
        ...prevData,
        [field]: e.target.value
      }));
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      {displayData ? (
        displayData
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md text-black">
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => setDesData({ ...desData, selectedFile: base64 })}
          />
          <input type="text" value={desData.description} onChange={(e) => handleChange(e, 'description')} placeholder="Description" className="w-full p-2 mb-4 border border-gray-300 rounded-md" />
          <input type="text" value={desData.interests} onChange={(e) => handleChange(e, 'interests')} placeholder="Interests" className="w-full p-2 mb-4 border border-gray-300 rounded-md" />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Dashboard;

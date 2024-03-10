import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagsInput from '../components/TagsInput/TagsInput';
import axios from 'axios'; // Import Axios for making HTTP requests
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [interests, setInterests] = useState([]);

  const SignOut = () => {
    // Functionality to sign out user
    navigate('/');
  };

  const handleFileChange = (e) => {
    // Functionality to handle file change
    const selectedFile = e.target.files[0];
    setPhoto(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call your backend API to update user data
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('username', username);
      formData.append('description', description);
      formData.append('interests', interests.join(','));

      const response = await axios.post('http://localhost:8080/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Data added/updated successfully:', response.data);
      alert('Data added/updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding/updating user data:', error.message);
    }
  };

  return (
    <div className="procontainer">
      <form onSubmit={handleSubmit} className="proformContainer">
        <div className="prophotoContainer">
          <label className="prolabel">Photo:</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {photo && <img src={photo} alt="Preview" className="prophotoPreview" />}
        </div>
        <div>
          <label className="prolabel">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="proinputField"
            required
          />
        </div>
        <div>
          <label className="prolabel">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="protextareaField"
            required
          />
        </div>
        <div>
          <label className="prolabel">Skills:</label>
          <TagsInput tags={interests} onChange={setInterests} placeholder="Add Skills" className="protagsInput" />
        </div>
        <div>
          <button type="submit" className="probutton">
            Complete form
          </button>
        </div>
        <div onClick={SignOut}>
          <button type="button" className="probutton">
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

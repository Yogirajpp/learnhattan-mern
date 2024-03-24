import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagsInput from '../components/TagsInput/TagsInput';
import axios from 'axios'; // Import Axios for making HTTP requests
import './Profile.css';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import Sidebar from '../components/Sidebar';

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
    // <div className="procontainer">
    //   <form onSubmit={handleSubmit} className="proformContainer">
    //     <div className="prophotoContainer">
    //       <label className="prolabel">Photo:</label>
    //       <input type="file" onChange={handleFileChange} accept="image/*" />
    //       {photo && <img src={photo} alt="Preview" className="prophotoPreview" />}
    //     </div>
    //     <div>
    //       <label className="prolabel">Username:</label>
    //       <input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         className="proinputField"
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label className="prolabel">Description:</label>
    //       <textarea
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         className="protextareaField"
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label className="prolabel">Skills:</label>
    //       <TagsInput tags={interests} onChange={setInterests} placeholder="Add Skills" className="protagsInput" />
    //     </div>
    //     <div>
    //       <button type="submit" className="probutton">
    //         Complete form
    //       </button>
    //     </div>
    //     <div onClick={SignOut}>
    //       <button type="button" className="probutton">
    //         Sign Out
    //       </button>
    //     </div>
    //   </form>
    // </div
    <>


      <Sidebar />
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-xl mx-auto my-4 shadow-xl rounded-xl  mt-20">
          <CardHeader>
            <CardTitle className="text-2xl">Profile</CardTitle>
            <CardDescription>Update your profile information below.</CardDescription>
          </CardHeader>
          <CardHeader>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex  space-y-1.5">
                <Label className="m-0" htmlFor="file">
                  <div className="flex items-center justify-center space-x-2 cursor-pointer">
                    <Avatar className="w-20 h-20">
                      {photo && <img src={photo} alt="Preview" className=" w-full rounded-full" />}
                    </Avatar>
                    <span className="font-medium rounded-xl" variant="outline">Upload Photo </span>
                  </div>
                </Label>

              </div>
              <div className="grid gap-0.5">
                <input accept=".jpg, .png, .jpeg" className="hidden" id="file" type="file" onChange={handleFileChange} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username " type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>

            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea className="min-h-[100px]" id="description" placeholder="Something  about yourself" value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Skills</Label>
              <TagsInput tags={interests} onChange={setInterests} placeholder="React, Java, Python" />
            </div>
            <div className="space-y-2">
              <Label>Links</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" placeholder="https://twitter.com/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input id="github" placeholder="https://github.com/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Save</Button>
          </CardFooter>
        </Card>
      </form>

    </>
  );
};

export default Profile;

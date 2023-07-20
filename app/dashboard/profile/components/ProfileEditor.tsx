import { Card, CardContent, CardDescription } from '@/components/ui/card';
import React, { useState } from 'react';
// Import the appropriate type for ProfileData
import {
  Button,
  Dialog,

  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,

  Textarea,
} from "@material-tailwind/react";
import { Label } from '@/components/ui/label';


interface ProfileEditorProps {
  coverImageUrl: string;
  onSave: (updatedData: UserData) => Promise<void>;
  onCancel: () => void;
  id: string;
  name: string;
  email: string;
  prefs: {
    bio: string;
    avatarUrl: string;
    coverPhotoUrl: string;
    phoneNumber: string;
    country: string;
    countryFlagEmoji: string;
    profileImage: string;


  };
  status: boolean;
  registration: string;
  emailVerification: boolean;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({
  coverImageUrl,
  onSave,
  onCancel,
  id,
  name,
  email,
  prefs,
  status,

  registration,
  emailVerification,
}) => {
  const [editedData, setEditedData] = useState<UserData>({
    id,
    name,
    email,
    prefs,
    status,
    registration,
    emailVerification,

  });
  const [open, setOpen] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<File | undefined>(); // New state for the cover photo file
  // Function to handle changes in the input fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditedData((prevData: UserData) => ({
      ...prevData,
      prefs: {
        ...prevData.prefs,
        [name]: value,
  
      },
    }));
  };
  
    // Function to handle cover photo selection
  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCoverImageFile(event.target.files[0]);
    }
  };


  // Function to handle the form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSave(editedData); // Call the onSave function with the updated data
  };


  return (
    <>
      <div className='space-y-6'>

        <img src={coverImageUrl} alt="Cover" className='w-full h-64 object-cover rounded-lg' />
      
        <Card className='max-w-3xl mx-auto '>
          <form onSubmit={handleSubmit} className='mt-6'>

            <CardContent className='space-y-4'>
              <div>
                <Label>
                  Name:
                </Label>
                <Input type="text" name="name" value={editedData.name} onChange={handleChange} />
              </div>
              <div>
                <Label>
                  Phone:
                </Label>
                <Input type="tel" name="phoneNumber" value={editedData.prefs.phoneNumber} onChange={handleChange} />
              </div>
              <div>
                <Label>
                  Bio:
                </Label>
                <Textarea name="bio" value={editedData.prefs.bio} onChange={handleChange} />
              </div>
              <div>
              <Label>Change Cover Photo:</Label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                
              />
            </div>
            </CardContent>
            <CardFooter className='flex gap-4 justify-between'>

              <Button type="button" color='red' onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </CardFooter>
          </form>
        </Card>

      </div>



    </>
  );
};

export default ProfileEditor;

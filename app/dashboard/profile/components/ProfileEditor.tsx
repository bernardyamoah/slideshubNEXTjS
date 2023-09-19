import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React, {  useState } from 'react';
import { Label } from '@/components/ui/label';
import { ID, storage } from '@/appwrite';
import { extractIdFromUrl } from '@/lib/functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
    profileImageId: string;
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
  const [coverImageFile, setCoverImageFile] = useState<File | undefined>();
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);





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

  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCoverImageFile(event.target.files[0]);
    }
  };

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (profileImageFile) {
      try {
        // Upload the profile image to Appwrite Storage
        const storageFile = await storage.createFile(
          process.env.NEXT_PUBLIC_USER_PROFILE_IMAGES_ID!,
          ID.unique(),
          profileImageFile
        );

        // Get the URL of the uploaded file
        const profileImageId = storageFile.$id;
        const profileImageUrl = await storage.getFilePreview(
          process.env.NEXT_PUBLIC_USER_PROFILE_IMAGES_ID!,
          profileImageId
        );

        // Update the profileImage in the editedData state
        setEditedData((prevData: UserData) => ({
          ...prevData,
          prefs: {
            ...prevData.prefs,
            profileImageId: profileImageId.toString(), // Store the profileImageID in the prefs
            profileImage: profileImageUrl.href.toString(), // Assign the image URL to the profileImage pref
          },
        }));
        console.log("Profile image uploaded successfully");
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    } else if (prefs.profileImage && !prefs.profileImageId) {
      // If the profileImageId is not provided but profileImage URL is available, extract the ID
      const profileImageId = extractIdFromUrl(prefs.profileImage);

      if (profileImageId) {
        // Update the profileImageId in the editedData state
        setEditedData((prevData: UserData) => ({
          ...prevData,
          prefs: {
            ...prevData.prefs,
            profileImageId: profileImageId, // Store the profileImageID in the prefs
          },
        }));
      }
    }

    // Call the onSave function with the updated data
    await onSave(editedData);
  };

  return (
    <>
      <div className='space-y-6'>
        {/* <Image src={coverImageUrl} alt="Cover Image" className='object-cover w-full h-64 rounded-lg' /> */}

        <Card className='max-w-3xl mx-auto '>
          <form onSubmit={handleSubmit} className='mt-6'>
            <CardContent className='space-y-4'>
              <div>
                <Label>Name:</Label>
                <Input type="text" name="name" value={editedData.name} onChange={handleChange} />
              </div>
              <div>
                <Label>Phone:</Label>
                <Input type="tel" name="phoneNumber" value={editedData.prefs.phoneNumber} onChange={handleChange} />
              </div>
              <div>
                <Label>Bio:</Label>
                <Textarea name="bio" value={editedData.prefs.bio} onChange={handleChange} />
              </div>
              <div>
                <Label>Change Cover Photo:</Label>
                <input type="file" accept="image/*" onChange={handleCoverPhotoChange} />
              </div>
              <div>
                <Label>Change Profile Photo:</Label>
                <input type="file" accept="image/*" onChange={handleProfilePhotoChange} />
              </div>
            </CardContent>
            <CardFooter className='flex justify-between gap-4'>
              <Button type="button"  onClick={onCancel}>
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

'use client'
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  
  Textarea,
} from "@material-tailwind/react";
import { CheckCircle, CheckIcon, Edit, XCircle } from "lucide-react";

import { getCurrentUser, getUserInitials } from "@/lib/functions";
import { Badge } from "@/components/ui/badge";

interface UserData {
  name: string;
  email: string;
  bio: string;
  coverPhotoUrl: string;
  avatarUrl: string | null;
  status:string;
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    email: "john@example.com",
    bio: "Hello, I'm John! I love coding and building cool things with React.",
    coverPhotoUrl: "https://images.unsplash.com/photo-1689464090276-50bed9a6798f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    avatarUrl: "https://avatars.githubusercontent.com/u/8186664?v=4",
    status:'',
  });
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setEditing(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false);
  };

  const handleEditProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Update user data in the database or API here
    const formData = new FormData(event.currentTarget);
    const updatedUserData: UserData = {
      ...userData,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      bio: formData.get("bio") as string,
    };
    // Update user data in the database or API here
    // For now, let's just update the state to simulate the update
    setUserData(updatedUserData);
    setEditing(false);
  };

  useEffect(() => {
// getCurrentUser().then((user) => {
//       if (user) {
//         const initialsUrl = getUserInitials(user?.name);
//         setUserData((prevUserData) => ({
//           ...prevUserData,
//           name: user.name,
//           email: user.email,
//           avatarUrl: initialsUrl,
          
//         }));
//       }
//     });
async function fetchData() {
  const currentUser = await getCurrentUser();
  console.log("🚀 ~ file: page.tsx:82 ~ fetchData ~ currentUser:", currentUser)
  if (currentUser) {
    const initialsUrl = await getUserInitials(currentUser?.name);
    setUserData((prevUserData) => ({
      ...prevUserData,
      name: currentUser.name,
      email: currentUser.email,
      avatarUrl: initialsUrl ,
      status: currentUser.status.toString(),
    }));
  }
}

fetchData();
    
  }, []);
    // Check if user data is available
    if (!userData) {
      return <div>Loading...</div>;
    }
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 gap-4">
      {/* Cover Photo */}
      <img
        src={userData.coverPhotoUrl}
        alt="Cover Photo"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      {/* Avatar */}
    

      <label htmlFor="avatar" className="cursor-pointer">
        <img
          src={userData.avatarUrl || "https://avatars.githubusercontent.com/u/8186664?v=4"}
          alt="Avatarf"
          className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg mx-auto -mt-10"
        />
      </label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            // You can now upload the file to your server and get the URL of the uploaded image
            const avatarUrl = URL.createObjectURL(file);
            setUserData((prevUserData) => ({ ...prevUserData, avatarUrl }));
          }
        }}
        className="hidden"
      />

      {/* User Info */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
        <p className="text-gray-600 mb-1">{userData.email}</p>
        {userData.status ? (
       <Badge className="mb-4  inline-flex items-center">
        Verified
      <CheckIcon className="ml-1 h-4 w-4" strokeWidth={2.5} />
     </Badge>
      ) : (
      
        <Badge className="mb-4  inline-flex items-center">
        Verified
        <XCircle className="ml-1 h-4 w-4 text-red-500" />
     </Badge>
      )}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4  dark:bg-gray-800">
        <p>{userData.bio}</p>
      </div>

      {/* Edit Profile button */}
      <Button
        variant="gradient"
        onClick={handleOpen}
        className="block mx-auto px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Edit />
      </Button>

      {/* Dialog */}
      <Dialog
        
        open={open}
        handler={handleClose}
        className="bg-transparent shadow-none  w-full max-w-4xl p-2"
      >
        <Card className="mx-auto w-full max-w-xl">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Edit Profile
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={handleEditProfile} className="space-y-4">
              <Input label="Name" size="lg" defaultValue={userData.name} name="name" />
              <Input label="Email" size="lg" defaultValue={userData.email} name="email" />
              <Textarea label="Bio" size="lg" defaultValue={userData.bio} name="bio" />
            
              <CardFooter className="pt-0">
                <Button variant="gradient" type="submit" fullWidth>
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </CardBody>
        </Card>
      </Dialog>
    </div>
  );
};

export default ProfilePage;

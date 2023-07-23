"use client";
import React from "react";
import { storage, ID } from "@/appwrite";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { UploadProgress } from "appwrite";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createCampus } from "@/lib/functions";
import { Progress } from "@/components/ui/progress";
import toast, { Toaster } from "react-hot-toast";
import { Step, Stepper } from "@material-tailwind/react";
import { File, Info } from "lucide-react";
import DocumentUpload from "./document-upload";
export default function AddCampus() {
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [imageFile, setImageFile] = useState<File | null>(null);

	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [activeStep, setActiveStep] = React.useState(0);
	const [isLastStep, setIsLastStep] = React.useState(false);
	const [isFirstStep, setIsFirstStep] = React.useState(false);
	const [currentFile, setCurrentFile] = useState<File | null>(null);
	const handleProgress = (progressEvent: UploadProgress) => {
		const uploadprogress = Math.round(
			(progressEvent.chunksUploaded * 100) / progressEvent.chunksTotal
		);
		console.log(uploadprogress);
		setUploadProgress(uploadprogress);
	};

	// handle upload progress
	const handleImageUpload = async () => {
		if (imageFile) {
			try {
				const file = imageFile;
				const uploader = await toast.promise(
					storage.createFile(
						process.env.NEXT_PUBLIC_CAMPUS_IMAGES_ID!,
						ID.unique(),
						file,
						undefined,
						handleProgress
						//   (progress:UploadProgress)  => {
						// 	// Update the progress bar with the progress value (0-100)
						// 	const uploadprogress = Math.round((progress.chunksUploaded * 100) / progress.chunksTotal);
						// 	console.log('Upload progress:', uploadprogress);
						// 	return uploadprogress
						// 	setUploadProgress(uploadprogress);
						//   }
					),
					{
						loading: "Uploading file",
						success: "image uploaded! 🎉",
						error: "Not authorized",
					}
				);

				const fileId = uploader.$id;
				const fileResponse = await storage.getFileView(
					process.env.NEXT_PUBLIC_CAMPUS_IMAGES_ID!,
					fileId
				);
				const imageUrl = fileResponse.toString();

				return imageUrl;
			} catch (error) {
				throw error;
			}
		}

		return "";
	};
	// Handle image change
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();

			reader.readAsDataURL(file);
		} else {
			setImageFile(null);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const imageUrl = await handleImageUpload();
			const campusData: CampusData = {
				name,
				location,
				image: imageUrl,
			};
			const response = await createCampus(campusData);

			// Reset form fields
			setName("");
			setImageFile(null);

			setLocation("");

			// Handle success or navigate to another page
		} catch (error) {
			console.error("Error creating program:", error);
			// Handle error
		}
	};
	const handleNext = (event: React.FormEvent) => {
		event.preventDefault();
		if (!isLastStep) {
			setActiveStep((currentStep) => currentStep + 1);
			setIsFirstStep(false);
		}
	};

	const handlePrev = (event: React.FormEvent) => {
		event.preventDefault();
		if (!isFirstStep) {
			setActiveStep((currentStep) => currentStep - 1);
			setIsLastStep(false);
		}
	};

	return (
		<>
			<div className="max-w-3xl mx-auto w-full ">
				<form onSubmit={handleSubmit}>
					<div className="grid w-full items-center gap-6">
						{activeStep === 0 && (
							<>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="name">Campus Name</Label>
									<Input
										id="name"
										placeholder="University of Ghana"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="name">Location</Label>
									<Input
										id="location"
										placeholder="Legon"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
									/>
								</div>
							</>
						)}

						{activeStep === 1 && (
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="picture">Picture</Label>
								<DocumentUpload
									currentFile={currentFile}
									setCurrentFile={setCurrentFile}
								/>
							</div>
						)}

						<div className="w-full py-4 px-8">
							<div className="mt-16 flex justify-between">
								<Button
									type="button"
									onClick={handlePrev}
									disabled={isFirstStep}
								>
									Prev
								</Button>
								{isLastStep ? (
									<Button type="submit">Submit</Button>
								) : (
									<Button type="button" onClick={handleNext}>
										Next
									</Button>
								)}
							</div>
						</div>
					</div>
				</form>
				<div className="max-w-sm mx-auto py-4 relative bottom-4 mt-10 text-sm">
					<Stepper
						activeStep={activeStep}
						isLastStep={(value) => setIsLastStep(value)}
						isFirstStep={(value) => setIsFirstStep(value)}
					>
						<Step onClick={() => setActiveStep(0)}>
							<Info className="h-5 w-5" />
							<div className="absolute -bottom-[2.5rem] w-max text-center text-sm">
								<p
									className={
										activeStep === 0 ? "text-blue-500" : "text-gray-500"
									}
								>
									Details
								</p>
							</div>
						</Step>
						<Step onClick={() => setActiveStep(1)}>
							<File className="h-5 w-5" />
							<div className="absolute -bottom-[2.5rem] w-max text-center text-sm">
								<p
									className={
										activeStep === 1 ? "text-blue-500" : "text-gray-500"
									}
								>
									File
								</p>
							</div>
						</Step>
					</Stepper>
				</div>

				{uploadProgress > 0 && (
					<CardFooter className="flex justify-between">
						<div className="w-full space-y-2">
							<div>Upload Progress: {uploadProgress}%</div>
							<Progress value={uploadProgress} />
						</div>
					</CardFooter>
				)}
			</div>

			<Toaster />
		</>
	);
}

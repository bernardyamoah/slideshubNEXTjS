'use client'
import { useState } from 'react';
import { createProgram } from '@/lib/createProgram';



export default function ProgramForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [programId, setProgramId] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const programData: ProgramData = {
        name,
        description,
        duration,
		programId
      };
      const response = await createProgram(programData);
      console.log('Program created:', response.$id);

      // Reset form fields
      setName('');
      setDescription('');
      setDuration('');

      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error creating program:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Program Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Duration (in years):
        <input type="text" value={duration} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
	  <label>
        Progrm id:
        <input type="text" value={programId} onChange={(e) => setProgramId(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Program</button>
    </form>
  );
}

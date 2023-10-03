'use client'
import { getProgramDetails } from "@/lib/functions";
import { useEffect, useState } from "react";

const ProgramDetails = ({ programId }) => {
  const [program, setProgram] = useState<{ campusId: any; name: any; } | null>(null);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await getProgramDetails(programId);
        setProgram(response);
      } catch (error) {
        console.error('Error fetching program details:', error);
      }
    };

    fetchProgramDetails();
  }, [programId]);

  if (!program) {
    return <div>Loading program details...</div>;
  }

  return (
    <>
      <div>
        <h1>{program.name}</h1>
      </div>
    </>
  );
};

export default ProgramDetails;
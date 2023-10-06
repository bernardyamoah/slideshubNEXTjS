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
    return null;
  }

  return (
    <>
      <div className="text-center max-w-4xl mx-auto mb-6">
        <h1>{program.name}</h1>
      </div>
    </>
  );
};

export default ProgramDetails;
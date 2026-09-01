import { FormValues } from "@/components/case-form/CaseForm";

export const addCase = async (caseData: FormValues) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/case`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caseData),
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding case:", error);
    throw error;
  }
};

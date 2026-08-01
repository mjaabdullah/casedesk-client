import { CaseForm } from "@/components/case-form/CaseForm";
import { Container } from "@/components/common/Container";

const mockCase: {
  caseTitle: string;
  subject: string;
  caseType: string;
  ourSide: string;
  status: string;
  filingDate: string;
  plaintiffs: Array<{
    id: string;
    number: string;
    name: string;
    relationshipType: "Father" | "Husband";
    relationshipName: string;
    address: string;
    phone: string;
  }>;
  defendants: Array<{
    id: string;
    number: string;
    name: string;
    relationshipType: "Father" | "Husband";
    relationshipName: string;
    address: string;
    phone: string;
  }>;
  courts: Array<{
    id: string;
    courtName: string;
    caseNumber: string;
    judgeName: string;
    transferDate: string;
    currentCourt: boolean;
  }>;
  legalSections: Array<{
    id: string;
    actName: string;
    sectionNumbers: string;
  }>;
  relatedCases: Array<{
    id: string;
    relationType: string;
    relatedCaseNumber: string;
    courtName: string;
    notes: string;
  }>;
} = {
  caseTitle: "Commercial Dispute Resolution",
  subject: "Breach of contract",
  caseType: "civil",
  ourSide: "defendant",
  status: "in-progress",
  filingDate: "2025-01-14",
  plaintiffs: [
    {
      id: "pl-1",
      number: "1",
      name: "Ayesha Khan",
      relationshipType: "Father",
      relationshipName: "Abdul Karim",
      address: "House 12, Gulberg",
      phone: "+92 300 1111111",
    },
    {
      id: "pl-2",
      number: "3",
      name: "M. Ali",
      relationshipType: "Husband",
      relationshipName: "Mohammad Ali",
      address: "Lane 8, DHA",
      phone: "+92 300 2222222",
    },
  ],
  defendants: [
    {
      id: "df-1",
      number: "1",
      name: "Nadia Shah",
      relationshipType: "Father",
      relationshipName: "Shabir Khan",
      address: "Block B, Clifton",
      phone: "+92 300 3333333",
    },
    {
      id: "df-2",
      number: "2",
      name: "Zahid Mir",
      relationshipType: "Husband",
      relationshipName: "Noman Shah",
      address: "Street 4, Model Town",
      phone: "+92 300 4444444",
    },
  ],
  courts: [
    {
      id: "court-1",
      courtName: "District Court Lahore",
      caseNumber: "1234/2025",
      judgeName: "Hon. A. Qureshi",
      transferDate: "2025-02-10",
      currentCourt: true,
    },
    {
      id: "court-2",
      courtName: "High Court Lahore",
      caseNumber: "5678/2025",
      judgeName: "Hon. S. Malik",
      transferDate: "2025-03-01",
      currentCourt: false,
    },
  ],
  legalSections: [
    {
      id: "legal-1",
      actName: "Civil Procedure Code",
      sectionNumbers: "12, 18",
    },
    { id: "legal-2", actName: "Evidence Act", sectionNumbers: "45" },
  ],
  relatedCases: [
    {
      id: "related-1",
      relationType: "appeal",
      relatedCaseNumber: "910/2025",
      courtName: "Supreme Court",
      notes: "Pending review",
    },
    {
      id: "related-2",
      relationType: "revision",
      relatedCaseNumber: "812/2025",
      courtName: "High Court",
      notes: "Awaiting hearing",
    },
  ],
};

export default function EditCasePage() {
  return (
    <Container className="py-8">
      <CaseForm mode="edit" initialValues={mockCase} />
    </Container>
  );
}

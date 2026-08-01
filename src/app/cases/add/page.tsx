import { CaseForm } from "../../components/case-form/CaseForm";
import { Container } from "../../components/common/Container";

export default function AddCasePage() {
  return (
    <Container className="py-8">
      <CaseForm mode="add" />
    </Container>
  );
}

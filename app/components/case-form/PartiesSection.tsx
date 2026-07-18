import { Trash2, UserRound } from "lucide-react";
import { AppInput } from "../shared/AppInput";
import { FormSection } from "./FormSection";
import { RelationshipNameField } from "./RelationshipNameField";
import { SectionHeader } from "./SectionHeader";

export function PartiesSection({
  plaintiffs,
  defendants,
  register,
  errors,
  addParty,
  removeParty,
  nextPartyNumber,
  setValue,
}: {
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
  register: any;
  errors: any;
  addParty: (role: "plaintiff" | "defendant") => void;
  removeParty: (role: "plaintiff" | "defendant", id: string) => void;
  nextPartyNumber: (role: "plaintiff" | "defendant") => string;
  setValue: (...args: any[]) => void;
}) {
  return (
    <FormSection
      title="Parties"
      description="Add the relevant plaintiffs and defendants as separate repeatable cards."
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FB] p-4">
          <SectionHeader
            title="Plaintiffs"
            description="Each plaintiff keeps its own legal number and details."
            actionLabel="Add Plaintiff"
            onAction={() => addParty("plaintiff")}
          />
          <div className="mt-4 space-y-4">
            {plaintiffs.map((person, index) => (
              <div
                key={person.id}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <UserRound className="h-4 w-4 text-[#D4A017]" />
                    Plaintiff {index + 1}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeParty("plaintiff", person.id)}
                    disabled={plaintiffs.length === 1}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <AppInput
                    label="Plaintiff Number"
                    name={`plaintiffs.${index}.number`}
                    register={register}
                    error={errors?.plaintiffs?.[index]?.number}
                    placeholder="1"
                    required
                  />
                  <AppInput
                    label="Name"
                    name={`plaintiffs.${index}.name`}
                    register={register}
                    error={errors?.plaintiffs?.[index]?.name}
                    placeholder="Enter full name"
                    required
                  />
                  <RelationshipNameField
                    label="Parent / Spouse Name"
                    name={`plaintiffs.${index}.relationshipName`}
                    register={register}
                    error={errors?.plaintiffs?.[index]?.relationshipName}
                    relationshipTypeName={`plaintiffs.${index}.relationshipType`}
                    relationshipTypeValue={person.relationshipType}
                    onRelationshipTypeChange={(value) => {
                      setValue(`plaintiffs.${index}.relationshipType`, value);
                    }}
                  />
                  <AppInput
                    label="Phone Number"
                    name={`plaintiffs.${index}.phone`}
                    register={register}
                    error={errors?.plaintiffs?.[index]?.phone}
                    placeholder="+92 300 0000000"
                  />
                  <AppInput
                    className="md:col-span-2"
                    label="Address"
                    name={`plaintiffs.${index}.address`}
                    register={register}
                    error={errors?.plaintiffs?.[index]?.address}
                    placeholder="Complete address"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FB] p-4">
          <SectionHeader
            title="Defendants"
            description="Each defendant also keeps its own legal number."
            actionLabel="Add Defendant"
            onAction={() => addParty("defendant")}
          />
          <div className="mt-4 space-y-4">
            {defendants.map((person, index) => (
              <div
                key={person.id}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <UserRound className="h-4 w-4 text-[#D4A017]" />
                    Defendant {index + 1}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeParty("defendant", person.id)}
                    disabled={defendants.length === 1}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <AppInput
                    label="Defendant Number"
                    name={`defendants.${index}.number`}
                    register={register}
                    error={errors?.defendants?.[index]?.number}
                    placeholder="1"
                    required
                  />
                  <AppInput
                    label="Name"
                    name={`defendants.${index}.name`}
                    register={register}
                    error={errors?.defendants?.[index]?.name}
                    placeholder="Enter full name"
                    required
                  />
                  <RelationshipNameField
                    label="Parent / Spouse Name"
                    name={`defendants.${index}.relationshipName`}
                    register={register}
                    error={errors?.defendants?.[index]?.relationshipName}
                    relationshipTypeName={`defendants.${index}.relationshipType`}
                    relationshipTypeValue={person.relationshipType}
                    onRelationshipTypeChange={(value) => {
                      setValue(`defendants.${index}.relationshipType`, value);
                    }}
                  />
                  <AppInput
                    label="Phone Number"
                    name={`defendants.${index}.phone`}
                    register={register}
                    error={errors?.defendants?.[index]?.phone}
                    placeholder="+92 300 0000000"
                  />
                  <AppInput
                    className="md:col-span-2"
                    label="Address"
                    name={`defendants.${index}.address`}
                    register={register}
                    error={errors?.defendants?.[index]?.address}
                    placeholder="Complete address"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormSection>
  );
}

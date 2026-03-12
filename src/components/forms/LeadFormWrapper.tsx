import LeadForm from "@/components/forms/LeadForm";
import type { LeadFormPreset } from "@/types/lead-form-contract";

interface LeadFormWrapperProps {
  preset: LeadFormPreset;
  className?: string;
  onSubmit?: (data: Record<string, string>) => Promise<void> | void;
}

const LeadFormWrapper = ({ preset, className, onSubmit }: LeadFormWrapperProps) => {
  return (
    <LeadForm
      formId={preset.formId}
      fields={preset.fields}
      submitLabel={preset.submitLabel}
      analyticsEvent={preset.analyticsEvent}
      className={className}
      onSubmit={onSubmit}
    />
  );
};

export default LeadFormWrapper;

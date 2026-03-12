import LeadForm from "@/components/forms/LeadForm";
import { deliverForm } from "@/lib/form-delivery";
import { trackEvent } from "@/lib/analytics";
import type { DownloadAsset } from "@/types/downloads";
import type { LeadFormField } from "@/types/lead-form-contract";

interface DownloadGateFormProps {
  asset: DownloadAsset;
  onSuccess: () => void;
  onCancel: () => void;
}

const fields: LeadFormField[] = [
  { name: "name", label: "Имя", type: "text" as const, required: true, placeholder: "Как вас зовут" },
  { name: "phone", label: "Телефон", type: "tel" as const, required: true, placeholder: "+7 (___) ___-__-__" },
  { name: "email", label: "Email", type: "email" as const, required: true, placeholder: "email@example.com" },
  { name: "company", label: "Компания", type: "text" as const, placeholder: "Название компании" },
  {
    name: "role",
    label: "Роль",
    type: "select" as const,
    options: [
      { value: "architect", label: "Архитектор" },
      { value: "designer", label: "Дизайнер" },
      { value: "developer", label: "Девелопер" },
      { value: "other", label: "Другое" },
    ],
  },
];

const DownloadGateForm = ({ asset, onSuccess, onCancel }: DownloadGateFormProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-background p-8 border border-border">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display text-2xl font-medium text-foreground">Получить доступ к файлу</h3>
            <p className="font-body text-sm text-muted-foreground mt-1">{asset.title}</p>
          </div>
          <button onClick={onCancel} className="font-body text-sm text-muted-foreground hover:text-foreground">Закрыть</button>
        </div>

        <LeadForm
          formId="download_gate"
          fields={fields}
          submitLabel="Получить файл"
          analyticsEvent="download_intent"
          onSubmit={async (data) => {
            const delivery = await deliverForm({
              formId: "download_gate",
              data: {
                ...data,
                assetSlug: asset.slug,
                category: asset.category,
              },
            });

            if (!delivery.ok) {
              trackEvent("form_submit_fail", {
                form: "download_gate",
                asset: asset.slug,
                status: delivery.status,
                externalDependency: Boolean(delivery.externalDependency),
              });
              throw new Error(delivery.message);
            }

            trackEvent("form_submit_success", {
              form: "download_gate",
              asset: asset.slug,
            });
            onSuccess();
          }}
        />
      </div>
    </div>
  );
};

export default DownloadGateForm;

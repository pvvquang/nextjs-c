import { CheckCircle2Icon, TriangleAlertIcon } from "lucide-react";

type FormMessageCustomProps = {
  type: "error" | "success";
  message?: string;
};

function FormMessageCustom({ type, message }: FormMessageCustomProps) {
  if (!message) {
    return null;
  }

  const isError = type === "error";

  const containerClass = isError
    ? "bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive"
    : "bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500";
  return (
    <div className={containerClass}>
      {isError ? (
        <TriangleAlertIcon className="w-4 h-4" />
      ) : (
        <CheckCircle2Icon className="w-4 h-4" />
      )}
      {message}
    </div>
  );
}

export default FormMessageCustom;

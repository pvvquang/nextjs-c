import { auth } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-center">
      Session:: {JSON.stringify(session)}
    </div>
  );
};

export default SettingsPage;

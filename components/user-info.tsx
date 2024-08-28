import { ExtendedUser } from "@/next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UserInfoProps = {
  label: string;
  user?: ExtendedUser;
};

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <RowItem label="ID" content={user?.id} />
        <RowItem label="Name" content={user?.name || ""} />
        <RowItem label="Email" content={user?.email || ""} />
        <RowItem label="Role" content={user?.role} />
        <RowItem
          label="Two Factor Authentication"
          renderContent={
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          }
        />
      </CardContent>
    </Card>
  );
};

const RowItem = ({
  label,
  content,
  renderContent,
}: {
  label: string;
  content?: string;
  renderContent?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between py-2 px-3 border rounded-lg shadow-sm">
      <p className="text-sm font-medium">{label}</p>
      {renderContent ? (
        renderContent
      ) : (
        <p
          className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md"
          title={content}
        >
          {content}
        </p>
      )}
    </div>
  );
};

export default UserInfo;

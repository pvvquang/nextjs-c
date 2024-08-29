"use client";

import { UserRole } from "@prisma/client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormMessageCustom from "@/components/common/form-message-custom";
import RoleGate from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { checkAdmin } from "@/actions/admin";

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden API Route!");
      }
    });
  };
  const onServerActionClick = () => {
    checkAdmin().then((res) => {
      res.success && toast.success(res.success);
      res.error && toast.error(res.error);
    });
  };
  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormMessageCustom
            type="success"
            message="You are allowed to see this content!"
          />
        </RoleGate>
        <div className="px-3 py-2 rounded-xl shadow-md border flex items-center justify-between">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="px-3 py-2 rounded-xl shadow-md border flex items-center justify-between">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;

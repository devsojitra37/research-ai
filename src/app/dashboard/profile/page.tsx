"use client";
import { useAuth } from "@/components/providers/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Building2, GraduationCap, Save } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account information and preferences.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><User className="w-5 h-5" /> Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h3 className="font-semibold">{user?.name || "User"}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <Badge variant="info" className="mt-1">{user?.role || "USER"}</Badge>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input defaultValue={user?.name || ""} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue={user?.email || ""} placeholder="Email" disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Institution</label>
              <Input placeholder="University or organization" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Input placeholder="Computer Science" />
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <Button variant="gradient"><Save className="w-4 h-4" /> Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

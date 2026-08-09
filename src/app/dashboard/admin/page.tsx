"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { featureFlags } from "@/config";
import {
  Users,
  DollarSign,
  FileText,
  Brain,
  ShieldCheck,
  Search,
  UserCheck,
  UserX,
  Settings,
  Activity,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Database,
  Lock,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [flags, setFlags] = useState({ ...featureFlags });
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    { id: "u1", name: "Rahul Sharma", email: "rahul.s@iitb.ac.in", role: "STUDENT", plan: "Student", status: "Active", docs: 14 },
    { id: "u2", name: "Dr. Ananya Roy", email: "ananya.roy@aiims.edu", role: "RESEARCHER", plan: "Researcher", status: "Active", docs: 42 },
    { id: "u3", name: "Vikram Patel", email: "vikram.patel@bca.org", role: "USER", plan: "Free", status: "Active", docs: 2 },
    { id: "u4", name: "MIT Research Dept", email: "admin@mit.edu", role: "INSTITUTION_ADMIN", plan: "Institution", status: "Active", docs: 189 },
  ]);

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags({ ...flags, [key]: !flags[key] });
    toast.success(`Updated feature flag: ${key}`);
  };

  const handleSuspendUser = (id: string, name: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u)));
    toast.success(`User status updated for ${name}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="text-[10px] uppercase font-bold">
              Super Admin Control
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              System Health: 100% Operational
            </Badge>
          </div>
          <h1 className="text-2xl font-bold mt-1">Admin Dashboard & Analytics</h1>
          <p className="text-muted-foreground text-sm">
            Monitor platform metrics, user accounts, subscription revenue, AI throughput, and system feature flags.
          </p>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Registered Users</p>
                <p className="text-3xl font-extrabold mt-1">1,482</p>
                <p className="text-xs text-emerald-400 font-medium mt-1">+12% this week</p>
              </div>
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Monthly Recurring Revenue</p>
                <p className="text-3xl font-extrabold mt-1">₹348,500</p>
                <p className="text-xs text-emerald-400 font-medium mt-1">+18% MoM Growth</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Documents Processed</p>
                <p className="text-3xl font-extrabold mt-1">8,920</p>
                <p className="text-xs text-violet-400 font-medium mt-1">Avg 12s / document</p>
              </div>
              <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-400">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">AI Token API Calls</p>
                <p className="text-3xl font-extrabold mt-1">1.4M</p>
                <p className="text-xs text-amber-400 font-medium mt-1">0 Failed Jobs</p>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
                <Brain className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Flags Control Box */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" /> Feature Flags & System Switches
          </CardTitle>
          <CardDescription>
            Enable or disable major SaaS features dynamically without redeploying code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(flags).map(([key, val]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card"
              >
                <span className="text-xs font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <button
                  onClick={() => toggleFlag(key as any)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    val ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      val ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Management Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-lg">User Account Management</CardTitle>
            <CardDescription>Search, modify subscription plans, or suspend user access.</CardDescription>
          </div>

          <div className="relative w-64">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user email or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-muted/30 border border-border text-xs focus:outline-none focus:border-primary"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase font-semibold">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Subscription Plan</th>
                  <th className="py-3 px-4">Documents</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3.5 px-4 font-semibold">
                      <p className="text-foreground">{u.name}</p>
                      <p className="text-muted-foreground font-normal text-[11px]">{u.email}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="outline" className="text-[10px]">{u.role}</Badge>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-primary">{u.plan} Plan</td>
                    <td className="py-3.5 px-4 font-medium">{u.docs} docs</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={u.status === "Active" ? "success" : "destructive"} className="text-[10px]">
                        {u.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant={u.status === "Active" ? "outline" : "gradient"}
                        size="sm"
                        onClick={() => handleSuspendUser(u.id, u.name)}
                        className="text-[11px] h-7"
                      >
                        {u.status === "Active" ? "Suspend" : "Reactivate"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

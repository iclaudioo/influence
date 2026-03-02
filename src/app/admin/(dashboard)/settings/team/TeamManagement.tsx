"use client";

import React, { useState, useCallback } from "react";
import { UserPlus, Shield, Crown, Trash2, Mail } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";
import Badge from "@/components/admin/ui/Badge";
import Modal from "@/components/admin/ui/Modal";
import { useToast } from "@/components/admin/ui/Toast";

type TeamRole = "owner" | "admin" | "editor" | "viewer";

interface TeamMember {
  id: string;
  email: string;
  role: TeamRole;
  created_at: string;
}

interface TeamManagementProps {
  currentUser: TeamMember | null;
}

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

const roleBadgeVariant: Record<
  TeamRole,
  "success" | "warning" | "info" | "default"
> = {
  owner: "warning",
  admin: "success",
  editor: "info",
  viewer: "default",
};

const roleIcons: Record<TeamRole, React.ElementType> = {
  owner: Crown,
  admin: Shield,
  editor: Mail,
  viewer: Mail,
};

export default function TeamManagement({ currentUser }: TeamManagementProps) {
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>(
    currentUser ? [currentUser] : []
  );
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("editor");
  const [sending, setSending] = useState(false);

  const handleInvite = useCallback(async () => {
    if (!inviteEmail.trim()) return;

    setSending(true);

    // Simulate invite sending
    await new Promise((r) => setTimeout(r, 1000));

    const newMember: TeamMember = {
      id: `invite-${Date.now()}`,
      email: inviteEmail,
      role: inviteRole as TeamRole,
      created_at: new Date().toISOString(),
    };

    setMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviteRole("editor");
    setInviteOpen(false);
    setSending(false);

    toast("success", `Invitation sent to ${newMember.email}`);
  }, [inviteEmail, inviteRole, toast]);

  const handleRemove = useCallback(
    (memberId: string) => {
      const member = members.find((m) => m.id === memberId);
      if (member?.role === "owner") {
        toast("error", "Cannot remove the owner.");
        return;
      }

      if (!window.confirm("Are you sure you want to remove this team member?"))
        return;

      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      toast("info", "Team member removed.");
    },
    [members, toast]
  );

  return (
    <div className="max-w-2xl">
      {/* Team members list */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Team Members
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {members.length} member{members.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setInviteOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90"
          >
            <UserPlus className="h-4 w-4" />
            Invite
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {members.map((member) => {
            const RoleIcon = roleIcons[member.role];

            return (
              <div
                key={member.id}
                className="flex items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#02182B] text-sm font-semibold text-white">
                    {member.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {member.email}
                    </p>
                    <p className="text-xs text-gray-400">
                      Joined{" "}
                      {new Date(member.created_at).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={roleBadgeVariant[member.role]}>
                    <span className="flex items-center gap-1">
                      <RoleIcon className="h-3 w-3" />
                      {member.role}
                    </span>
                  </Badge>
                  {member.role !== "owner" && (
                    <button
                      type="button"
                      onClick={() => handleRemove(member.id)}
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invite modal */}
      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite Team Member"
        footer={
          <>
            <button
              type="button"
              onClick={() => setInviteOpen(false)}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleInvite}
              disabled={sending || !inviteEmail.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
            >
              <Mail className="h-4 w-4" />
              {sending ? "Sending..." : "Send Invite"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@company.com"
          />
          <Select
            label="Role"
            options={ROLE_OPTIONS}
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
          />
          <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500 space-y-1.5">
            <p>
              <strong className="text-gray-700">Admin</strong> — Full access to
              all features
            </p>
            <p>
              <strong className="text-gray-700">Editor</strong> — Create and
              edit campaigns, templates, and automations
            </p>
            <p>
              <strong className="text-gray-700">Viewer</strong> — Read-only
              access to dashboard and reports
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

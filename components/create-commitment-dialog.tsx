"use client";

import { useState, FormEvent } from "react";
import { useCreateCommitment } from "@/hooks/useCreateCommitment";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CommitmentKind, Recurrence } from "@/types/commitment";

export function CreateCommitmentDialog({ spaceId }: { spaceId: string }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<CommitmentKind>("bill");
  const [recurrence, setRecurrence] = useState<Recurrence>("monthly");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const createCommitment = useCreateCommitment();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createCommitment.mutate(
      { space_id: spaceId, kind, recurrence, target_amount: Number(targetAmount), target_date: targetDate },
      {
        onSuccess: () => {
          setOpen(false);
          setTargetAmount("");
          setTargetDate("");
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
 + New Commitment
</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Commitment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Kind</Label>
            <Select value={kind} onValueChange={(v) => setKind(v as CommitmentKind)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bill">Bill</SelectItem>
                <SelectItem value="objective">Objective</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Recurrence</Label>
            <Select value={recurrence} onValueChange={(v) => setRecurrence(v as Recurrence)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="one_time">One-time</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="target_amount">Target amount</Label>
            <Input id="target_amount" type="number" step="0.001" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target_date">Target date</Label>
            <Input id="target_date" type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} required />
          </div>
          {createCommitment.isError && <p className="text-sm text-destructive">{createCommitment.error.message}</p>}
          <DialogFooter>
            <Button type="submit" disabled={createCommitment.isPending}>
              {createCommitment.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
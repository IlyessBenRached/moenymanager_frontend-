"use client";

import { useState, FormEvent } from "react";
import { useLogContribution } from "@/hooks/useLogContribution";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LogContributionDialog({ spaceId, commitmentId }: { spaceId: string; commitmentId: string }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const logContribution = useLogContribution(spaceId);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    logContribution.mutate(
      { commitmentId, amount: Number(amount), date },
      { onSuccess: () => { setOpen(false); setAmount(""); } }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
<DialogTrigger render={<Button size="sm" variant="secondary" />}>
  Log Contribution
</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log a Contribution</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="c_amount">Amount</Label>
            <Input id="c_amount" type="number" step="0.001" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c_date">Date</Label>
            <Input id="c_date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          {logContribution.isError && <p className="text-sm text-destructive">{logContribution.error.message}</p>}
          <DialogFooter>
            <Button type="submit" disabled={logContribution.isPending}>
              {logContribution.isPending ? "Logging..." : "Confirm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
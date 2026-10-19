"use client";

import { useState, FormEvent } from "react";
import { useLogIncome } from "@/hooks/useLogIncome";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IncomeSourceType } from "@/types/income";

export function LogIncomeDialog() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [sourceType, setSourceType] = useState<IncomeSourceType>("external");
  const [sourceRef, setSourceRef] = useState("");
  const logIncome = useLogIncome();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    logIncome.mutate(
      { amount: Number(amount), date, source_type: sourceType, source_ref: sourceRef },
      { onSuccess: () => { setOpen(false); setAmount(""); setSourceRef(""); } }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
<DialogTrigger render={<Button />}>
  + Log Income
</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Income</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="i_amount">Amount</Label>
            <Input id="i_amount" type="number" step="0.001" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="i_date">Date</Label>
            <Input id="i_date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Source type</Label>
            <Select value={sourceType} onValueChange={(v) => setSourceType(v as IncomeSourceType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="external">External</SelectItem>
                <SelectItem value="space">Space (label only)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="i_source_ref">Source {sourceType === "space" && "(Space name/id)"}</Label>
            <Input id="i_source_ref" value={sourceRef} onChange={(e) => setSourceRef(e.target.value)} required />
          </div>
          {sourceType === "space" && (
            <p className="text-xs text-muted-foreground">
              This is a label only — it won&apos;t move funds into that Space. Income always increases Global Balance.
            </p>
          )}
          {logIncome.isError && <p className="text-sm text-destructive">{logIncome.error.message}</p>}
          <DialogFooter>
            <Button type="submit" disabled={logIncome.isPending}>
              {logIncome.isPending ? "Logging..." : "Confirm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
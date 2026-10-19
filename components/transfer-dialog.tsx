"use client";

import { useState, FormEvent } from "react";
import { useSpaceTransfer } from "@/hooks/useSpaceTransfer";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TransferDialog({ spaceId, direction }: { spaceId: string; direction: "allocate" | "deallocate" }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [warning, setWarning] = useState<string | null>(null);
  const transfer = useSpaceTransfer(direction);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setWarning(null);
    transfer.mutate(
      { spaceId, amount: Number(amount), note: note || undefined },
      {
        onSuccess: (result) => {
          if (result.meta?.warnings?.length) {
            setWarning(result.meta.warnings.join(" "));
          } else {
            setOpen(false);
          }
          setAmount("");
          setNote("");
        },
      }
    );
  }

  const label = direction === "allocate" ? "Allocate Funds" : "Deallocate Funds";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogTrigger render={<Button variant={direction === "allocate" ? "default" : "outline"} />}>
  {label}
</DialogTrigger>

      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" step="0.001" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Input id="note" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          {transfer.isError && <p className="text-sm text-destructive">{transfer.error.message}</p>}
          {warning && (
            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md p-2">
              {warning}
            </p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={transfer.isPending}>
              {transfer.isPending ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
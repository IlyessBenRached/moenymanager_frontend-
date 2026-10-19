"use client";

import { useState, FormEvent } from "react";
import { useCreateSpace } from "@/hooks/useCreateSpace";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateSpaceDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [initialAllocation, setInitialAllocation] = useState("");
  const createSpace = useCreateSpace();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createSpace.mutate(
      { name, initial_allocation: initialAllocation ? Number(initialAllocation) : undefined },
      {
        onSuccess: () => {
          setOpen(false);
          setName("");
          setInitialAllocation("");
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button />}>
            + New Space
        </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Space</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="initial_allocation">Initial allocation (optional)</Label>
            <Input
              id="initial_allocation"
              type="number"
              step="0.001"
              value={initialAllocation}
              onChange={(e) => setInitialAllocation(e.target.value)}
            />
          </div>
          {createSpace.isError && <p className="text-sm text-destructive">{createSpace.error.message}</p>}
          <DialogFooter>
            <Button type="submit" disabled={createSpace.isPending}>
              {createSpace.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
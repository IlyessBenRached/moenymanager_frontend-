"use client";

import { useParams } from "next/navigation";
import { useSpaceDashboard } from "@/hooks/useSpaceDashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { TransferDialog } from "@/components/transfer-dialog";
import { CreateCommitmentDialog } from "@/components/create-commitment-dialog";
import { LogContributionDialog } from "@/components/log-contribution-dialog";


const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  on_track: "default",
  behind: "secondary",
  at_risk: "destructive",
  completed: "outline",
};

export default function SpaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSpaceDashboard(id);

  if (isLoading) return <Skeleton className="h-64" />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Couldn&apos;t load this Space</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const { space, balance, commitments, monthly_required_total } = data!.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{space.name}</h1>
          <Badge variant={space.has_own_balance ? "default" : "secondary"} className="mt-1">
            {space.has_own_balance ? "Own Balance" : "Drawing from Global"}
          </Badge>
        </div>
        <div className="flex gap-2">
          <TransferDialog spaceId={space.id} direction="allocate" />
          <TransferDialog spaceId={space.id} direction="deallocate" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Balance</CardDescription>
            <CardTitle className="text-3xl">{balance}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Monthly Required (this Space)</CardDescription>
            <CardTitle className="text-3xl">{monthly_required_total}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Commitments</h2>
          <CreateCommitmentDialog spaceId={space.id} />
        </div>
        {commitments.length === 0 ? (
          <p className="text-muted-foreground">No active Commitments in this Space yet.</p>
        ) : (
          <div className="space-y-3">
            {commitments.map((c) => {
              const target = Number(c.target_amount);
              const saved = Number(c.amount_saved_so_far);
              const pct = target > 0 ? Math.min((saved / target) * 100, 100) : 0;
              return (
                <Card key={c.id}>
                  <CardContent className="pt-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">{c.kind} · {c.recurrence.replace("_", " ")}</span>
                      <Badge variant={statusVariant[c.status]}>{c.status.replace("_", " ")}</Badge>
                    </div>
                    <Progress value={pct} />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{c.amount_saved_so_far} / {c.target_amount}</span>
                      <span>Due {c.target_date}</span>
                    </div>
                    {!c.is_completed && (
                      <div className="pt-1">
                        <LogContributionDialog spaceId={space.id} commitmentId={c.id} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
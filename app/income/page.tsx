"use client";

import { useState } from "react";
import { useIncome } from "@/hooks/useIncome";
import { useIncomeBreakdown } from "@/hooks/useIncomeBreakdown";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { LogIncomeDialog } from "@/components/log-income-dialog";
import { IncomeBreakdownChart } from "@/components/income-breakdown-chart";

function currentMonthRange() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
  return { from: first, to: last };
}

export default function IncomePage() {
  const [range] = useState(currentMonthRange);
  const income = useIncome(range.from, range.to);
  const breakdown = useIncomeBreakdown(range.from, range.to);

  const isLoading = income.isLoading || breakdown.isLoading;
  const error = income.error || breakdown.error;

  if (isLoading) return <Skeleton className="h-64" />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Couldn&apos;t load Income</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const entries = income.data!.data;
  const breakdownData = breakdown.data!.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Income</h1>
          <p className="text-sm text-muted-foreground">{range.from} → {range.to}</p>
        </div>
        <LogIncomeDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Entries</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {entries.length === 0 ? (
              <p className="text-muted-foreground text-sm">No income logged in this period.</p>
            ) : (
              entries.map((e) => (
                <div key={e.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{e.amount}</p>
                    <p className="text-xs text-muted-foreground">{e.date}</p>
                  </div>
                  <Badge variant="secondary">{e.source_ref}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Breakdown by Source</CardTitle></CardHeader>
          <CardContent>
            <IncomeBreakdownChart data={breakdownData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
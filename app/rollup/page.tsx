"use client";

import { useMonthlyRollup } from "@/hooks/useMonthlyRollup";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MonthlyRollupPage() {
  const { data, isLoading, error } = useMonthlyRollup();

  if (isLoading) return <Skeleton className="h-64" />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Couldn&apos;t load the Monthly Rollup</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const rollup = data!.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Monthly Rollup</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Required</CardDescription>
            <CardTitle className="text-3xl">{rollup.total_required}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Available</CardDescription>
            <CardTitle className="text-3xl">{rollup.total_available}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Status</CardDescription>
            <CardTitle>
              <Badge variant={rollup.shortfall ? "destructive" : "default"} className="text-sm">
                {rollup.shortfall ? "Shortfall" : "Fully Covered"}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">By Space</CardTitle></CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Space</TableHead>
              <TableHead>Required</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rollup.breakdown_by_space.map((row) => (
              <TableRow key={row.space_id ?? "global"}>
                <TableCell>{row.space_name}</TableCell>
                <TableCell>{row.required}</TableCell>
                <TableCell>{row.available}</TableCell>
                <TableCell>
                  <Badge variant={row.shortfall ? "destructive" : "secondary"}>
                    {row.shortfall ? "Shortfall" : "OK"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
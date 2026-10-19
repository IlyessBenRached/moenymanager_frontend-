"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { IncomeBreakdownItem } from "@/types/income";

export function IncomeBreakdownChart({ data }: { data: IncomeBreakdownItem[] }) {
  const chartData = data.map((d) => ({ source: d.source_ref, total: Number(d.total) }));

  if (chartData.length === 0) {
    return <p className="text-muted-foreground text-sm">No income logged in this period.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 24 }}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="source" width={100} />
        <Tooltip />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  );
}
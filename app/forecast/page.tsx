"use client";

import { useState } from "react";
import { useForecast } from "@/hooks/useForecast";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ForecastPage() {
  const [days, setDays] = useState("30");
  const { data, isLoading, error } = useForecast(Number(days));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Forecast</h1>
        <Tabs value={days} onValueChange={setDays}>
          <TabsList>
            <TabsTrigger value="30">30 days</TabsTrigger>
            <TabsTrigger value="60">60 days</TabsTrigger>
            <TabsTrigger value="90">90 days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading && <Skeleton className="h-64" />}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Couldn&apos;t load the Forecast</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {data && (
        data.data.length === 0 ? (
          <p className="text-muted-foreground">Nothing due in the next {days} days.</p>
        ) : (
          <div className="space-y-3">
            {data.data.map((item) => (
              <Card key={item.commitment_id}>
                <CardContent className="pt-6 flex items-center justify-between">
                  <span className="font-medium">{item.amount_due}</span>
                  <span className="text-sm text-muted-foreground">Due {item.due_date}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}
    </div>
  );
}
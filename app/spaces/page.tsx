"use client";

import Link from "next/link";
import { useSpaces } from "@/hooks/useSpaces";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CreateSpaceDialog } from "@/components/create-space-dialog";

export default function SpacesPage() {
  const { data, isLoading, error } = useSpaces();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Couldn&apos;t load your Spaces</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const spaces = data!.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Spaces</h1>
        <CreateSpaceDialog />
      </div>

      {spaces.length === 0 ? (
        <p className="text-muted-foreground">No Spaces yet — create one to get started.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {spaces.map((space) => (
            <Link key={space.id} href={`/spaces/${space.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{space.name}</CardTitle>
                    <Badge variant={space.has_own_balance ? "default" : "secondary"}>
                      {space.has_own_balance ? "Own Balance" : "Drawing from Global"}
                    </Badge>
                  </div>
                  <CardDescription className="text-2xl font-semibold text-foreground pt-2">
                    {space.balance}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
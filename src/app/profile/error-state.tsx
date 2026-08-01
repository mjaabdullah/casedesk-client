"use client";

import { Alert, Button } from "@heroui/react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Alert status="danger" className="mx-auto max-w-xl">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Couldn&apos;t load profile</Alert.Title>
        <Alert.Description>
          {message ??
            "Something went wrong while fetching this profile. Please try again."}
        </Alert.Description>
        {onRetry ? (
          <Button
            variant="outline"
            size="sm"
            className="mt-3 self-start"
            onPress={onRetry}
          >
            Retry
          </Button>
        ) : null}
      </Alert.Content>
    </Alert>
  );
}

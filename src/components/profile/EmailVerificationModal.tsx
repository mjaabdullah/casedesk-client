"use client";

import {
  Button,
  InputOTP,
  Label,
  Modal,
  REGEXP_ONLY_DIGITS,
  useOverlayState,
} from "@heroui/react";
import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

interface EmailVerificationModalProps {
  email: string;
  /** Called after a successful verification */
  onVerified?: () => void;
}

export function EmailVerificationModal({
  email,
  onVerified,
}: EmailVerificationModalProps) {
  const state = useOverlayState();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Send a code the moment the modal opens — a legitimate effect, since this
  // synchronizes with an external system (the email API) in response to
  // visibility, not a local-state mirror.
  useEffect(() => {
    if (state.isOpen) {
      void sendCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isOpen]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(
      () => setCooldown((seconds) => Math.max(0, seconds - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [cooldown]);

  async function sendCode() {
    setIsSending(true);
    setError(null);
    const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });
    setIsSending(false);
    if (sendError) {
      setError("Couldn't send the code. Please try again in a moment.");
      return;
    }
    setCooldown(RESEND_COOLDOWN_SECONDS);
  }

  async function handleVerify() {
    if (code.length !== OTP_LENGTH || isVerifying) return;
    setIsVerifying(true);
    setError(null);
    const { error: verifyError } = await authClient.emailOtp.verifyEmail({
      email,
      otp: code,
    });
    setIsVerifying(false);
    if (verifyError) {
      setError("That code is incorrect or has expired.");
      return;
    }

    onVerified?.();
    state.close();
    router.refresh();
  }

  function handleOpenChange(open: boolean) {
    state.setOpen(open);
    if (!open) {
      setCode("");
      setError(null);
    }
  }

  return (
    <Modal>
      <Button
        variant="ghost"
        size="sm"
        onPress={state.open}
        className="h-auto w-fit p-0 text-xs font-semibold text-accent hover:underline"
      >
        Verify Now
      </Button>

      <Modal.Backdrop isOpen={state.isOpen} onOpenChange={handleOpenChange}>
        <Modal.Container>
          <Modal.Dialog>
            {({ close }) => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading>Verify your email</Modal.Heading>
                </Modal.Header>

                <Modal.Body className="flex  flex-col gap-4">
                  <p className="text-sm text-muted">
                    We sent a 6-digit code to{" "}
                    <span className="font-medium text-foreground">{email}</span>
                    . Enter it below.
                  </p>

                  <div className="flex flex-col gap-2">
                    <Label className="sr-only">Verification code</Label>
                    <InputOTP
                      maxLength={OTP_LENGTH}
                      pattern={REGEXP_ONLY_DIGITS}
                      value={code}
                      onChange={(value) => {
                        setCode(value);
                        setError(null);
                      }}
                      onComplete={handleVerify}
                      isInvalid={!!error}
                      isDisabled={isSending}
                    >
                      <InputOTP.Group>
                        <InputOTP.Slot
                          index={0}
                          className={`h-8 w-6 md:h-10 md:w-8 text-sm rounded-sm sm:text-base`}
                        />
                        <InputOTP.Slot
                          index={1}
                          className={`h-8 w-6 md:h-10 md:w-8 text-sm rounded-sm sm:text-base`}
                        />
                        <InputOTP.Slot
                          index={2}
                          className={`h-8 w-6 md:h-10 md:w-8 text-sm rounded-sm sm:text-base`}
                        />
                      </InputOTP.Group>
                      <InputOTP.Separator />
                      <InputOTP.Group>
                        <InputOTP.Slot
                          index={3}
                          className={`h-8 w-6 md:h-10 md:w-8 text-sm rounded-sm sm:text-base`}
                        />
                        <InputOTP.Slot
                          index={4}
                          className={`h-8 w-6 md:h-10 md:w-8 text-sm rounded-sm sm:text-base`}
                        />
                        <InputOTP.Slot
                          index={5}
                          className={`h-8 w-6 md:h-10 md:w-8 text-sm rounded-sm sm:text-base`}
                        />
                      </InputOTP.Group>
                    </InputOTP>
                    {error ? (
                      <p className="text-xs text-danger">{error}</p>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted">
                    <span>Didn&apos;t get a code?</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      isDisabled={cooldown > 0 || isSending}
                      onPress={sendCode}
                      className="h-auto w-fit p-0 text-xs font-semibold text-accent disabled:text-muted"
                    >
                      {cooldown > 0 ? `Resend (${cooldown}s)` : "Resend"}
                    </Button>
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="tertiary" onPress={close}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    isPending={isVerifying}
                    isDisabled={code.length !== OTP_LENGTH}
                    onPress={handleVerify}
                  >
                    Verify
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

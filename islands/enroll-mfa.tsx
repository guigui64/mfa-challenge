import { useEffect, useState } from "preact/hooks";
import Button from "../components/button.tsx";
import Input from "../components/input.tsx";

export function EnrollMFA({
  factorId: initialFactorId,
}: {
  factorId?: string;
}) {
  const [factorId, setFactorId] = useState(initialFactorId || "");
  const [qr, setQR] = useState(""); // holds the QR code image SVG
  const [verifyCode, setVerifyCode] = useState(""); // contains the code entered by the user
  const [error, setError] = useState(""); // holds an error message
  const [verified, setVerified] = useState(false);

  const onEnableClicked = () => {
    setError("");
    (async () => {
      try {
        const res = await fetch("/api/mfa/challenge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ factorId, code: verifyCode }),
        });
        if (res.status !== 200) {
          const text = await res.text();
          setError(`Could not validate code: ${text}`);
          return;
        }
        setVerified(true);
        setTimeout(() => (location.href = "/dashboard"), 2000);
      } catch (error) {
        setError(error.message);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      if (initialFactorId) return;
      try {
        const res = await fetch("/api/mfa/enroll");
        if (res.status !== 200) {
          const text = await res.text();
          setError(`Could not get QR code from server: ${text}`);
          return;
        }
        const { qr, factorId } = await res.json();
        setFactorId(factorId);
        setQR(qr);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  if (verified) {
    return (
      <div class="flex flex-col items-center gap-2">
        <p>Verified ! Getting redirected...</p>
      </div>
    );
  }
  return (
    <div class="flex flex-col items-center gap-2">
      {error && <div className="text-red-600 font-medium">⚠ {error}</div>}
      {initialFactorId !== undefined || <img class="w-52" src={qr} />}
      <div class="flex gap-2 items-start">
        <Input
          type="text"
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.currentTarget.value.trim())}
        />
        <Button onClick={onEnableClicked}>
          {initialFactorId ? "Verify" : "Enable"}
        </Button>
      </div>
    </div>
  );
}

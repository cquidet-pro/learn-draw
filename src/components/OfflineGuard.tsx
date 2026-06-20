import { useEffect, useRef, useState } from "react";

// If the child taps a link to another site (e.g. a future Stripe checkout or a
// contact webform) while offline, the browser would show its own scary error
// page. Instead we catch it and show a friendly note — the drawing app itself
// keeps working offline. Same-site navigation is left alone (the service worker
// handles that), and mailto:/tel: links are allowed through.
export function OfflineGuard() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const flash = () => {
      setMsg("🌐 You need the internet for that. The drawing still works offline!");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMsg(null), 4000);
    };

    const isExternal = (url: string): boolean => {
      try {
        return new URL(url, location.href).origin !== location.origin;
      } catch {
        return false;
      }
    };

    const onClick = (e: MouseEvent) => {
      if (navigator.onLine) return;
      const target = e.target as Element | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;
      if (isExternal(href)) {
        e.preventDefault();
        e.stopPropagation();
        flash();
      }
    };

    const onSubmit = (e: SubmitEvent) => {
      if (navigator.onLine) return;
      const form = e.target as HTMLFormElement | null;
      const action = form?.getAttribute?.("action");
      if (action && isExternal(action)) {
        e.preventDefault();
        e.stopPropagation();
        flash();
      }
    };

    // Capture phase so we intercept before the link/form acts.
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
      window.clearTimeout(timer.current);
    };
  }, []);

  if (!msg) return null;
  return (
    <div className="voice-toast offline-toast" role="status">
      {msg}
    </div>
  );
}

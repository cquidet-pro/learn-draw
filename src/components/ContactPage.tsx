import { useCallback, useState } from "react";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

interface Props {
  onHome: () => void;
}

const NOTES: { emoji: string; text: string }[] = [
  { emoji: "👋", text: "Hello there, and thank you for visiting!" },
  { emoji: "🎨", text: "We hope you had heaps of fun drawing today." },
  { emoji: "💌", text: "This little app was made with love for young artists everywhere." },
  { emoji: "🌟", text: "Keep being creative — there's no wrong way to draw!" },
];

// Public Web3Forms access key. Safe to ship in client code — it only allows
// sending messages to the site owner, never reading them.
const WEB3FORMS_KEY = "61421e56-9f27-4b6d-ba9c-bd7878100628";

type Status = "idle" | "sending" | "success" | "error";

export function ContactPage({ onHome }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  const onCommand = useCallback(
    (transcript: string): boolean => {
      if (heardAny(transcript, ["home", "back", "menu"])) {
        onHome();
        return true;
      }
      return false;
    },
    [onHome],
  );
  useVoiceControl(onCommand);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }, []);

  return (
    <div className="facts-page">
      <header className="player-header">
        <button className="home-btn" onClick={onHome} aria-label="Back to home">
          🏠 Home
        </button>
        <h1>👋 Say Hello!</h1>
      </header>

      <p className="subtitle">A little note from us to you 💛</p>

      <div className="control-bar">
        <VoiceButton />
      </div>

      <div className="facts-grid">
        {NOTES.map((n, i) => (
          <div className="fact-card" key={i}>
            <div className="fact-emoji" aria-hidden="true">
              {n.emoji}
            </div>
            <p className="fact-text">{n.text}</p>
          </div>
        ))}
      </div>

      {/* Feedback form (for grown-ups). Submissions are emailed to us via
          Web3Forms — no backend, no cookies. */}
      <section className="feedback" aria-label="Send us feedback">
        <h2 className="feedback-title">💌 Tell us what you think</h2>
        <p className="feedback-intro">
          Grown-ups: we'd love to hear how we can make Learn to Draw even better!
        </p>

        {status === "success" ? (
          <div className="feedback-thanks" role="status">
            <span className="feedback-thanks-emoji" aria-hidden="true">
              🎉
            </span>
            <p>Thank you so much! Your message is on its way. 💛</p>
            <button className="facts-btn" onClick={() => setStatus("idle")}>
              Send another
            </button>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
            <input type="hidden" name="subject" value="New Learn to Draw feedback 🎨" />
            <input type="hidden" name="from_name" value="Learn to Draw" />
            {/* Honeypot — hidden from people, catches bots. */}
            <input
              type="checkbox"
              name="botcheck"
              className="feedback-hp"
              tabIndex={-1}
              autoComplete="off"
            />

            <label className="feedback-field">
              <span>How fun was it?</span>
              <select name="rating" defaultValue="">
                <option value="">— pick one (optional) —</option>
                <option value="⭐⭐⭐⭐⭐ Loved it">⭐⭐⭐⭐⭐ Loved it</option>
                <option value="⭐⭐⭐⭐ Really good">⭐⭐⭐⭐ Really good</option>
                <option value="⭐⭐⭐ It's okay">⭐⭐⭐ It's okay</option>
                <option value="⭐⭐ Needs work">⭐⭐ Needs work</option>
                <option value="⭐ Not for us">⭐ Not for us</option>
              </select>
            </label>

            <label className="feedback-field">
              <span>Your message</span>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="What did you like? What could be better?"
              />
            </label>

            <label className="feedback-field">
              <span>Your name (optional)</span>
              <input type="text" name="name" autoComplete="name" placeholder="Jamie" />
            </label>

            <label className="feedback-field">
              <span>Email (optional — so we can reply)</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>

            {status === "error" && (
              <p className="feedback-err" role="alert">
                Oops — something went wrong. Please try again in a moment. 🙏
              </p>
            )}

            <button
              type="submit"
              className="feedback-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending… ✉️" : "Send feedback 💌"}
            </button>
          </form>
        )}
      </section>

      <p className="made-with-love">Made with ❤️ for happy little artists 🖍️</p>
    </div>
  );
}

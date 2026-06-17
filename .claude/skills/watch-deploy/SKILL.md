---
name: watch-deploy
description: >-
  Watch the "Deploy to GitHub Pages" GitHub Actions workflow and notify the user
  when the deployment finishes so they can try the live site. Use this RIGHT AFTER
  pushing or merging changes that land on the `main` branch of cquidet-pro/learn-draw
  (a push to `main` is what triggers .github/workflows/deploy.yml). Also use when the
  user asks to "watch the deploy", "tell me when it's deployed/live", or "ping me when
  the deployment is done".
---

# Watch deploy & notify

This repo deploys to GitHub Pages automatically: `.github/workflows/deploy.yml`
runs on every push to `main` (and on manual `workflow_dispatch`) and publishes the
site to **https://cquidet-pro.github.io/learn-draw/**.

The convention: whenever a change lands on `main`, follow the deployment run to
completion and send the user a **proactive notification** with the result and the
live URL, so they can immediately try it out — including from a mobile session.

## When this applies

- Only a push to **`main`** triggers a deploy. Pushing to a feature branch (e.g.
  `claude/...`) does **not** deploy — so if you only pushed a feature branch, there
  is nothing to watch yet. Tell the user the deploy will run once the branch is
  merged into `main`.
- After merging a PR into `main`, or after a direct push to `main`, run this skill.

## Steps

1. **Identify the deploy run.** List recent runs of the deploy workflow and pick the
   one for the commit that was just pushed:

   - Tool: `mcp__github__actions_list`
   - `method: "list_workflow_runs"`, `owner: "cquidet-pro"`, `repo: "learn-draw"`,
     `resource_id: "deploy.yml"`, `workflow_runs_filter: { branch: "main", event: "push" }`
   - Match the run whose `head_sha` equals the commit you just pushed. Grab its run `id`.

2. **Wait for completion.** Poll the run until it reaches a terminal state:

   - Tool: `mcp__github__actions_get`
   - `method: "get_workflow_run"`, `owner: "cquidet-pro"`, `repo: "learn-draw"`,
     `resource_id: "<run id>"`
   - Re-check roughly every 20–30s. A Pages deploy here usually finishes within
     ~1–2 minutes. Stop polling when `status == "completed"`.
   - Do not block forever: if it is still running after ~5 minutes, report the
     current status and the run URL rather than waiting silently.

3. **Notify the user.** Send the result as a **proactive** message. The Claude app
   turns a proactive message into a **push notification on the user's phone** when the
   app is backgrounded — so the completion message below *is* the phone notification.
   There is no separate push API to call; just emit the message proactively:

   - On `conclusion == "success"`: tell the user the deploy is done and include the
     live link — **https://cquidet-pro.github.io/learn-draw/** — inviting them to try
     it. (Pages can take a few extra seconds to serve the new build; mention a hard
     refresh if they don't see the change.)
   - On `conclusion == "failure"` (or `cancelled`/`timed_out`): say it failed, then
     investigate with `mcp__github__get_job_logs` (use `failed_only`) and offer a fix.

## Notes

- No `gh` CLI is available in this environment — use the `mcp__github__*` tools above.
- Keep notifications to one per deploy: the start ("watching the deploy…") is optional;
  the completion notification is the important one.

## Getting the phone notification

For the completion message to arrive as a **push notification on the user's phone**,
the notification is delivered by the Claude mobile app — it requires:

- Notifications enabled for the Claude app (phone OS settings + in-app settings).
- This session still running when the deploy completes (the agent must be actively
  watching the run, as this skill does). If the session has ended, no notification
  fires — the watch only works while the session is alive.

The agent does not have a direct push-notification tool; emitting the completion
message proactively is what triggers the app's push.

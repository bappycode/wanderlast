# Agent session logs

One markdown file per working session, named `YYYY-MM-DD-short-topic.md`.
Append a new file after every working session (do not overwrite old ones).

Each entry should record, tersely:

- **Date / agent** — when and which model/harness did the work
- **What was done** — files created/changed and why
- **Decisions & rationale** — what was chosen over alternatives and based on what evidence
- **Not done / pending** — anything the user might follow up on
- **Files touched** — exact paths, so a later session can jump straight to them

Purpose: a future agent reads these logs first to know what was already done,
why the code is shaped the way it is, and what the user previously asked for,
then continues from there instead of redoing or undoing prior work.

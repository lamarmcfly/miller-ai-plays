// Community submissions need no backend. By default the form opens a
// pre-filled GitHub issue on the project repo, where maintainers review it
// before anything is published. Set NEXT_PUBLIC_COMMUNITY_FORM_URL to send
// submissions to your own form endpoint instead.

export const REPO_URL = "https://github.com/lamarmcfly/miller-ai-plays";

// GitHub rejects very long query strings; stay well under the limit.
const MAX_URL_LENGTH = 7000;

export type Submission = {
  cohort: string;
  category: string;
  examContext: string[];
  title: string;
  tool: string;
  prompt: string;
  outcome: string;
  usefulness: string;
};

export function buildSubmissionBody(s: Submission): string {
  const lines = [
    `**Cohort:** ${s.cohort}`,
    `**Category:** ${s.category}`,
    `**Exam / course:** ${s.examContext.join(", ")}`,
    `**AI tool:** ${s.tool}`,
    `**Usefulness (1-5):** ${s.usefulness || "not rated"}`,
    "",
    "### Prompt or workflow",
    "",
    s.prompt.trim(),
    "",
    "### What happened",
    "",
    s.outcome.trim() || "_Not provided_",
    "",
    "---",
    "_Submitted from the Community Board. Maintainers: review for patient identifiers and licensed exam content before publishing._",
  ];
  return lines.join("\n");
}

export type IssueLink = { url: string; bodyCopied: boolean; fullBody: string };

/**
 * Build the "new issue" link. If the full submission doesn't fit in a URL, the
 * link carries a short placeholder and `fullBody` should be copied to the
 * clipboard for the student to paste.
 */
export function buildIssueLink(s: Submission): IssueLink {
  const fullBody = buildSubmissionBody(s);
  const title = `[Community] ${s.title.trim()}`;
  const make = (body: string) =>
    `${REPO_URL}/issues/new?${new URLSearchParams({
      title,
      body,
      labels: "community-submission",
    }).toString()}`;

  const url = make(fullBody);
  if (url.length <= MAX_URL_LENGTH) return { url, bodyCopied: false, fullBody };

  return {
    url: make("Your submission is on your clipboard. Paste it here (Ctrl/Cmd + V), then press Submit new issue."),
    bodyCopied: true,
    fullBody,
  };
}

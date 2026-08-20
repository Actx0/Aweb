<script>
export const meta = {
  title: 'Why AI agents forget',
  description:
    'Most agent stacks only keep the last N turns. That is a context window, not memory. Here is the failure mode, and how retrieval around the model fixes it.',
  date: '2026-08-20',
  tags: ['Agents', 'Memory'],
}
</script>

<template>
  <p>
    A demo agent looks smart for five minutes. It knows the user’s name, the ticket ID, the plan they are on.
    Then the thread gets long, a new session starts, or the prompt is trimmed — and it asks for the same facts again.
  </p>
  <p>
    That is not a model failure. The model only sees what you put in the next request. If the only “memory” you have is
    the last N messages concatenated into the prompt, you do not have memory. You have a sliding window.
  </p>

  <h2>The sliding window is a trap</h2>
  <p>
    Replaying the transcript is the default because it is easy. It also degrades in a predictable way:
  </p>
  <ul>
    <li>Long threads blow the context window, so older turns are dropped first — usually the ones that contain preferences and constraints.</li>
    <li>Every turn pays for tokens you already sent. Cost and latency climb together.</li>
    <li>A new session, a handoff to another agent, or a retry with a different prompt version starts from zero.</li>
    <li>The model gets better at sounding consistent than at being consistent. It will invent a name it “should” remember.</li>
  </ul>
  <p>
    Support bots, sales assistants, tutors, and coding agents all hit this. The conversation is the wrong unit of storage
    if you care about facts that should survive compression.
  </p>

  <h2>Store facts, retrieve hits</h2>
  <p>
    Production agents need a write path and a read path around the model you already run. On the way in, user turns are
    stored and extracted into short session memories — compact facts, not the full transcript. On the way out, you search
    those memories (and workspace knowledge) and inject only the hits that match the current query.
  </p>
  <p>
    Two calls. You still own the model, the prompt, and the product UI. The memory layer is responsible for persistence
    and retrieval, not for generating the reply.
  </p>

  <h2>What should persist</h2>
  <p>
    Not everything belongs in memory. A good split looks like this:
  </p>
  <ul>
    <li><strong>Session memories</strong> — things true for this user in this conversation: name, account, objections, the bug they already described.</li>
    <li><strong>Workspace knowledge</strong> — things true for the product or team: policies, docs, runbooks, coding conventions.</li>
    <li><strong>The prompt</strong> — instructions for how to behave, not a dumping ground for history.</li>
  </ul>
  <p>
    If you put history in the prompt, you will keep trimming it. If you put it in a store you can search, the next turn
    can ask “what is my name?” and get the fact back in milliseconds instead of hoping it is still in the window.
  </p>

  <h2>What Actx0 is for</h2>
  <p>
    Actx0 is managed memory infrastructure for that write/read loop: session memories, workspace knowledge, semantic
    search, and clients in Python, Node.js, Go, and REST. Retrieval is built to stay in the milliseconds — P99 under 10ms
    on the path we optimize for — so you can call it on every turn without turning the agent into a batch job.
  </p>
  <p>
    If your agent forgets, do not add a bigger context window first. Add a store, extract what matters, and retrieve it
    before the next reply.
  </p>
</template>

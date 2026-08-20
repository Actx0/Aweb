<script>
export const meta = {
  title: 'Session memory vs workspace knowledge',
  description:
    'Agents need two memory layers. Session facts belong to the current conversation. Workspace knowledge is shared, durable, and searchable across users.',
  date: '2026-08-18',
  tags: ['Architecture'],
}
</script>

<template>
  <p>
    One store for “everything the agent might need” sounds simple until you try to retrieve from it. A user’s first name
    and your refund policy should not compete in the same index, with the same lifetime, under the same access rules.
  </p>
  <p>
    Actx0 splits memory the way production agents actually work: <strong>session memories</strong> for the conversation
    in front of you, and <strong>workspace knowledge</strong> for what the product already knows.
  </p>

  <h2>Session memories</h2>
  <p>
    Session memories are extracted from user messages in a given agent session. They are short facts: who the user is,
    what they already tried, which plan they are on, which file they are editing. You search them with the current turn
    as the query and inject the hits — not the whole thread.
  </p>
  <p>
    That extraction step is the point. Replaying the transcript keeps noise (pleasantries, backtracks, tool dumps) in
    the prompt forever. Extracted memories deduplicate and consolidate inside the session, so “my name is Joe” does not
    live as five slightly different sentences.
  </p>
  <p>
    Scope them to the session. A support ticket should not leak into the next customer. A coding agent’s notes about
    <em>this</em> repo checkout should not show up in another workspace.
  </p>

  <h2>Workspace knowledge</h2>
  <p>
    Workspace knowledge is the durable layer: docs, policies, API notes, coding standards, playbooks. It is written
    deliberately (files, URLs, pasted sources) rather than inferred from chat. Many users and many sessions should be
    able to retrieve the same article.
  </p>
  <p>
    This is also where you want auditability. If an agent cites a refund rule, you should be able to see which document
    it retrieved — not reconstruct it from a 40-turn log.
  </p>

  <h2>Why the split matters at retrieve time</h2>
  <p>
    Retrieval quality is mostly about not mixing namespaces. A query like “what is the refund window?” should hit
    knowledge. “What did this user already ask for?” should hit session memories. If both live in one blob, you spend
    tokens on the wrong hits and still miss the right ones.
  </p>
  <p>
    The loop stays the same either way: you run the model; Actx0 stores and searches. Before the next reply, search
    session memories, search knowledge if the question needs it, and put a few compact hits in the prompt.
  </p>

  <h2>A practical rule</h2>
  <ul>
    <li>If it is true for this user, this thread, this ticket — session memory.</li>
    <li>If it should still be true next month for every agent in the workspace — knowledge.</li>
    <li>If it is an instruction (“be concise”, “never mention competitors”) — prompt, not memory.</li>
  </ul>
  <p>
    Get that split right and the rest of the stack gets simpler: smaller prompts, cheaper turns, and an agent that can
    explain <em>why</em> it remembered something.
  </p>
</template>

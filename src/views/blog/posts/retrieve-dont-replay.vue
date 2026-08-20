<script>
export const meta = {
  title: 'Retrieve, don’t replay',
  description:
    'Replaying the full transcript every turn is how agents get slow and expensive. Search compact memories instead, and keep the model call small.',
  date: '2026-08-12',
  tags: ['Performance', 'Cost'],
}
</script>

<template>
  <p>
    The expensive part of an agent is rarely the retrieval call. It is the tokens you send to the model on every turn —
    especially the ones you already sent yesterday.
  </p>
  <p>
    “Just include the full history” is the default in chat UIs. It is also how a hobby prototype turns into a bill you
    cannot explain. Actx0’s bet is narrower: store what matters, retrieve it in milliseconds, inject only the hits.
  </p>

  <h2>What replay actually costs</h2>
  <p>
    Suppose a support session is 30 turns. Most of those tokens are restated context: the product, the account, the
    error string, the workaround that failed. If you concatenate the transcript, turn 31 pays for all of it again.
    The model is also worse at finding the one constraint buried on turn 4.
  </p>
  <p>
    Teams then add summarization. That helps until the summary drops the constraint. Or they raise the context window
    and pay more to stay forgetful for longer.
  </p>

  <h2>The two-call shape</h2>
  <p>
    You still run the model. Around it:
  </p>
  <ol>
    <li>Write the user (and assistant) turns. Extraction runs on user messages and produces compact session memories.</li>
    <li>Before the next completion, search memories — and workspace knowledge when the question needs product truth.</li>
    <li>Put the hits in the prompt. Generate. Repeat.</li>
  </ol>
  <p>
    The search is the cheap, stable part of the stack. Actx0 is built so that retrieval stays in the milliseconds (P99
    under 10ms on the path we publish) so you can afford to do it on every turn, not in a batch after the user has
    already waited.
  </p>

  <h2>What “90% fewer tokens” means</h2>
  <p>
    Token reduction is not a slogan about making the model dumber. It is the difference between shipping a 12k-token
    history and shipping a handful of extracted facts plus the current user message. You keep the facts that change
    the answer. You drop the rest.
  </p>
  <p>
    That only works if extraction is good enough and search is scoped. Session memories should not be a second copy of
    the transcript. They should be the index you wish you had when the window got trimmed.
  </p>

  <h2>When replay is still right</h2>
  <p>
    Short, one-off chats can stay in-window. Tight tool loops sometimes need the last two observations verbatim.
    Replay the <em>working set</em>. Do not treat the working set as the system of record.
  </p>
  <p>
    If the agent has to remember a name, a decision, or a document after the window moves, that belongs in memory
    infrastructure — not in the prompt you will shrink next week.
  </p>
</template>

# LLM Lab Tools Pivot Design

## Goal

Replace the current `/tools` package-selection concept with a Vietnamese-first educational LLM lab that helps complete beginners and developers evaluating LLMs build correct mental models through guided simulations.

## Why This Change

The current `/tools` section is structurally present but product-thin:

- the index page lists tool cards
- the detail pages are mostly static copy
- the recommendation logic is minimal and hard-coded
- the content framing overlaps awkwardly with `/store`

That creates a credibility problem. A full pivot gives `/tools` one clear purpose and makes the section worth promoting in navigation and on the homepage.

## Audience

Primary audiences:

- complete beginners trying to understand how LLM products work
- developers evaluating ChatGPT, Gemini, Claude, and coding agents

Audience needs:

- plain-language explanations without hand-wavy claims
- visual intuition instead of abstract theory
- recognizable real-world examples
- enough rigor to support tool evaluation, not just entertainment

## Product Positioning

`/tools` becomes an educational section named and framed as an LLM lab.

Core promise:

- understand how modern LLM systems behave
- compare concepts using familiar products and agent workflows
- learn through interactive, guided visual explanations

This section should no longer promise AI package selection or shopping assistance. Store recommendation content remains in `/store`, where it already belongs.

## Information Architecture

Keep the existing route structure:

- `/tools`
- `/tools/[slug]`

Repurpose the content collection so each entry represents a guided educational lab instead of a shopping helper.

The three launch labs are:

1. `token-hoat-dong-nhu-the-nao`
2. `llm-xu-ly-input-output-tool-va-thinking-ra-sao`
3. `coding-agent-tim-dung-skill-nhu-the-nao`

The `/tools` index should introduce the section as a learning surface and list the three labs with:

- title
- concise description
- estimated time
- level
- learning outcomes

The detail route should render a guided simulation page for the selected lab.

## Shared UX Model

All three labs should share one interaction shell so the section feels coherent and the implementation stays bounded.

Shared layout:

- hero with title, summary, estimated time, and target audience
- progress rail with 5 to 7 steps
- main visualization stage
- sticky explanation panel in plain Vietnamese
- small control area with sliders, toggles, and presets
- end-of-step summary that explains what changed and why it matters
- final takeaway block with links to relevant blog posts

Shared behaviors:

- the user can move step by step or jump between steps
- each step exposes only a small number of meaningful controls
- preset scenarios help beginners start without guessing
- explanatory copy updates as controls change
- the page clearly labels the experience as an educational simulation

Required content note:

- every lab must state that it is a conceptual model for learning
- the UI must avoid claiming access to private internal behavior of any vendor model

## Lab 1: Token Hoat Dong Nhu The Nao

Purpose:

- explain what tokens are in practice
- show how context windows fill up
- build intuition for prompt length, truncation, cost, and latency

Step outline:

1. choose an example input by length and type
2. visualize text splitting into token-like chunks
3. show context usage across system instructions, chat history, pasted content, and output reserve
4. simulate what happens when the request exceeds the available context
5. compare short, medium, and overloaded prompts
6. summarize practical prompt-writing takeaways

Controls:

- input length
- content type
- chat history amount
- output length reserve

Primary visualization:

- token stack or meter
- context window capacity bar
- before/after state when the prompt grows too large

Important constraint:

- the visualization should present token intuition, not exact tokenizer fidelity

## Lab 2: LLM Xu Ly Input, Output, Tool Va Thinking Ra Sao

Purpose:

- explain the conceptual pipeline from request to answer
- show when a system can answer directly, structure output, call a tool, or reason more deeply
- distinguish visible output from hidden reasoning and tool results

Step outline:

1. choose a request type such as chat, summarization, coding, comparison, search, or agent task
2. classify the request into likely intent and output form
3. toggle whether tools are available, whether fresh information is required, and whether the task is high-risk
4. branch through a conceptual response pipeline
5. compare direct response, tool-assisted response, and deeper reasoning paths
6. summarize what the user sees versus what the system may do internally

Controls:

- request type
- tool availability
- freshness requirement
- risk level

Primary visualization:

- branching pipeline diagram
- step-by-step path highlighting
- side-by-side comparison of answer surface, tool results, and internal reasoning stage

Important constraint:

- the UI must explicitly describe “thinking” as a conceptual internal reasoning stage
- it must not imply raw chain-of-thought access or vendor-specific internal truth

## Lab 3: Coding Agent Tim Dung Skill Nhu The Nao

Purpose:

- explain how a coding agent chooses between direct execution and specialized workflows
- show why repo instructions, scope clarity, testing, and risk signals change the decision
- teach users how to shape tasks so agents pick better workflows

Step outline:

1. choose a task type such as quick edit, bug fix, new feature, review, or refactor
2. toggle repo signals such as instructions present, tests present, ambiguous requirements, risky files, or visual design work
3. map the task to likely workflows such as direct execution, systematic debugging, brainstorming, or planning
4. compare good and bad outcomes when context is missing
5. show how a stronger task description changes the chosen workflow
6. summarize how to help an agent find the right skill faster

Controls:

- task type
- ambiguity level
- risk level
- available instructions or skills
- testing signal

Primary visualization:

- decision tree or routing map
- highlighted path from task characteristics to workflow choice
- side-by-side comparison of weak input versus strong input

Important constraint:

- this lab should explain agent workflow selection clearly without pretending all coding agents behave identically

## Content Model

Update the tools collection metadata so each lab can define:

- `slug`
- `title`
- `description`
- `estimatedMinutes`
- `level`
- `learningOutcomes`
- `stepCount`
- optional related blog references

The lab-specific simulation states and presets should live in structured local data or helper modules rather than being hard-coded inline across route files.

## Component Boundaries

The implementation should separate section shell, lab content, and simulation logic.

Recommended boundaries:

- a shared lab shell component for layout and navigation
- one visualization component per lab
- local helper modules that derive labels, stage states, and summaries from the current controls
- route files that stay thin and mostly map content entries to the right lab component

This keeps the simulations understandable and testable without turning `src/pages/tools/[slug].astro` into one monolithic file.

## Data Flow

Static data flow:

1. the route loads lab metadata from the tools collection
2. the route selects the correct simulation component for the slug
3. the simulation component manages local interactive state
4. helper functions derive the active explanation, highlighted path, metrics, and summaries
5. the UI renders a visual stage and explanation panel from those derived values

No backend, persistence, or external API is required for the first release.

## Visual Direction

The section should feel more like an explorable lab than a storefront.

Visual principles:

- clear educational hierarchy
- bolder diagrams and state transitions than the rest of the site
- distinct but consistent visual language across all three labs
- strong use of panels, tracks, meters, route lines, and staged reveals
- beginner-friendly labels without oversimplifying the logic

The design should still fit the existing site shell, but the tools section should feel intentionally different from product pages.

## Copy Strategy

Copy remains Vietnamese-first.

The lessons should use concrete references to:

- ChatGPT
- Gemini
- Claude
- coding agents

Those examples should anchor the explanation, while the underlying concepts remain model-agnostic.

Tone:

- direct
- concrete
- educational
- honest about approximation

## Migration Scope

This should ship as a full pivot, not a mixed state.

Required migration actions:

- rewrite `/tools` index copy around the LLM lab concept
- replace the existing tool entries with the three educational labs
- remove package-selection framing from tool detail pages
- remove store-oriented tool relationships that only made sense for shopping helpers
- align homepage tools promotion with the new educational positioning

Avoid carrying forward the existing package-selector logic inside the new section.

## Error Handling And Edge Cases

Expected edge cases are simple and local:

- unknown slug should still fall back to normal route handling
- each lab should have safe defaults on first render
- controls should clamp to valid ranges
- explanatory copy should remain useful even in extreme presets

If a lab entry is misconfigured, the page should fail clearly during build rather than degrade silently at runtime.

## Testing

Focus tests on the logic that actually teaches the user something.

Required verification:

- `npm run build`
- unit tests for helper logic that derives stage summaries, classifications, or workflow outcomes from simulation controls

Targeted assertions should cover:

- token lab capacity state changes
- pipeline lab branching behavior
- coding-agent lab workflow routing

The first release does not require end-to-end automation for every visual transition as long as the helper logic is covered and the build is clean.

## Success Criteria

The pivot succeeds if:

- `/tools` has one clear educational purpose
- each lab supports a 10 to 15 minute guided walkthrough
- beginners can understand the core idea without prior prompt-engineering knowledge
- developers evaluating LLM tools can use the labs to compare system behavior concepts
- the section feels materially more useful than the current placeholder tools

## Out Of Scope

- live tokenization using provider APIs
- exact vendor-internal behavior claims
- user accounts or saved progress
- analytics dashboards
- commerce recommendation logic inside the new lab section

## Verification

- `npm run build`
- review the new `/tools` section copy and route behavior against the goals above

export type Project = {
  slug: string
  title: string
  label: string
  summary: string
  problem: string
  solution: string
  tags: string[]
  liveUrl?: string
  accent: 'orange' | 'cyan'
  outcomes: string[]
}

export const projects: Project[] = [
  {
    slug: 'black-box',
    title: 'Black Box',
    label: 'AI agent failure intelligence',
    summary: 'A flight recorder for AI agents that finds the step responsible for a failure, proves the diagnosis and verifies a focused repair.',
    problem: 'When an AI agent produces a wrong answer, ordinary traces show what happened but leave teams debugging backward from the final response. The responsible step can be buried inside retrieval, planning, tool calls or synthesis.',
    solution: 'Black Box records each execution step, ranks likely causes from trace evidence and tests them through counterfactual replay. Its repair flow re-executes only affected steps, preserving trusted work and making the diagnosis inspectable.',
    tags: ['Python', 'FastAPI', 'React', 'Machine learning'],
    accent: 'orange',
    outcomes: ['Step-level execution traces', 'Evidence-backed failure diagnosis', 'Counterfactual replay and verified repair'],
  },
  {
    slug: 'provenyx',
    title: 'Provenyx',
    label: 'Software supply-chain security',
    summary: 'Explainable dependency security for npm projects, available in VS Code, on the web and inside pull requests.',
    problem: 'A routine lockfile update can introduce hundreds of transitive changes. Developers need to know what changed, how a package reaches their application and whether a release matches what their team approved.',
    solution: 'Provenyx analyses package-lock files without installing or running packages. It combines evidence-backed detection rules, dependency paths, OSV checks and release verification in a VS Code extension, web dashboard and pull-request trust gate.',
    tags: ['Next.js', 'FastAPI', 'VS Code', 'Solidity'],
    liveUrl: 'https://provenyx.vercel.app/',
    accent: 'cyan',
    outcomes: ['Safe lockfile analysis with explicit consent', 'Interactive dependency paths and evidence', 'Pull-request checks and release verification'],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

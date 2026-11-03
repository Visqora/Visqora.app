import type { AssetName } from '@/components/asset'

// Tech name → logo (sheet 3). Used by the toolbox strip and the product tags; names not listed render without a logo.
export const TECH_LOGO: Record<string, AssetName> = {
  React: 'set3/react', 'Next.js': 'set3/nextjs', TypeScript: 'set3/typescript', Python: 'set3/python', FastAPI: 'set3/fastapi',
  PostgreSQL: 'set3/postgresql', Docker: 'set3/docker', Kubernetes: 'set3/kubernetes', GitHub: 'set3/github', Git: 'set3/git',
  Figma: 'set3/figma', 'VS Code': 'set3/vscode', Solidity: 'set3/solidity', 'Machine learning': 'set3/ml-chip',
}

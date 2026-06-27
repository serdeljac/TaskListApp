export interface GoalTypes {
  id: string
  text: string
  progress: number // 0–100
}

export type TagKind = 'work' | 'health' | 'personal'

export interface TaskTypes {
  id: string
  text: string
  done: boolean
  tag?: TagKind
}

export interface PageHeaderTypes {
  title: string
  subtitle?: string
  actionLabel?: string
}
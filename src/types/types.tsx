export interface GoalTypes {
  id: string
  text: string
  progress: number // 0–100
}

export type TagKindTypes = 'work' | 'health' | 'personal'

export interface TaskTypes {
  id: string
  text: string
  done: boolean
  tag?: TagKindTypes
}

export interface PageHeaderTypes {
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
}

export interface NoteTypes {
      id: string
      title: string
      body: string
      date: string
      color: 'yellow' | 'purple' | 'green' | 'blue'
  }

export interface GoalCardTypes {
id: string
title: string
tag: TagKindTypes
current: number
target: number
unit: string
}

export interface StatCardTypes {
    icon: string,
    label: string,
    value: string,
    hint?: string,
    accent?: string
}
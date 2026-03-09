// src/types/index.ts

export type Role =
  | 'Founder/CEO'
  | 'Hiring Manager'
  | 'Head of People/Talent'
  | 'Recruiter/Agency'
  | 'Other'

export type CompanySize = '1-10' | '11-50' | '51-200' | '201-1000' | '1000+'

export type HiresPerYear = '0-5' | '6-20' | '21-50' | '51-100' | '100+'

export type PrimaryPain =
  | 'resume screening'
  | 'scheduling'
  | 'consistency'
  | 'quality'
  | 'compliance/audit'
  | 'bandwidth'

export interface ApplicationFormData {
  full_name: string
  work_email: string
  company_name: string
  role: Role
  company_size: CompanySize
  hires_per_year: HiresPerYear
  primary_pain: PrimaryPain[]
  current_tools?: string
  notes?: string
  wants_onboarding_call: boolean
}

export interface ApplicationRecord extends ApplicationFormData {
  id: string
  created_at: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  referrer?: string
  user_agent?: string
}

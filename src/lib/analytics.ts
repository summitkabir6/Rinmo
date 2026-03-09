// src/lib/analytics.ts
// TODO: swap console.log calls for PostHog or Segment when ready
// e.g., import posthog from 'posthog-js'; posthog.capture(event, props)

type AnalyticsEvent =
  | 'early_access_cta_click'
  | 'apply_view'
  | 'apply_submit_success'
  | 'apply_submit_error'

export function track(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  console.log('[Analytics]', event, properties ?? {})
  // TODO: posthog.capture(event, properties)
}

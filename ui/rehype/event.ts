type AllowedPropertyValue = string | number | boolean | null;

type EventName =
  | "copy_npm_command"
  | "copy_usage_import_code"
  | "copy_usage_code"
  | "copy_primitive_code"
  | "copy_theme_code"
  | "copy_block_code"
  | "copy_chunk_code"
  | "enable_lift_mode"
  | "copy_chart_code"
  | "copy_chart_theme"
  | "copy_chart_data"
  | "copy_color";

export type Event = {
  name: EventName;
  properties?: Record<string, AllowedPropertyValue>;
};

export function trackEvent(input: Event): void {
  fetch("/api/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: input.name,
      properties: input.properties,
      timestamp: Date.now()
    }),
    keepalive: true
  }).catch(() => {
    // Jangan sampai analytics mengganggu aplikasi
  });

  const events = JSON.parse(localStorage.getItem("analytics_events") ?? "[]");
  events.push({
    ...input,
    timestamp: Date.now()
  });
  localStorage.setItem("analytics_events", JSON.stringify(events));
}

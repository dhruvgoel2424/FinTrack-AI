import type { ReactNode } from "react";

// A dark rounded box used for every section of the dashboard.
type PanelProps = {
  title: string;
  action?: string;
  children: ReactNode;
  className?: string;
};

function Panel({ title, action, children, className = "" }: PanelProps) {
  return (
    <section className={`rounded-3xl bg-card p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">{title}</h2>
        {action ? (
          <span className="text-xs text-muted-foreground underline">{action}</span>
        ) : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default Panel;

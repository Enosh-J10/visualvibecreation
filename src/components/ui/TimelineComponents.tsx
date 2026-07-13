import React from "react";

export function TimelineContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border-l border-border-standard ml-2 pl-0.5 space-y-8 py-2">
      {children}
    </div>
  );
}

export function TimelineStep({
  year,
  title,
  subtitle,
  children,
}: {
  year: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative pl-8 group">
      {/* Visual Marker (Electric Teal Node) */}
      <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-teal border border-bg-primary z-10 transition-transform duration-300 group-hover:scale-125 shadow shadow-accent-teal/50" />
      
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h4 className="font-display text-sm font-bold text-white group-hover:text-accent-cyan transition-colors duration-200">
              {title}
            </h4>
            <span className="text-xs text-text-secondary font-medium">{subtitle}</span>
          </div>
          <span className="text-[10px] font-mono text-accent-cyan bg-accent-teal/10 border border-accent-teal/20 px-2 py-0.5 rounded self-start sm:self-center">
            {year}
          </span>
        </div>
        {children && <div className="text-xs text-text-secondary leading-relaxed pt-1">{children}</div>}
      </div>
    </div>
  );
}

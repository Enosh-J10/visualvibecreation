import React from "react";

export function TimelineContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border-l border-border-standard ml-2 pl-0.5 space-y-8 py-2">
      {/* Low-opacity cyan gradient line layered above the solid timeline axis */}
      <div 
        className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-cyan/10 via-accent-cyan/40 to-accent-cyan/10 pointer-events-none" 
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

export function TimelineStep({
  year,
  title,
  subtitle,
  children,
  icon,
}: {
  year: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative pl-8 group">
      {/* Visual Marker (Icon or default Electric Teal Node) */}
      {icon ? (
        <div className="absolute left-[-14px] top-0 h-7 w-7 rounded-full bg-bg-secondary border border-border-standard flex items-center justify-center text-accent-cyan z-10 transition-transform duration-300 group-hover:scale-110 shadow-md">
          {icon}
        </div>
      ) : (
        <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-teal border border-bg-primary z-10 transition-transform duration-300 group-hover:scale-125 shadow shadow-accent-teal/50" />
      )}
      
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

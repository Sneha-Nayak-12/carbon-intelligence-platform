import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: { label: string; path?: string }[];
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  action,
}) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-end">
      <div>
        {/* Breadcrumbs */}
        <nav className="mb-2.5 flex items-center space-x-1 text-xs font-medium text-slate-400">
          <Link to="/" className="hover:text-slate-600 transition-colors">
            GreenASHA
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="h-3 w-3 text-slate-300" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-slate-600 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-500 font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        
        {/* Title & Subtitle */}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl font-heading">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-slate-500 font-light leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Action Trigger Slot */}
      {action && (
        <div className="flex items-center gap-3 self-start md:self-end">
          {action}
        </div>
      )}
    </div>
  );
};

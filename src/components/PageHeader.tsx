
import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

const PageHeader = ({ title, description, actions }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">{title}</h1>
          {description && <p className="mt-2 text-lg text-gray-600">{description}</p>}
        </div>
        {actions && <div className="mt-4 md:mt-0">{actions}</div>}
      </div>
      <div className="mt-4 h-1 w-32 bg-skyblue-500 rounded"></div>
    </div>
  );
};

export default PageHeader;

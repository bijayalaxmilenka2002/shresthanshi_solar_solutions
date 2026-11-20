import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Container } from '../ui/Container';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  inverse?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, inverse = false }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`ui-breadcrumbs ${inverse ? 'ui-breadcrumbs--inverse' : ''}`}
    >
      <Container>
        <ol className="ui-breadcrumbs__list">
          <li className="ui-breadcrumbs__item">
            <Link to="/" className="ui-breadcrumbs__link">
              <Home size={14} aria-hidden="true" />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label} className="ui-breadcrumbs__item">
                <ChevronRight size={14} className="ui-breadcrumbs__sep" aria-hidden="true" />
                {isLast || !item.path ? (
                  <span className="ui-breadcrumbs__current" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.path} className="ui-breadcrumbs__link">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
};


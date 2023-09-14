// components/PaginationComponent.tsx
import Pagination from '@/components/pagination-button';
import React from 'react';


interface PaginationComponentProps {
  pageCount: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ pageCount, activePage, onPageChange }) => (
  <Pagination
    pageCount={pageCount}
    activePage={activePage}
    onPageChange={onPageChange}
  />
);

export default PaginationComponent;
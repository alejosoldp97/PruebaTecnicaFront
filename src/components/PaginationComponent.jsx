import React from 'react'
import { Pagination, PaginationContent ,PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../src/components/ui/pagination';


const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const showPages = 4;
  const pages = Array.from({ length: totalPages });

  return (
    <Pagination className='flex justify-end'>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationPrevious className={'cursor-pointer'} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
        )}
        {pages.map((_, index) => {
          const page = index + 1;
          const isCurrent = page === currentPage;
          const isWithinRange = Math.abs(page - currentPage) <= showPages;

          if (isWithinRange) {
            return (
              <PaginationItem key={page} className='cursor-pointer'>
                <PaginationLink onClick={() => onPageChange(page)} isActive={isCurrent} aria-label={`Go to page ${page}`}>{page}</PaginationLink>
              </PaginationItem>
            );
          } else if (index === 0 || (index === pages.length - 1 && showPages < totalPages)) {
            // Handle first or last page, considering showPages
            return (
              <PaginationItem key={page} className='cursor-pointer'>
                <PaginationLink onClick={() => onPageChange(page)} isActive={isCurrent} aria-label={`Go to page ${page}`}>{page}</PaginationLink>
              </PaginationItem>
            );
          } else if (index === 1 || index === pages.length - 2) {
            return <PaginationEllipsis key={index} disabled aria-label="More pages..." />;
          }

          return null;
        })}

        {currentPage < totalPages && (
          <PaginationNext onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={'cursor-pointer'}/>

        )}
      </PaginationContent>
    </Pagination>
  );
};


export default PaginationComponent



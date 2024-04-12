import React from 'react'
import { Pagination, PaginationContent ,PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../src/components/ui/pagination';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {

  const showPages = 2;
  const pages = Array.from({ length: totalPages });

  return (
    <Pagination>
      <PaginationContent>
        
        <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
  
        {pages.map((_, index) => {
          const page = index + 1;
          const isCurrent = page === currentPage;
          const isWithinRange = Math.abs(page - currentPage) <= showPages;
  
          if (isWithinRange) {
            return (
              <PaginationItem key={index + 1}  >
                <PaginationLink onClick={() => onPageChange(page)} isActive={isCurrent} >{page}</PaginationLink> 
              </PaginationItem>
            );
          } else if (index === 0 || index === pages.length - 1) {
            return (
              <PaginationItem key={index + 1}  >
                <PaginationLink onClick={() => onPageChange(page)} isActive={isCurrent} >{page}</PaginationLink> 
              </PaginationItem>
            );
          } else if (index === 1 || index === pages.length - 2) {
            return <PaginationEllipsis key={index} disabled />;
          }
  
          return null;
        })}
  
        <PaginationNext onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </PaginationContent>    
    </Pagination>
  )
}

export default PaginationComponent


import React from "react";
import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return pages.map((page) => (
      <PaginationItem key={page}>
        <PaginationLink
          href="#"
          isActive={page === currentPage}
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(page);
          }}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <PaginationShadcn>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={`${
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
            }}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            href="#"
            className={`${
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShadcn>
  );
};

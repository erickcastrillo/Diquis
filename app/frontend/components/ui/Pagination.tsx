
import React from "react";

export const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps) => {
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange || [];
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  t: (key: string, params?: object) => string;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  currentPage,
  totalCount,
  pageSize,
  siblingCount = 1,
  t,
  totalPages,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  const onPrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        type="button"
        className="btn btn-text btn-sm"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        {t("common.previous")}
      </button>
      <div className="flex items-center space-x-1">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <div key={`dots-${index}`} className="tooltip inline-block">
                <button
                  type="button"
                  className="tooltip-toggle btn btn-text btn-square btn-sm group"
                  aria-label="More Pages"
                >
                  <span className="icon-[tabler--dots] size-4.5 group-hover:hidden"></span>
                  <span className="icon-[tabler--chevrons-right] rtl:rotate-180 hidden size-4.5 shrink-0 group-hover:block"></span>
                  <span
                    className="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible"
                    role="tooltip"
                  >
                    <span className="tooltip-body">{t("common.more_pages")}</span>
                  </span>
                </button>
              </div>
            );
          }

          return (
            <button
              key={pageNumber}
              type="button"
              className={`btn btn-sm btn-text btn-square ${
                pageNumber === currentPage ? "btn-primary" : ""
              }`}
              onClick={() => onPageChange(pageNumber as number)}
              aria-current={pageNumber === currentPage ? "page" : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="btn btn-text btn-sm"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        {t("common.next")}
      </button>
    </div>
  );
};

export default Pagination;

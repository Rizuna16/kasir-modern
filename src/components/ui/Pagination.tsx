import Button from "./Button";

interface PaginationProps {
  currentPage: number;

  totalPages: number;

  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div
      className="
        mt-6

        flex

        items-center

        justify-between
      "
    >
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Sebelumnya
      </Button>

      <span
        className="
          text-sm

          text-gray-600

          dark:text-gray-300
        "
      >
        Halaman {currentPage} dari {totalPages}
      </span>

      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Berikutnya →
      </Button>
    </div>
  );
}

import type { ReactNode } from "react";

interface FilterBarProps {
  search?: ReactNode;

  filter?: ReactNode;

  action?: ReactNode;

  reset?: ReactNode;
}

export default function FilterBar({
  search,
  filter,
  action,
  reset,
}: FilterBarProps) {
  return (
    <div
      className="
        flex
        flex-col

        gap-3

        md:flex-row
        md:items-center
        md:justify-between

        mb-4
      "
    >
      <div
        className="
          flex
          flex-1

          flex-col

          gap-3

          sm:flex-row
          sm:items-center
        "
      >
        {search && <div className="flex-1">{search}</div>}

        {filter && <div>{filter}</div>}

        {reset && <div>{reset}</div>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

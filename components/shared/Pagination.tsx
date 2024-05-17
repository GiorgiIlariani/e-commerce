import { Pagination } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type PaginationComponentProps = {
  count: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export function PaginationComponent({
  count,
  page,
  setPage,
}: PaginationComponentProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Calculate the total number of pages
  const totalPages = Math.ceil(count / 12);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(`${pathname}?/page=${value}`);
  };

  return (
    <div className="w-full flex items-center justify-center absolute bottom-16">
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </div>
  );
}

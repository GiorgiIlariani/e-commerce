import { Skeleton } from "@mui/material";

const MyProductsLoader = () => {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="w-2/5 md:w-1/5 flex items-center gap-3">
        <Skeleton variant="rectangular" width={15} height={15} />
        <Skeleton variant="rectangular" width={80} height={80} />
      </div>

      <div className="w-1/5 hidden md:block">
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="text" width={150} height={20} />
      </div>

      <div className="w-1/5">
        <Skeleton variant="text" width={100} height={20} />
      </div>

      <div className="w-2/5 md:w-1/5 flex items-center justify-end gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </div>
    </div>
  );
};

export default MyProductsLoader;

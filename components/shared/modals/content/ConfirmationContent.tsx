export const ConfirmationModalContent = ({
  remainingBalance,
  additionalFundsNeeded,
  productDetails,
  userBalance,
}: {
  remainingBalance: number;
  additionalFundsNeeded: number;
  productDetails: Product | undefined;
  userBalance: number;
}) => {
  return (
    <div className="space-y-4">
      {remainingBalance >= 0 ? (
        <>
          You are about to buy the product:{" "}
          <span className="font-semibold">{productDetails?.name}</span>
        </>
      ) : (
        <>
          You do not have enough balance to buy the product:{" "}
          <span className="font-semibold">{productDetails?.name}</span>
        </>
      )}
      <div className="flex justify-between">
        <span>Product Price:</span>
        <span className="font-medium">{productDetails?.price} ₾</span>
      </div>
      <div className="flex justify-between">
        <span>Your Balance:</span>
        <span className="font-medium">{userBalance} ₾</span>
      </div>
      {remainingBalance >= 0 ? (
        <div className="flex justify-between">
          <span>Balance After Purchase:</span>
          <span className="text-[#4a6cfa] font-medium">
            {remainingBalance} ₾
          </span>
        </div>
      ) : (
        <div className="flex justify-between text-red-600">
          <span>Additional Funds Needed:</span>
          <span className="text-[#4a6cfa] font-medium">
            {additionalFundsNeeded} ₾
          </span>
        </div>
      )}
    </div>
  );
};

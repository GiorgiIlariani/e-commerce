export const FillBalanceModalContent = ({
  user,
  amount,
}: {
  user: UserDetailsTypes | undefined;
  amount: number;
}) => {
  return (
    <div className="text-left leading-relaxed">
      <div className="mb-2 text-xl font-semibold">Payment Details</div>
      <div className="mb-1 text-base font-normal">
        <strong>Amount to Fill:</strong> {amount}.00 ₾
      </div>
      <div className="mb-1 text-base font-normal">
        <strong>Current Balance:</strong> {user?.balance}.00 ₾
      </div>
      <div className="mb-1 text-base font-medium flex items-center gap-2">
        <strong>New Balance:</strong>
        <p className="text-green-600">{user && user?.balance + amount}.00 ₾</p>
      </div>
    </div>
  );
};

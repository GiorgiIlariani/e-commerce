export const TransferConfirmationModalContent = ({
  user,
  amount,
}: {
  user: UserDetailsTypes | undefined;
  amount: number;
}) => {
  return (
    <div className="text-left leading-relaxed">
      <div className="mb-2 text-xl font-semibold">Transaction Details</div>
      <div className="mb-1 text-base font-normal">
        <strong>Amount to Transfer:</strong> {amount}.00 ₾
      </div>
      <div className="mb-1 text-base font-normal">
        <strong>Current Balance:</strong> {user?.balance}.00 ₾
      </div>
      <div className="mb-1 text-base font-medium flex items-center gap-2">
        <strong>New Balance:</strong>
        <p className="text-green-600">{user && user.balance - amount}.00 ₾</p>
      </div>
      {/* <div className="mb-1 text-base font-normal">
        <strong>Receiver:</strong> {receiver?.first_name} {receiver?.last_name}
      </div> */}
    </div>
  );
};

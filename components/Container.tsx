export const CenterContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full min-h-screen justify-center items-center p-8">
      {children}
    </div>
  );
};

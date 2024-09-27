const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white-100 ">
      {children}
    </div>
  );
};

export default Container;

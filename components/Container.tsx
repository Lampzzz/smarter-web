const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen grid justify-center items-center bg-[#F6F6F6] ">
      {children}
    </div>
  );
};

export default Container;

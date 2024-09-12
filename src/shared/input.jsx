export const Input = (props) => {
  return (
    <input
      {...props}
      className="
              appearance-none
              block px-3 py-1.5
              w-1/2 m-3 h-10
              rounded-xl border-0
              text-gray-900 placeholder:text-gray-400
              ring-2 ring-inset ring-[#FEE715] focus:ring-2 focus:ring-inset focus:ring-black
              shadow-sm sm:leading-6
              "
    />
  );
};

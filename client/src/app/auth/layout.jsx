export default function AuthLayout({ children }) {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <img
        src="https://images3.alphacoders.com/866/866852.jpg"
        className="w-full h-full  object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full custom-gradient-login"></div>
      {children}
    </div>
  );
}



export default function Btn({color, children }) {
  return (
    <div className={`px-8 py-4 text-3xl font-bold bg-${color}-500 border-white rounded-full flexMid hover:bg-${color}-600`}>
      {children}
    </div>
  );
}

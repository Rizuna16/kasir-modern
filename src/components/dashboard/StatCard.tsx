interface Props {
  title: string;

  value: string | number;

  icon: string;

  color: string;
}

export default function StatCard({
  title,

  value,

  icon,

  color,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-2xl font-bold mt-2">{value}</h2>
        </div>

        <div
          className={`
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            text-xl
            ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

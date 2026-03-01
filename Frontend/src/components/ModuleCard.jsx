import { Link } from "react-router-dom";

export default function ModuleCard({
  title,
  description,
  image,
  href,
  color,
  emoji,
}) {

  console.log(image)

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ borderTop: `4px solid ${color}` }}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div
          className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-md"
          style={{ backgroundColor: color }}
        >
          <span role="img" aria-label={title}>
            {emoji}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-xl font-extrabold text-card-foreground">{title}</h3>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <Link
          to={href}
          className="mt-2 inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-bold text-[#ffffff] shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          }}
        >
          Start Module
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
            {"\u2192"}
          </span>
        </Link>
      </div>
    </div>
  );
}

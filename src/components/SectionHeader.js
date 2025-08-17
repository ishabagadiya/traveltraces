export default function SectionHeader({ title, subtitle, className = "" }) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-2xl sm:text-4xl font-bold text-secondary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-xl text-secondary/70 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

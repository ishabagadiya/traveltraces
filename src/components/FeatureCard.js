export default function FeatureCard({ icon, title, desc, className = "" }) {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-md border border-secondary/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      <div className="text-2xl sm:text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-secondary mb-3">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-secondary/70 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

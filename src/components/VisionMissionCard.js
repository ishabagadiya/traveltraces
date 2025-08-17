export default function VisionMissionCard({ icon, title, content, isList = false }) {
  return (
    <div className="text-center">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-secondary/10 h-full">
        <div className="w-20 h-20 bg-secondary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl">{icon}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-4">
          {title}
        </h3>
        {isList ? (
          <ul className="text-xs sm:text-sm text-secondary/80 leading-relaxed space-y-3 text-left">
            {content.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-secondary mt-1">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs sm:text-sm text-secondary/80 leading-relaxed">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

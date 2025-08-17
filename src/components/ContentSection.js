export default function ContentSection({ title, content, className = "", bgColor = "" }) {
  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${bgColor}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-xl sm:text-3xl font-bold text-secondary mb-6">
            {title}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-3xl p-8 sm:p-12 border border-secondary/10">
          {Array.isArray(content) ? (
            content.map((paragraph, index) => (
              <p key={index} className="text-xs sm:text-sm text-secondary/80 leading-relaxed mb-6 last:mb-0">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-xs sm:text-sm text-secondary/80 leading-relaxed">
              {content}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

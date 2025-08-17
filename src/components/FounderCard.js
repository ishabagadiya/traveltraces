import Image from "next/image";

export default function FounderCard({ photo, name, role, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-secondary/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="text-center mb-6">
        <div className="w-32 h-32 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border-4 border-secondary/10 group-hover:border-secondary/20 transition-all duration-300 relative">
          {photo ? (
            <Image
              src={photo}
              alt={name}
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <span className="text-3xl">👤</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-2 group-hover:text-secondary/90 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm sm:text-xl text-secondary/60 font-medium">
          {role}
        </p>
      </div>
      <p className="text-xs sm:text-sm text-secondary/80 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

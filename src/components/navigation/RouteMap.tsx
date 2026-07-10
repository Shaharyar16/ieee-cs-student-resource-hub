import { motion } from 'framer-motion';

interface RouteMapProps {
  entranceName: string;
  destinationName: string;
}

// Static placeholder floor-plan illustration with an animated route line
// connecting the chosen entrance marker to the destination marker.
export default function RouteMap({ entranceName, destinationName }: RouteMapProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <svg viewBox="0 0 500 320" className="w-full" role="img" aria-label={`Route from ${entranceName} to ${destinationName}`}>
        <rect x="10" y="10" width="480" height="300" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

        {/* Rooms */}
        <rect x="30" y="30" width="90" height="60" rx="6" fill="#eaf3fb" stroke="#00629b" strokeWidth="1.5" />
        <text x="75" y="65" textAnchor="middle" fontSize="11" fill="#00629b">Room 101</text>

        <rect x="140" y="30" width="90" height="60" rx="6" fill="#eaf3fb" stroke="#00629b" strokeWidth="1.5" />
        <text x="185" y="65" textAnchor="middle" fontSize="11" fill="#00629b">Room 102</text>

        <rect x="360" y="30" width="110" height="60" rx="6" fill="#fff7ed" stroke="#ff6c0c" strokeWidth="1.5" />
        <text x="415" y="60" textAnchor="middle" fontSize="11" fill="#ff6c0c">Notice Board</text>

        {/* Corridor */}
        <rect x="30" y="140" width="440" height="40" rx="4" fill="#f1f5f9" stroke="#cbd5e1" />
        <text x="250" y="164" textAnchor="middle" fontSize="11" fill="#64748b">Main Corridor</text>

        {/* Stairs */}
        <rect x="400" y="200" width="70" height="60" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="435" y="234" textAnchor="middle" fontSize="11" fill="#92400e">Stairs</text>

        {/* Destination lab */}
        <rect x="30" y="230" width="120" height="70" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
        <text x="90" y="269" textAnchor="middle" fontSize="12" fontWeight={600} fill="#047857">
          {destinationName}
        </text>

        {/* Entrance marker */}
        <motion.circle
          cx="60"
          cy="160"
          r="7"
          fill="#ff6c0c"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="60" y="190" textAnchor="middle" fontSize="10" fill="#ff6c0c" fontWeight={600}>
          {entranceName}
        </text>

        {/* Destination marker */}
        <motion.circle
          cx="90"
          cy="245"
          r="7"
          fill="#10b981"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />

        {/* Animated route path: entrance -> corridor -> near notice board -> stairs -> destination */}
        <motion.path
          d="M 60 160 L 250 160 L 415 160 L 435 200 L 435 230 L 200 260 L 90 245"
          fill="none"
          stroke="#ff6c0c"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

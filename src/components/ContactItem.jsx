import { Link } from "react-router-dom";

function getAvatarColor(name) {
  const colors = [
    "from-pink-500 to-orange-400",
    "from-blue-400 to-indigo-500",
    "from-teal-400 to-green-400",
    "from-purple-500 to-pink-400",
    "from-yellow-400 to-red-400",
  ];
  if (!name) return colors[0];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function ContactItem({ contact, onDelete }) {
  const avatarColor = getAvatarColor(contact.name);
  const initial = contact.name?.charAt(0) || "?";

  return (
    <div
      className="bg-white/60 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-6 
                flex flex-col sm:flex-row items-start sm:items-center justify-between
                hover:shadow-2xl hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]
                transition-transform transition-shadow transition-colors duration-300 
                group max-w-xl mx-auto"
    >
      {/* Left: Avatar and Contact details */}
      <div className="flex items-center sm:items-start min-w-0 w-full sm:w-auto mb-4 sm:mb-0">
        <span
          className={`flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br ${avatarColor} 
                     text-white font-bold text-2xl shadow-md mr-6 border-2 border-white shrink-0`}
          aria-label={`Avatar for ${contact.name}`}
        >
          {initial}
        </span>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 min-w-0 w-full max-w-xs sm:max-w-none">
          <span className="font-semibold text-gray-700">Name :</span>
          <span className="text-gray-900 truncate">{contact.name}</span>

          <span className="font-semibold text-gray-700">Email :</span>
          <span className="text-gray-700 truncate break-words">{contact.email}</span>

          <span className="font-semibold text-gray-700">Mobile :</span>
          <span className="text-gray-700 truncate">{contact.phone}</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 flex-shrink-0 w-full sm:w-auto">
        <div className="relative group/action w-full sm:w-auto">
          <Link
            to={`/edit/${contact._id}`}
            className="flex justify-center sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold
                       bg-gradient-to-r from-yellow-400 to-yellow-500
                       text-white rounded-xl shadow hover:shadow-xl hover:brightness-110 hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 active:scale-[0.97]
                       transition-all duration-200 w-full"
            aria-label={`Edit contact ${contact.name}`}
          >
            <span role="img" aria-label="Edit">
              ✏️
            </span>
            Edit
          </Link>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/action:opacity-100
                           px-2 py-1 text-xs bg-gray-900 text-white rounded shadow transition
                           pointer-events-none z-10">
            Edit Contact
          </span>
        </div>
        <div className="relative group/action w-full sm:w-auto">
          <button
            onClick={() => onDelete(contact._id)}
            className="flex justify-center sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold
                       bg-gradient-to-r from-red-500 to-pink-500
                       text-white rounded-xl shadow hover:shadow-xl hover:brightness-110 hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-[0.97]
                       transition-all duration-200 w-full"
            aria-label={`Delete contact ${contact.name}`}
          >
            <span role="img" aria-label="Delete">
              🗑️
            </span>
            Delete
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/action:opacity-100
                           px-2 py-1 text-xs bg-gray-900 text-white rounded shadow transition
                           pointer-events-none z-10">
            Delete Contact
          </span>
        </div>
      </div>
    </div>
  );
}

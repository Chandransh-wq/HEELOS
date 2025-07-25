import React from 'react';
import {
  FaArrowCircleUp,
  FaArrowDown,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaMinusCircle,
} from 'react-icons/fa';

type Subtask = {
  name: string;
  completion: number;
  color: string;
};

type CardType = {
  name: string;
  difficulty: string;
  description: string;
  endBy: string;
  priority: string;
  status: string;
  subtasks?: Subtask[];
};

type TabTableProp = {
  darkMode: boolean;
  arr: CardType[];
};

const TabTable: React.FC<TabTableProp> = ({ darkMode, arr }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'hard':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-400';
      case 'easy':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="w-full overflow-x-auto px-4 py-6 flex">
      <div className="flex gap-2 w-[10rem] min-w-fit">
        {arr.map((card, idx) => (
          <div
            key={idx}
            className={`min-w-[20em] md:min-w-[23em] max-h-[25em] p-5 rounded-lg shadow-md border ${
              darkMode
                ? 'bg-zinc-800 border-gray-700 text-white'
                : 'bg-white border-gray-200 text-black'
            } transition-transform hover:scale-[1.02]`}
          >
            {/* Header */}
            <div className="flex items-center gap-5 mb-2">
              <div className={`h-4 w-4 rounded-full ${getDifficultyColor(card.difficulty)}`} />
              <h3 className="font-semibold text-lg text-left">{card.name}</h3>
            </div>

            {/* Description */}
            <p
              className={`text-sm text-left mb-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              } line-clamp-2`}
            >
              {card.description}
            </p>

            {/* Deadline / Priority / Status */}
            <div
              className={`text-sm mb-4 flex items-center justify-between gap-5 border-y py-4 ${
                darkMode ? 'text-gray-300 border-gray-700/40' : 'text-gray-600 border-gray-200'
              }`}
            >
              {/* Deadline */}
              <div className="flex items-center gap-2">
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Deadline:</span>
                <span>{new Date(card.endBy).toLocaleDateString()}</span>
              </div>

              {/* Priority */}
              <div className="flex items-center gap-2">
                {card.priority === 'high' && (
                  <span className="text-red-500 flex items-center gap-1">
                    <FaArrowCircleUp className="text-base" />
                  </span>
                )}
                {card.priority === 'medium' && (
                  <span className="text-yellow-500 flex items-center gap-1">
                    <FaMinusCircle className="text-base" />
                  </span>
                )}
                {card.priority === 'low' && (
                  <span className="text-green-500 flex items-center gap-1">
                    <FaArrowDown className="text-base" />
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                {card.status === 'completed' && (
                  <span className="text-green-500 flex items-center gap-1">
                    <FaCheckCircle className="text-base" />
                  </span>
                )}
                {card.status === 'overdue' && (
                  <span className="text-red-500 flex items-center gap-1">
                    <FaExclamationCircle className="text-base" />
                  </span>
                )}
                {card.status === 'pending' && (
                  <span className="text-yellow-500 flex items-center gap-1">
                    <FaClock className="text-base" />
                  </span>
                )}
              </div>
            </div>

            {/* Subtasks */}
            {card.subtasks?.length > 0 && (
              <div className="mt-4 flex flex-col gap-3 max-h-[12em] overflow-y-auto">
                {card.subtasks.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-2 rounded-md ${
                      darkMode ? 'bg-zinc-700' : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{st.name}</span>
                      <span className="text-xs text-gray-400">{st.completion}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-300 rounded">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${st.completion}%`,
                          backgroundColor: st.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabTable;

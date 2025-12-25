const { useState } = React;

const Lock = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const Unlock = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);

const MapPin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const StateGuess = () => {
  const [currentClue, setCurrentClue] = useState(0);
  const [unlockedClues, setUnlockedClues] = useState([0]);
  const [showFinal, setShowFinal] = useState(false);
  const [feedback, setFeedback] = useState('');

  const clues = [
    {
      id: 0,
      title: "Start Your Journey!",
      question: "We're going to a state that borders the country of Mexico. Which of these states does that?",
      options: ["Oregon", "Nevada", "Arizona"],
      correct: 2,
      hint: "Look at a map - which states are on the southern border with Mexico?"
    },
    {
      id: 1,
      title: "Clue #2",
      question: "This state has the most people living in it of any U.S. state - almost 40 million! Which state is it?",
      options: ["Texas", "New York", "Florida"],
      correct: 0,
      hint: "It's the most populous state in the whole country!"
    },
    {
      id: 2,
      title: "Clue #3",
      question: "This state is home to the tallest trees in the world AND the largest trees by volume. What are these giant trees called?",
      options: ["Sequoias and Redwoods", "Oak and Maple Trees", "Pine and Fir Trees"],
      correct: 0,
      hint: "Some of these trees are over 2,000 years old and taller than the Statue of Liberty!"
    },
    {
      id: 3,
      title: "Clue #4",
      question: "This state has both the highest point in the continental U.S. (Mount Whitney) AND the lowest point (Death Valley). Which state has such extreme geography?",
      options: ["Colorado", "Arizona", "Nevada"],
      correct: 0,
      hint: "These two extreme points are only about 85 miles apart!"
    },
    {
      id: 4,
      title: "Clue #5",
      question: "In 1849, thousands of people rushed to this state hoping to find gold. What was this event called?",
      options: ["The Gold Rush", "The Silver Strike", "The Treasure Hunt"],
      correct: 0,
      hint: "People who came were called 'forty-niners' because of the year!"
    },
    {
      id: 5,
      title: "Clue #6",
      question: "This state grows more fruits and vegetables than any other state in America. It produces almost all of America's almonds, walnuts, and avocados!",
      options: ["Florida", "Iowa", "Kansas"],
      correct: 0,
      hint: "The central valley of this state is one of the most productive farming regions in the world!"
    },
    {
      id: 6,
      title: "Almost There!",
      question: "This state is home to famous national parks including Yosemite and Joshua Tree. It also has stunning coastline along the Pacific Ocean.",
      options: ["Washington", "Oregon", "Arizona"],
      correct: 0,
      hint: "Think about which state has both mountains AND ocean!"
    },
    {
      id: 7,
      title: "Final Clue!",
      question: "This state's nickname is 'The Golden State' and its capital is Sacramento. Which state are we visiting?",
      options: ["Texas", "California", "Florida"],
      correct: 1,
      hint: "It became the 31st state in 1850!"
    }
  ];

  const handleAnswer = (clueId, selectedIndex) => {
    if (selectedIndex === clues[clueId].correct) {
      setFeedback('✅ Correct!');
      setTimeout(() => {
        setFeedback('');
        if (clueId === clues.length - 1) {
          setShowFinal(true);
        } else {
          const nextClue = clueId + 1;
          if (!unlockedClues.includes(nextClue)) {
            setUnlockedClues([...unlockedClues, nextClue]);
          }
          setCurrentClue(nextClue);
        }
      }, 1000);
    } else {
      setFeedback('❌ Not quite! Try again.');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-2">
          🗺️ Ollie's Mystery Trip! 🗺️
        </h1>
        <p className="text-base sm:text-lg text-white text-center mb-6 sm:mb-8 px-2">
          Solve the clues to discover which STATE you're visiting!
        </p>

        <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 shadow-lg overflow-x-auto">
          <div className="flex justify-between items-center min-w-max sm:min-w-0">
            {clues.map((clue, index) => (
              <div key={clue.id} className="flex items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  unlockedClues.includes(index) 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-500'
                }`}>
                  {unlockedClues.includes(index) ? <Unlock size={16} className="sm:w-5 sm:h-5" /> : <Lock size={16} className="sm:w-5 sm:h-5" />}
                </div>
                {index < clues.length - 1 && (
                  <div className={`w-4 sm:w-8 h-1 ${
                    unlockedClues.includes(index + 1) ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {!showFinal ? (
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <MapPin size={24} className="text-purple-500 mr-2 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {clues[currentClue].title}
              </h2>
            </div>
            
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              {clues[currentClue].question}
            </p>

            <div className="space-y-3">
              {clues[currentClue].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentClue, index)}
                  className="w-full p-3 sm:p-4 text-left bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 active:from-purple-300 active:to-blue-300 rounded-lg border-2 border-purple-300 transition-all transform active:scale-95 touch-manipulation"
                >
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">{option}</span>
                </button>
              ))}
            </div>

            {feedback && (
              <div className={`mt-4 p-3 rounded-lg text-center font-bold ${
                feedback.includes('Correct') 
                  ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                  : 'bg-red-100 text-red-800 border-2 border-red-300'
              }`}>
                {feedback}
              </div>
            )}

            <div className="mt-6 p-3 sm:p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <p className="text-xs sm:text-sm text-yellow-800">
                💡 <strong>Hint:</strong> {clues[currentClue].hint}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-xl text-center">
            <div className="text-5xl sm:text-6xl mb-4">🎉</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              CALIFORNIA!
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-6">
              You solved it, Ollie! We're going to the state of California!
            </p>
            <div className="text-5xl sm:text-6xl mb-4">☀️🌴⭐</div>
            <p className="text-base sm:text-lg text-gray-600">
              Get ready for an amazing adventure in The Golden State!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<StateGuess />, document.getElementById('root'));

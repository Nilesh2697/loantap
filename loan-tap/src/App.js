
// import './App.css';
// import App2 from './Components/QuestionCard';
// import { Navbar } from './Components/Navbar';
// import { Button } from '@chakra-ui/react';
// import FullScreenQuiz from './Components/ScoreCard';
// // import QuestionsCard from './Components/QuestionCard';

import { Navbar } from "./Components/Navbar";
import { FullScreenQuiz } from "./Components/FullScreenQuiz";
import QuestionCard from "./Components/QuestionCard";

// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//       {/* <Routes>
//         <Route path="/" element={<Home/>} />
//         <Route path="/quiz" element={<App2/>} />
//       </Routes> */}
//        <FullScreenQuiz>
//       <App2 />
//     </FullScreenQuiz>
      
//     </div>
//   );
// }

// export default App;
function App() {
  return (
    <div className="App">
      <Navbar />
      <FullScreenQuiz>
        <QuestionCard />
      </FullScreenQuiz>
    </div>
  );
}

export default App;

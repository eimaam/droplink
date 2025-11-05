import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import MyDrops from './pages/MyDrops';
import DropDetails from './pages/DropDetails';
import Settings from './pages/Settings';
import Help from './pages/Help';
import ScrollToTop from './components/ScrollToTop';

const App = () => {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-drops" element={<MyDrops />} />
        <Route path="/dashboard/drop/:id" element={<DropDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </>
  )

};

export default App;

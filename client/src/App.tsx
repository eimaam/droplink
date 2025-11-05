import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import MyDrops from './pages/MyDrops';
import DropDetails from './pages/DropDetails';
import PublicDropViewer from './pages/PublicDropViewer';
import Settings from './pages/Settings';
import Help from './pages/Help';
import FilePreviewTest from './pages/FilePreviewTest';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import { ConfigProvider, message } from 'antd';

const App = () => {


  // global message config
  message.config({
    maxCount: 3,
    duration: 3,
    rtl: false,
  });

  return (
    <>
      <ScrollToTop />
      <ConfigProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-drops" element={<MyDrops />} />
        <Route path="/dashboard/drop/:id" element={<DropDetails />} />
        <Route path="/d/:dropId" element={<PublicDropViewer />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </ConfigProvider>
    </>
  )

};

export default App;

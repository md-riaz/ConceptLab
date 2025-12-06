import { createBrowserRouter } from 'react-router-dom';
import AppShell from './AppShell';
import Home from '../components/layout/Home';
import TopicsList from '../components/topic/TopicsList';
import TopicDetail from '../components/topic/TopicDetail';
import Visualizer from '../components/visualizer/Visualizer';
import PathsList from '../components/layout/PathsList';
import PathDetail from '../components/layout/PathDetail';
import Settings from '../components/layout/Settings';
import ComponentShowcase from '../components/layout/ComponentShowcase';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'topics',
        element: <TopicsList />,
      },
      {
        path: 'topics/:slug',
        element: <TopicDetail />,
      },
      {
        path: 'visualizer/:algoId',
        element: <Visualizer />,
      },
      {
        path: 'paths',
        element: <PathsList />,
      },
      {
        path: 'paths/:pathId',
        element: <PathDetail />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'components',
        element: <ComponentShowcase />,
      },
    ],
  },
]);

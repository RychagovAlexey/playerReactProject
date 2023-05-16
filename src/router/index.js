import { createBrowserRouter } from 'react-router-dom';
import PlayerPage from '../pages/PlayerPage';

export const router = createBrowserRouter([
	{
		path: "/",
		element: <PlayerPage />,
	},
	{
		path: "*",
		element: <div>Page Not Found</div>,
	},
]);
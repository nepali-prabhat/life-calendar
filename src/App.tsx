import React from "react";
import "./App.scss";

const Box: React.FC<{ color: string }> = ({ color }) => {
	return <div className="box"></div>;
};

const App: React.FC = () => {
	const [lifeExpectancy /*, setLifeExpectancy*/] = useState<number>(60);

	return (
		<div className="app">
			<header className="app-header">Life Calendar</header>

			<Box />
		</div>
	);
};

export default App;

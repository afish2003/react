// App.js
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210419113249/gfg-new-logo-min.png%60%7D"
className="logo" alt="Vite logo"
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button className='btn'
					onClick={() =>
						setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
		</>
	)
}

export default App
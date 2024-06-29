import { useState, useCallback, useEffect } from 'react';

function App() {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState('');

	const passwordGenerator = useCallback(() => {
		let pass = '';
		let string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

		if (numberAllowed) string += '1234567890';
		if (charAllowed) string += '!@#$%^&*()-+[]{}~`';

		for (let i = 1; i < length; i++) {
			pass += string[Math.floor(Math.random() * string.length + 1)];
		}

		setPassword(pass);
	}, [length, numberAllowed, charAllowed, setPassword]);

	useEffect(() => {
		passwordGenerator();
	}, [length, numberAllowed, charAllowed, passwordGenerator]);

	return (
		<>
			<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
				<h1 className='text-center text-white my-3'>Password Generator</h1>
				<div className='flex shadow rounded-lg overflow-hidden mb-4'>
					<input
						id='password'
						type='text'
						name='password'
						value={password}
						className='outline-none w-full py-1 px-3'
						placeholder='Password'
						readOnly
					/>
					<button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
						{' '}
						Copy
					</button>
				</div>
				<div className='flex text-sm gap-x-2'>
					<div className='flex items-center gap-x-1'>
						<input
							type='range'
							min={6}
							max={100}
							value={length}
							id='length'
							className='cursor-pointer'
							onChange={(e) => setLength(e.target.value)}
						/>
						<label htmlFor='length'>Length: {length}</label>
					</div>
					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={numberAllowed}
							id='numberInput'
							onChange={() => setNumberAllowed((prev) => !prev)}
						/>
						<label htmlFor='numberInput'> Numbers</label>
					</div>
					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={charAllowed}
							id='characterInput'
							onChange={() => {
								setCharAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor='characterInput'>Characters</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
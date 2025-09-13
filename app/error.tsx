"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center h-full p-8">
			<h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
			<p className="mb-4 text-red-600">{error?.message || "Unknown error."}</p>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded"
				onClick={() => reset()}
			>
				Try again
			</button>
		</div>
	);
}

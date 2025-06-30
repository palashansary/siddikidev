import React from 'react';
import myResume from '../cv/siddiki_react_dev.pdf';

const Resume = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-center">My Resume</h1>

            <div className="w-full max-w-5xl flex justify-center px-2">
                <iframe
                    src={myResume}
                    title="Resume Preview"
                    className="w-full h-[75vh] rounded-lg border border-gray-700 bg-gray-800"
                ></iframe>
            </div>

            <div className="mt-6">
                <a href={myResume} download>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-base md:text-lg transition">
                        Download Resume
                    </button>
                </a>
            </div>
        </div>
    );
};

export default Resume;

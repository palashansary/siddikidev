import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);
  const [message, setMessage] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    setIsSubmitted(true);

    if (!name || !email || !number || !message) return;

    const data = { name, email, number, message };
    const response = await fetch(
      "https://siddikiansary-default-rtdb.firebaseio.com/messages.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      setIsSubmittedSuccessfully(true);
    }
  };

  return (
    <>
      {!isSubmittedSuccessfully && (
        <div>
          <div className="h-full flex flex-col items-center py-4">
            <div className="text-center mt-2">
              <p className="text-white text-[2rem] md:text-[2.4rem] font-semibold">
                Let's get connected
              </p>
            </div>

            <div className="mt-6 md:mt-12 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[38%] p-8 border border-blue-950 rounded-3xl bg-black/[0.1]">
              <form>
                <div className="flex flex-col gap-y-3 md:gap-y-4 font-spectral">
                  <div className="text-slate-300  ">
                    <label className="flex flex-col">
                      Name
                      <input
                        type="text"
                        required
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        className="h-8 md:h-9 rounded-lg bg-slate-800 px-5 outline-none"
                      />
                    </label>
                    {!name && isSubmitted && (
                      <span className="text-red-500">Enter your name</span>
                    )}
                  </div>
                  <div className="text-slate-300">
                    <label className="flex flex-col">
                      Email
                      <input
                        type="email"
                        required
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        className="h-8 md:h-9 rounded-lg bg-slate-800 px-5 outline-none"
                      />
                    </label>
                    {!email && isSubmitted && (
                      <span className="text-red-500">Enter your Email</span>
                    )}
                  </div>
                  <div className="text-slate-300">
                    <label className="flex flex-col">
                      Number
                      <input
                        type="number"
                        required
                        onChange={(event) => setNumber(event.target.value)}
                        value={number}
                        className="h-8 md:h-9 rounded-lg bg-slate-800 px-5 outline-none"
                        minLength={10}
                        maxLength={10}
                      />
                    </label>
                    {!number && isSubmitted && (
                      <span className="text-red-500">Enter your Number</span>
                    )}
                  </div>
                  <div className="text-slate-300">
                    <label className="flex flex-col">
                      Message
                      <input
                        type="textarea"
                        required
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}
                        className="h-24 md:h-28 rounded-lg bg-slate-800 px-5 outline-none"
                      />
                    </label>
                    {!message && isSubmitted && (
                      <span className="text-red-500">Enter your message</span>
                    )}
                  </div>
                </div>
                <div className=" flex justify-end text-white mt-2">
                  <div className="flex bg-blue-950 justify-center w-[100px] px-2 py-1 rounded-md">
                    <Link>
                      <button type="button" onClick={submitHandler}>
                        Submit
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isSubmittedSuccessfully && (
        <div className="h-[70vh] flex flex-col items-center justify-center">
          <p className="text-center text-3xl text-white">
            {`Thanks ${name} Your Submission You will get response back shortly!`}
          </p>
          <Link to="/">
            <button className="text-slate-100 text-[1.2rem] mt-4 px-4 py-1 border border-white rounded-lg">
              Go to home
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;

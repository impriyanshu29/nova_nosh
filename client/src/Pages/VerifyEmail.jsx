import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

function VerifyEmail() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
  const [message, setMessage] = useState(" ");
  const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(token);
      setError(null);
      const res = await fetch(`/api/auth/verifyEmail?token=${token}`);

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMessage(data.message);
      
      setLoading(false);

      setTimeout(() => {
        // Redirect to sign-in page
        navigate('/signIn');
      }, 2000);

      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <section className=" min-h-screen px-4 md:px-0 flex items-center justify-center">
    <div className="max-w-md w-full  bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="bg-black w-full p-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-200">
          Verify Your Email
        </h1>
        </div>
      <div className="px-6 py-8">
        
        <p className="text-lg text-center text-gray-600 mb-6">
          Delicious delights are just a click away!
          <br />
          <br/>
          Tap <span className="font-semibold text-gray-700">Verify</span> below to indulge in the mouthwatering goodness that awaits. We're excited to share our flavorful creations with you!
        </p>
        <p className="text-lg text-center text-gray-600 mb-6">
          If you haven't received the email, please check your spam folder.
        </p>
      </div>
      <div className=" px-6 py-4 flex justify-center">
        <button
          onClick={verifyEmail}
          className="inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-2.5 font-semibold leading-7 text-white hover:opacity-90 transition duration-300"
          disabled={loading}
        >
          Verify
        </button>
        
      </div>
      <div className=" pb-8">

    {message && (
      <div className="text-green-500 text-center mt-4">{message}</div>
    )}
    {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
    </div>
    
  </section>
  
  );
}
export default VerifyEmail;

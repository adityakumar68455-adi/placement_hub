import React from 'react'
import { useState } from 'react'
import api from '../../api/axios';
import { toast } from 'react-toastify';

function CreateJob() {
  const [form , setForm] = useState({
              title :'',
      description :'',
      location :'',
      ctc :'',
      jobType :'' ,
      deadline :''
  });
  const handleChange= (e)=>{
    const {name , value} = e.target;
    setForm((prevData)=>({
      ...prevData , 
      [name] : value
    }))
  };
  const handleSubmit= async (e)=>{
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      const response = await api.post('/jobs/create', form , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      });
      toast('Create Successful' , response)
      console.log('Create Successful' , response)
      
    } catch (error) {
      
      toast.error("Create Failed" , error.response?.data?.message || error.response?.data || error.message)
    }

  }

return (
  <div className="min-h-screen relative overflow-hidden bg-slate-950 py-10 px-4 sm:px-6">

    {/* ================= AURA BACKGROUND ================= */}

    {/* Blue Glow */}
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>

    {/* Purple Glow */}
    <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>

    {/* Cyan Glow */}
    <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>


    {/* ================= MAIN CONTAINER ================= */}

    <div className="relative max-w-2xl mx-auto">

      {/* Outer Aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-3xl blur opacity-40"></div>


      {/* ================= FORM CARD ================= */}

      <form
        onSubmit={handleSubmit}
        className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >

        {/* ================= HEADER ================= */}

        <div className="relative px-6 sm:px-8 pt-8 pb-6 border-b border-white/10">

          {/* Small Aura */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative flex items-center gap-4">

            {/* Icon */}
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">

              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>

            </div>


            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Create New Job
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Publish a new opportunity and find the right talent.
              </p>
            </div>

          </div>

        </div>


        {/* ================= FORM BODY ================= */}

        <div className="p-6 sm:p-8 space-y-6">


          {/* ================= TITLE ================= */}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Job Title
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707L19 8.414V19a2 2 0 01-2 2z"
                  />
                </svg>

              </span>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800"
              />

            </div>
          </div>


          {/* ================= DESCRIPTION ================= */}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Job Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities and requirements..."
              rows="4"
              className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none resize-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-slate-800"
            ></textarea>

          </div>


          {/* ================= LOCATION + CTC ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


            {/* Location */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Location
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">

                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                </span>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Noida"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:bg-slate-800"
                />

              </div>

            </div>


            {/* CTC */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                CTC
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">
                  ₹
                </span>

                <input
                  type="number"
                  name="ctc"
                  value={form.ctc}
                  onChange={handleChange}
                  placeholder="e.g. 600000"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:bg-slate-800"
                />

              </div>

            </div>

          </div>


          {/* ================= JOB TYPE + DEADLINE ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


            {/* Job Type */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Job Type
              </label>

              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 text-white rounded-xl outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >

                <option value="" className="bg-slate-900">
                  Select Job Type
                </option>

                <option value="Full-time" className="bg-slate-900">
                  Full-time
                </option>

                <option value="Part-time" className="bg-slate-900">
                  Part-time
                </option>

                <option value="Internship" className="bg-slate-900">
                  Internship
                </option>

              </select>

            </div>


            {/* Deadline */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Application Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 text-white rounded-xl outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />

            </div>

          </div>


          {/* ================= DIVIDER ================= */}

          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>


          {/* ================= CREATE BUTTON ================= */}

          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-xl p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
          >

            <div className="relative flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-white font-semibold group-hover:bg-transparent transition-all duration-300">

              <svg
                className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>

              Create Job

            </div>

          </button>

        </div>

      </form>

    </div>

  </div>
);
}



export default CreateJob

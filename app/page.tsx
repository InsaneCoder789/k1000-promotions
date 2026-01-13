"use client";

import React, { useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CheckCircle, Activity, Clock } from 'lucide-react';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-yCgohYY8HKBnbu9CVoAuMJflrSGayts",
  authDomain: "recruitment-8a86b.firebaseapp.com",
  projectId: "recruitment-8a86b",
  storageBucket: "recruitment-8a86b.firebasestorage.app",
  messagingSenderId: "111513716920",
  appId: "1:111513716920:web:31684fba9ddbd64d8f0c4d",
  measurementId: "G-M417CYDE06"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function RecruitmentPortal() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    firstName: '', lastName: '', year: '', domain: '', hostel: '', reason: '' 
  });

  useEffect(() => {
    signInAnonymously(auth);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'applications'), {
        ...formData,
        submittedAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err: any) {
      alert("Transmission Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-full bg-[#020202] text-white flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
      
      {/* Dynamic Blue Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-800/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 mb-8">
        <img src="/k1000-small.png" className="h-24 w-auto object-contain" alt="K1000 Official" />
      </div>

      <section className="w-full max-w-2xl bg-black/40 border border-white/10 p-6 md:p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-[0_0_80px_rgba(30,58,138,0.15)] relative z-10 flex flex-col justify-center transition-all duration-500 min-h-[500px]">
        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-[Orbitron] tracking-[0.2em] mb-2 uppercase">Candidate Enlistment</h2>
              <div className="h-[1px] w-24 bg-blue-500 mx-auto opacity-50 mb-2" />
              <p className="text-[9px] text-zinc-500 tracking-[0.4em] font-bold uppercase italic">Official Business Only</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold ml-1">First Name</label>
                <input required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 text-sm transition-all" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}/>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold ml-1">Last Name</label>
                <input required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 text-sm transition-all" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}/>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold ml-1">Year of Study</label>
                <select required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-zinc-400 text-sm" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}>
                  <option value="">Select Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold ml-1">Target Domain</label>
                <select required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-zinc-400 text-sm" value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})}>
                  <option value="">Select Domain</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Event Planning">Event Planning</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Photography">Photography</option>
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold ml-1">Hostel Identification</label>
                <input required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 text-sm" placeholder="e.g., Block B, Room 402" value={formData.hostel} onChange={e => setFormData({...formData, hostel: e.target.value})}/>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold ml-1">Professional Statement</label>
                <textarea required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-28 outline-none text-zinc-300 text-sm resize-none focus:border-blue-500/50" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})}/>
              </div>

              <button disabled={loading} className="md:col-span-2 w-full bg-white text-black font-bold py-4 rounded-xl transition-all hover:bg-blue-600 hover:text-white active:scale-[0.98] uppercase tracking-[0.2em] text-xs font-[Orbitron]">
                {loading ? "TRANSMITTING..." : "SUBMIT APPLICATION"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-700">
            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <CheckCircle size={44} className="text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold font-[Orbitron] tracking-widest mb-4 uppercase">Submission Received</h2>
            <div className="space-y-4 max-w-sm mx-auto">
              <p className="text-zinc-400 text-sm leading-relaxed">
                Your credentials have been successfully uploaded to the K1000 Strategic Database. The division will contact you if your profile meets the criteria.
              </p>
              <div className="flex items-center justify-center gap-2 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] pt-6 border-t border-white/5">
                <Clock size={14} />
                Status: Successful 
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="absolute bottom-6 text-[8px] text-zinc-700 uppercase tracking-[0.4em] font-bold z-10">
        K1000 Strategic Operations Division © 2026
      </footer>
    </main>
  );
}
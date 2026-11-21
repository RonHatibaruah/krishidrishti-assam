import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  PhoneCall, 
  Radio, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  Languages, 
  User, 
  Bot,
  ArrowRight
} from 'lucide-react';
import { ASSAM_COMMODITIES } from '../data/agri_price_data';

export const AdvisoryConsole: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'AS' | 'EN'>('AS');
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [broadcastSent, setBroadcastSent] = useState<boolean>(false);

  // Conversational Chat Thread
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'user',
      text: 'মোৰ ওচৰত ৫০ কুইণ্টল সৰিয়হ আছে খাৰুপেটীয়াত। মই এতিয়া বিক্ৰী কৰিম নে ৰাখিম? (I have 50q mustard in Kharupetia. Should I sell now or hold?)',
      time: '18:42'
    },
    {
      sender: 'bot',
      text: 'নমস্কাৰ প্ৰণৱ বৰুৱা! খাৰুপেটীয়াত এতিয়াৰ দাম: ₹৫,৮৫০/কুইণ্টল।\nআমাৰ AI ৰ পূৰ্বাভাস: ১২ দিনৰ ভিতৰত দাম ₹৬,২০০ লৈ বৃদ্ধি পাব।\nপৰামৰ্শ: এতিয়া বিক্ৰী নকৰি ওচৰৰ শীতল ভঁৰালত ৰাখক। গুদাম খৰচ (₹৯০) বাদ দিও প্ৰতি কুইণ্টলত ₹২৬০ অতিৰিক্ত লাভ হ’ব!\n\nখাৰুপেটীয়া শীতল ভঁৰালত ৬০% ঠাই খালী আছে। e-NWR ৰ জৰিয়তে আপুনি ৭৫% তাৎক্ষণিক ঋণ পাব পাৰে ৭% সুতত।',
      time: '18:43'
    }
  ]);

  const handleSendMessage = () => {
    if (!inputQuery.trim()) return;

    const userMsg = inputQuery;
    const newChat = [...chatMessages, { sender: 'user' as const, text: userMsg, time: 'Just Now' }];
    setChatMessages(newChat);
    setInputQuery('');

    // Simulate intelligent bot reply after short delay
    setTimeout(() => {
      let botReply = '';
      if (userMsg.toLowerCase().includes('tomato') || userMsg.includes('বিলাহী')) {
        botReply = selectedLanguage === 'AS' 
          ? 'খাৰুপেটীয়াত বিলাহীৰ দাম এতিয়া ₹৬২০/কুইণ্টল। ততাতৈয়াকৈ গুৱাহাটী পামহী বজাৰলৈ প্ৰেৰণ কৰক (দাম ₹১,৪৫০/কুইণ্টল)। গাড়ীভাড়া আৰু শুকোৱাৰ খৰচ বাদ দিও আপোনাৰ প্ৰতি কুইণ্টলত ₹৫৯৫ অতিৰিক্ত লাভ হ’ব!'
          : 'Kharupetia tomato wholesale price is severely depressed at ₹620/q. Route immediately to Guwahati Pamohi (trading at ₹1,450/q). Net Realizable Value is ₹1,215/q (+₹595/q net profit after freight & transit shrinkage).';
      } else if (userMsg.toLowerCase().includes('paddy') || userMsg.includes('ধান')) {
        botReply = selectedLanguage === 'AS'
          ? 'নগাঁৱত শালি ধানৰ বজাৰ দৰ ₹২,২৪০/কুইণ্টল, যিটো চৰকাৰী সমৰ্থন মূল্য (MSP ₹২,৩০০) তকৈ কম। এতিয়া লোকচানত বিক্ৰী নকৰি গুদামত ৰাখক আৰু e-NWR ঋণ লওক।'
          : 'Sali paddy in Nagaon is trading at ₹2,240/q, which is below statutory MSP of ₹2,300/q. Do not sell at distress rates. Deposit in certified WDRA warehouse and access e-NWR pledge credit at 7% p.a.';
      } else {
        botReply = selectedLanguage === 'AS'
          ? 'ধন্যবাদ! আমাৰ AI পূৰ্বাভাস অনুসৰি এই শস্যৰ চাহিদা অহা সপ্তাহত ৫% বৃদ্ধি পাব। আপোনাৰ ওচৰৰ সংৰক্ষণ কেন্দ্ৰ আৰু বজাৰ দৰ তুলনা চাবলৈ "বজাৰ মেপ" পৰিদৰ্শন কৰক।'
          : 'Thank you! According to our Temporal Fusion Transformer AI models, commodity demand is projected to rise 5% over the next 10 days. Check the Mandi Arbitrage Matrix to evaluate secondary markets.';
      }

      setChatMessages(prev => [...prev, { sender: 'bot' as const, text: botReply, time: 'Just Now' }]);
    }, 600);
  };

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastSent(true);
      setTimeout(() => setBroadcastSent(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Friction Farmer Delivery Layer • Meta WhatsApp Cloud API & Telecom IVRS</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Multilingual Farmer Advisory & Natural Language Alert Center
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Delivering verified, actionable price forecasts and "Hold vs. Sell" advisories directly to smallholders in native Assamese (অসমীয়া), Bengali, Bodo, and English with zero app installation requirements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedLanguage(selectedLanguage === 'AS' ? 'EN' : 'AS')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-emerald-300 flex items-center gap-2 cursor-pointer hover:bg-slate-800"
            >
              <Languages className="w-4 h-4" />
              <span>Language: {selectedLanguage === 'AS' ? 'অসমীয়া (Assamese)' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Left Interactive WhatsApp Simulator / Right Bulk Dispatcher */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: WhatsApp Business Bot Interactive Mockup */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            {/* Phone Header */}
            <div className="bg-emerald-800 p-4 rounded-xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold border-2 border-emerald-400 shadow-sm">
                  KD
                </div>
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>KrishiDrishti Official Bot</span>
                    <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-200">VERIFIED</span>
                  </div>
                  <div className="text-[11px] text-emerald-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Government of Assam Agri Helpline</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white">
                <button className="p-2 rounded-lg bg-emerald-700/60 hover:bg-emerald-700 text-xs cursor-pointer" title="Listen Audio Advisory">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="mt-4 bg-slate-950 p-4 rounded-xl border border-slate-800/80 h-96 overflow-y-auto space-y-3.5">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-700 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={selectedLanguage === 'AS' ? 'শস্যৰ দাম বা পৰামৰ্শ সোধক (যেনে: সৰিয়হ, বিলাহী)...' : 'Ask commodity price or advice (e.g. mustard, tomato)...'}
              className="flex-1 bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Col: Directorate Emergency Bulk Broadcast Station */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Emergency Farmer Broadcast Console</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Dispatch geo-targeted flash price alerts & distress warnings to all registered farmers & FPOs in target districts
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target District Cluster:</label>
                <select className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2 cursor-pointer focus:outline-none">
                  <option>Darrang (Kharupetia Production Belt - 18,500 Farmers)</option>
                  <option>Nagaon (Sali Paddy Cluster - 24,000 Farmers)</option>
                  <option>Barpeta (Boro Paddy & Jute Belt - 16,200 Farmers)</option>
                  <option>Kamrup Rural (Vegetable & Lemon - 12,000 Farmers)</option>
                  <option>Statewide Broadcast (All 35 Districts - 500k+ Farmers)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Dissemination Channels:</label>
                <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-500" />
                    <span>WhatsApp Business API Cloud Gateway (Official Green Tick)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-500" />
                    <span>C-DAC Telecom Flash SMS (Priority Pipeline)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-500" />
                    <span>Automated Voice IVRS in Local Assamese Dialect</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Alert Message Template:</label>
                <textarea 
                  rows={4}
                  readOnly
                  value="[GOVT OF ASSAM AGRI ADVISORY] खाৰুপেটীয়া বজাৰত বিলাহীৰ দাম তীব্ৰ হ্ৰাস পাইছে (₹৬২০/কুইণ্টল)। এতিয়া লোকচানত বিক্ৰী নকৰি গুৱাহাটী পামহী বজাৰলৈ প্ৰেৰণ কৰক। প্ৰতি কুইণ্টলত ₹৫৯৫ অতিৰিক্ত লাভ পাব।"
                  className="w-full bg-slate-950 border border-slate-700 text-emerald-300 text-xs rounded-xl p-3 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            {broadcastSent && (
              <div className="p-3 mb-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Broadcast successfully delivered to 18,500 registered farmers in Darrang!</span>
              </div>
            )}

            <button
              onClick={handleBroadcast}
              disabled={isBroadcasting}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Radio className="w-4 h-4" />
              <span>{isBroadcasting ? 'Transmitting Alert Pipeline...' : 'Transmit Priority Farmer Broadcast'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

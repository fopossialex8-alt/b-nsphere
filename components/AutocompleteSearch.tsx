
import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_TERMS } from '../constants';
import { TermRecord } from '../types';

interface AutocompleteSearchProps {
  placeholder: string;
  onSelect: (term: TermRecord) => void;
  className?: string;
  inputClassName?: string;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ placeholder, onSelect, className, inputClassName }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<TermRecord[]>([]);
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const filtered = INITIAL_TERMS.filter(t => 
        t.termeFr.toLowerCase().includes(val.toLowerCase()) ||
        t.termeNgiem.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShow(true);
    } else {
      setSuggestions([]);
      setShow(false);
    }
  };

  const handleSelect = (term: TermRecord) => {
    setQuery(term.termeFr);
    setShow(false);
    onSelect(term);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className} z-[9999]`}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={() => query.length > 1 && setShow(true)}
        className={inputClassName || "w-full px-8 py-6 rounded-3xl bg-white border-4 border-amber-500 shadow-2xl outline-none transition-all text-stone-900 font-bold"}
      />
      <i className="fas fa-search absolute right-8 top-1/2 -translate-y-1/2 text-amber-600 text-xl"></i>

      {show && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] border-4 border-amber-500 z-[10000] overflow-hidden animate-fade-in ring-8 ring-black/5">
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s)}
              className="w-full text-left px-8 py-5 hover:bg-amber-50 border-b border-stone-100 last:border-0 transition-colors flex items-center justify-between group"
            >
              <div>
                <p className="font-black text-[#1a0f08] text-lg group-hover:text-amber-700">{s.termeFr}</p>
                <p className="text-[11px] text-amber-600 font-bold italic">{s.termeNgiem}</p>
              </div>
              <div className="bg-amber-100 text-amber-600 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
                <i className="fas fa-arrow-right"></i>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;

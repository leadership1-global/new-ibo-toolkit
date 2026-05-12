"use client";

import React, { useEffect, useRef, useState } from "react";

type ChecklistItem = {
    id: string;
    text: string;
    checked: boolean;
};

type Section = {
    title: string;
    items: ChecklistItem[];
};

type SectionToggleProps = {
    checked: boolean;
    indeterminate: boolean;
    onChange: (checked: boolean) => void;
};

function SectionToggle({ checked, indeterminate, onChange }: SectionToggleProps) {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    return (
        <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <input
                ref={checkboxRef}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
            />
            Check all
        </label>
    );
}

const initialChecklist: Section[] = [
    {
        title: "Foundation & Setup",
        items: [
            { id: "1", text: "Complete the \"New IBO Guide\" on Amway", checked: false },
            { id: "2", text: "Build and personalize your retail website", checked: false },
            { id: "3", text: "Share your website link with your coach for review", checked: false },
            { id: "4", text: "Download and set up The Collective App", checked: false },
            { id: "5", text: "Get added to all team chats, communities, and communication groups in the App and WhatsApp", checked: false },
        ],
    },
    {
        title: "Product Experience & Personal Use",
        items: [
            { id: "6", text: "Complete your Wellness Recommendation Assessment", checked: false },
            { id: "7", text: "Complete your Skin Health Assessment", checked: false },
            { id: "8", text: "Choose the products you want to personally experience this month", checked: false },
            { id: "9", text: "Add your next month's products to your DITTO", checked: false },
            { id: "10", text: "Learn the quality and benefits of each product by watching demos", checked: false },
            { id: "11", text: "Share your first product experience with your coach", checked: false },
        ],
    },
    {
        title: "Learning & Personal Growth",
        items: [
            { id: "12", text: "Complete the first \"Academy\" audio/podcast course in the app", checked: false },
            { id: "13", text: "Begin reading your first recommended book", checked: false },
            { id: "14", text: "Listen to at least 15–30 minutes of approved mentorship content daily", checked: false },
            { id: "15", text: "Send your \"Day 1 Core Run\" post to your coach via SMS or WhatsApp", checked: false },
            { id: "16", text: "Attend your first team training, workshop, or open meeting", checked: false },
        ],
    },
    {
        title: "Connection & Community",
        items: [
            { id: "17", text: "Get introduced to your senior business partners and mentors", checked: false },
            { id: "18", text: "Introduce yourself in the team community/group/weekly call", checked: false },
            { id: "19", text: "Make your first post on The Collective App sharing a thought, lesson, or experience", checked: false },
            { id: "20", text: "Follow key mentors and leaders on The Collective App", checked: false },
        ],
    },
    {
        title: "Business Building Activities",
        items: [
            { id: "21", text: "Schedule your first \"List Building\" session with your coach", checked: false },
            { id: "22", text: "Create your initial contact list of prospects, friends, family, and acquaintances", checked: false },
            { id: "23", text: "Schedule your first role-play session with your coach to learn how to make effective introductions and invite people professionally", checked: false },
            { id: "24", text: "Practice your first business introduction and product conversation", checked: false },
            { id: "25", text: "Schedule your first budgeting/financial education session", checked: false },
            { id: "26", text: "Schedule your first virtual grand launch of your website/business", checked: false },
            { id: "27", text: "Make your first introduction call/text connecting someone to your coach", checked: false },
            { id: "28", text: "Attend or observe a real presentation, web-tour, or follow-up conversation done by your coach with your contact", checked: false },
        ],
    },
    {
        title: "Events & Major Functions",
        items: [
            { id: "29", text: "Get registered for your first major team event/function as early as possible", checked: false },
            { id: "30", text: "Claim your event complimentary ticket and send confirmation to your coach", checked: false },
            { id: "31", text: "Block the event dates on your calendar and commit to attending fully", checked: false },
            { id: "32", text: "Set personal goals for what you want to learn and who you want to meet at the event", checked: false },
            { id: "33", text: "Attend all sessions with a notebook and take detailed notes", checked: false },
            { id: "34", text: "Introduce yourself to the leaders at the event and build relationships within the community", checked: false },
            { id: "35", text: "Review your key takeaways with your coach after the event and create an action plan", checked: false },
            { id: "36", text: "Commit to attending the next major event before leaving the current one.", checked: false },
        ],
    },
    {
        title: "First 30-Day Goals",
        items: [
            { id: "37", text: "Become a consistent product user", checked: false },
            { id: "38", text: "Complete all onboarding trainings", checked: false },
            { id: "39", text: "Attend all major team events and calls", checked: false },
            { id: "40", text: "Make your first customer sale", checked: false },
            { id: "41", text: "Introduce multiple people to the business opportunity", checked: false },
            { id: "42", text: "Develop confidence in sharing your story and experiences", checked: false },
            { id: "43", text: "Build momentum through consistent daily action", checked: false },
        ],
    },
];

export default function Checklist() {
    const [name, setName] = useState("");
    const [inputVisible, setInputVisible] = useState(true);
    const [checklist, setChecklist] = useState<Section[]>(initialChecklist);
    const trimmedName = name.trim();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (!inputVisible) setInputVisible(true);
    };

    const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && name.trim()) {
            setInputVisible(false);
        }
    };

    const handleCheckboxChange = (sectionIndex: number, itemId: string) => {
        setChecklist((prev) =>
            prev.map((section, idx) =>
                idx === sectionIndex
                    ? {
                        ...section,
                        items: section.items.map((item) =>
                            item.id === itemId ? { ...item, checked: !item.checked } : item
                        ),
                    }
                    : section
            )
        );
    };

    const handleSectionToggle = (sectionIndex: number, checked: boolean) => {
        setChecklist((prev) =>
            prev.map((section, idx) =>
                idx === sectionIndex
                    ? {
                        ...section,
                        items: section.items.map((item) => ({
                            ...item,
                            checked,
                        })),
                    }
                    : section
            )
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Sticky header with name input */}
                <div
                    className="
    sticky top-0 z-50
    mb-8
    rounded-b-3xl rounded-t-none md:rounded-3xl
        border-0 border-b border-slate-200 md:border
    bg-white
    px-6 pt-4 pb-4
        shadow-[0_8px_24px_-18px_rgba(15,23,42,0.35)] md:shadow-xl md:shadow-slate-200/60
    isolate
  "
                >
                    <div className="mb-1 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center justify-center gap-2">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                                {trimmedName ? `${trimmedName}'s` : "New Partner Launch Checklist"}
                            </h1>
                            {trimmedName && (
                                <button
                                    onClick={() => setInputVisible((v) => !v)}
                                    title={inputVisible ? "Collapse name field" : "Edit name"}
                                    className="flex-shrink-0 text-sm text-slate-500 transition-colors hover:text-slate-700"
                                >
                                    ✏️
                                </button>
                            )}
                        </div>
                        {trimmedName && (
                            <h2 className="mt-1 max-w-full text-lg md:text-xl font-medium tracking-tight text-slate-500 text-balance">
                                Getting Started Checklist
                            </h2>
                        )}
                    </div>

                    {inputVisible && (
                        <>
                            <p className="text-center text-base mb-4 text-slate-600">
                                Welcome to the journey! The goal of your first 30 days is simple: build belief, build habits, and build momentum. Use this checklist to stay focused and launch strong.
                            </p>
                            <div className="flex justify-center">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    onKeyDown={handleNameKeyDown}
                                    placeholder="Enter your name and press Enter"
                                    className="w-80 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Checklist content */}
                <div className="space-y-8">
                    {checklist.map((section, sectionIndex) => (
                        <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    {section.title}
                                </h2>
                                <SectionToggle
                                    checked={section.items.every((item) => item.checked)}
                                    indeterminate={section.items.some((item) => item.checked) && !section.items.every((item) => item.checked)}
                                    onChange={(checked) => handleSectionToggle(sectionIndex, checked)}
                                />
                            </div>
                            <ul className="space-y-3">
                                {section.items.map((item) => (
                                    <li key={item.id} className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id={item.id}
                                            checked={item.checked}
                                            onChange={() => handleCheckboxChange(sectionIndex, item.id)}
                                            className="mt-1 mr-3 h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
                                        />
                                        <label
                                            htmlFor={item.id}
                                            className={`cursor-pointer text-gray-700 ${item.checked ? "line-through text-gray-500" : ""
                                                }`}
                                        >
                                            {item.text}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm shadow-slate-200/60">
                        <blockquote className="text-lg italic text-slate-700">
                            &ldquo;Success in this business is not about being perfect. It&apos;s about staying connected, staying coachable, and staying consistent.&rdquo;
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}
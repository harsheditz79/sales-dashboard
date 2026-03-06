import React from 'react';

interface FilterInputProps {
    label: string;
    value: number;
    onChange: (val: number) => void;
}

export const FilterInput = ({ label, value, onChange }: FilterInputProps) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-900">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="border border-gray-400 rounded-md px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter threshold..."
            />
        </div>
    );
};